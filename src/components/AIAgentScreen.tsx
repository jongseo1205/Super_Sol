import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { X, ArrowUp, Sparkles, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { AIContext, Tab } from '../types';
import { INSIGHT_CARDS } from '../data';

interface AIAgentScreenProps {
  context: AIContext;
  onClose: () => void;
  onNavigate: (tab: Tab, newContext?: AIContext) => void;
}

interface Message {
  id: string;
  role: 'ai' | 'user';
  text: string;
  quickActions?: QuickAction[];
}

interface QuickAction {
  label: string;
  action: () => void;
}

export default function AIAgentScreen({ context, onClose, onNavigate }: AIAgentScreenProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (context.type === 'card' && context.cardId) {
      const card = INSIGHT_CARDS.find(c => c.id === context.cardId);
      if (card) {
        if (card.id === 'deposit_maturity') {
          setMessages([
            {
              id: '1',
              role: 'ai',
              text: '현재 가입하신 정기예금 금리는 연 3.1%지만, 지금 동일한 6개월 만기로 가입할 수 있는 특판 예금의 최고 금리는 연 3.4%예요.\n\n재예치 대신 특판 예금으로 갈아타면 연간 약 9만원의 이자를 더 받을 수 있습니다.',
              quickActions: [
                { label: '추천 예금 비교하기', action: () => onNavigate('products', { type: 'search_result', query: '3000만원 6개월 예금', title: '금리 연 3.4% 이상 예금' }) },
                { label: '일부 투자하기', action: () => handleUserSelection('일부 투자하기', card.id) },
                { label: '직접 물어보기', action: () => handleUserSelection('직접 물어보기', card.id) },
              ]
            }
          ]);
        } else if (card.id === 'card_overspend') {
          setMessages([
            {
              id: '1',
              role: 'ai',
              text: '이번 달 소비가 71만원으로 지난달 대비 크게 증가했어요. 특히 주말 외식 지출이 평소보다 약 30만원 더 많았습니다.\n\n외식 할인이 큰 카드를 사용하거나, 이번 달 남은 예산을 재설정해드릴까요?',
              quickActions: [
                { label: '소비 내역 상세 보기', action: () => handleNavigateAction('finance') },
                { label: '외식비 혜택 카드 찾기', action: () => handleNavigateAction('benefits', 'card_benefits') },
              ]
            }
          ]);
        } else if (card.id === 'stock_issue') {
           setMessages([
            {
              id: '1',
              role: 'ai',
              text: '보유 중인 NVIDIA의 실적 발표 이후, 글로벌 투자은행 7곳에서 평균 목표주가를 $185에서 $202로 9.2% 상향 조정했어요.\n\nAI 데이터센터 매출이 시장 기대치를 크게 상회한 것이 주요 원인입니다.',
              quickActions: [
                { label: 'NVIDIA 상세 리포트', action: () => handleNavigateAction('stocks', 'stock_analysis') },
                { label: '관련 수혜주 확인', action: () => handleUserSelection('관련 수혜주 확인', card.id) },
                { label: '주식 탭으로 이동', action: () => handleNavigateAction('stocks') },
              ]
            }
          ]);
        }
      }
    } else if (context.type === 'global') {
      setMessages([
        {
          id: '1',
          role: 'ai',
          text: '오늘은 이런 걸 확인해보세요.',
          quickActions: [
            { label: '내 예금 만기 이후 어떻게 하면 좋을까?', action: () => handleUserSelection('내 예금 만기 이후 어떻게 하면 좋을까?', 'global') },
            { label: '이번 달 돈을 어디에 많이 썼어?', action: () => handleUserSelection('이번 달 돈을 어디에 많이 썼어?', 'global') },
            { label: '내 보유주식에 중요한 변화 있어?', action: () => handleUserSelection('내 보유주식에 중요한 변화 있어?', 'global') },
          ]
        }
      ]);
    }
  }, [context]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleUserSelection = (text: string, sourceId: string) => {
    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', text }]);
    
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        text: '네, 분석된 맥락을 바탕으로 관련 금융 메뉴로 연결해 드릴까요?',
        quickActions: [
          { label: '확인하기', action: () => onNavigate('finance') }
        ]
      }]);
    }, 600);
  };

  const handleNavigateAction = (tab: Tab, actionContext?: string) => {
    let navContext: AIContext | undefined = undefined;
    if (actionContext === 'card_benefits') {
       navContext = { type: 'search_result', query: '외식비 특화 혜택 카드', title: '외식비 절감에 특화된 카드 혜택이에요' };
    } else if (actionContext === 'stock_analysis') {
       navContext = { type: 'search_result', query: 'NVIDIA', title: 'NVIDIA 실적 및 목표가 분석' };
    }
    
    onNavigate(tab, navContext);
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    const text = inputValue;
    setInputValue('');
    
    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', text }]);
    
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        text: '말씀하신 내용을 바탕으로 가장 적합한 금융 서비스를 찾아드릴게요.',
        quickActions: [
          { label: '추천 상품 보기', action: () => onNavigate('products') }
        ]
      }]);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center md:bg-[#111]/20 md:backdrop-blur-sm md:p-6 pointer-events-auto">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="w-full h-full bg-[#F4F6F9] flex flex-col md:h-[85vh] md:max-w-2xl md:rounded-[32px] md:shadow-2xl overflow-hidden border-gray-200 md:border"
      >
        <header className="flex justify-between items-center px-5 py-4 bg-white/80 backdrop-blur-md sticky top-0 border-b border-gray-100 z-10 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2B5DF9] to-[#3B82F6] flex items-center justify-center">
              <Sparkles className="text-white w-4 h-4" />
            </div>
            <span className="text-[18px] font-bold text-[#111]">Personal Agent</span>
          </div>
          <button onClick={onClose} className="p-2 -mr-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-5 py-6 flex flex-col gap-6 scrollbar-hide">
          {messages.map((msg, idx) => (
            <div key={msg.id} className={cn("flex flex-col max-w-[85%]", msg.role === 'user' ? "self-end items-end" : "self-start items-start")}>
              <div className={cn(
                "px-5 py-4 text-[15px] leading-relaxed",
                msg.role === 'user' 
                  ? "bg-[#111] text-white rounded-[24px] rounded-tr-[4px]"
                  : "bg-white text-[#111] border border-gray-100 rounded-[24px] rounded-tl-[4px] shadow-sm"
              )}>
                <span className="whitespace-pre-wrap font-medium">{msg.text}</span>
              </div>
              {msg.quickActions && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {msg.quickActions.map((qa, i) => (
                    <button 
                      key={i}
                      onClick={qa.action}
                      className="px-4 py-2 bg-white border border-[#2B5DF9]/30 text-[#2B5DF9] text-[14px] font-bold rounded-full shadow-sm hover:bg-[#F0F5FF] transition-colors text-left"
                    >
                      {qa.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 bg-white border-t border-gray-100 pb-8 shrink-0">
          <div className="flex items-center gap-2 bg-[#F4F6F9] rounded-[24px] px-2 py-1.5 border border-gray-200 focus-within:border-[#2B5DF9]/50 focus-within:ring-1 focus-within:ring-[#2B5DF9]/50 transition-all">
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="궁금한 금융 정보를 물어보세요" 
              className="flex-1 bg-transparent px-4 py-2 outline-none text-[#111] placeholder:text-gray-400 text-[15px] font-medium"
            />
            <button 
              onClick={handleSend}
              disabled={!inputValue.trim()}
              className="w-10 h-10 rounded-full bg-[#111] disabled:bg-gray-300 flex items-center justify-center transition-colors shrink-0"
            >
              <ArrowUp className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
