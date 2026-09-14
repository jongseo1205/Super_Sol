import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Sparkles, Building2, CreditCard, TrendingUp } from 'lucide-react';
import { INSIGHT_CARDS } from '../data';
import { Tab, AIContext } from '../types';
import { cn } from '../lib/utils';

interface InsightDetailScreenProps {
  cardId: string;
  onBack: () => void;
  onNavigate: (tab: Tab, context?: AIContext) => void;
  onOpenAI: (context: AIContext) => void;
}

const CategoryIcon = ({ name, className }: { name?: string, className?: string }) => {
  if (name === 'bank') return <Building2 className={className} />;
  if (name === 'card') return <CreditCard className={className} />;
  if (name === 'stock') return <TrendingUp className={className} />;
  return null;
};

export default function InsightDetailScreen({ cardId, onBack, onNavigate, onOpenAI }: InsightDetailScreenProps) {
  const card = INSIGHT_CARDS.find(c => c.id === cardId);

  if (!card) return null;

  const handleAction = (actionId: string) => {
    if (actionId.startsWith('agent_')) {
      onOpenAI({ type: 'card', cardId, query: actionId });
    } else if (actionId === 'ask_ai') {
      onOpenAI({ type: 'card', cardId });
    } else if (actionId === 'view_products') {
      onNavigate('products');
    } else if (actionId === 'view_finance') {
      onNavigate('finance');
    } else if (actionId === 'view_stocks') {
      onNavigate('stocks');
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F6F9] md:py-10 flex flex-col items-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="flex flex-col w-full min-h-screen bg-white pb-24 md:min-h-0 md:max-w-2xl md:rounded-[32px] md:shadow-xl md:border md:border-gray-100 overflow-hidden relative"
      >
        {/* Header */}
        <header className="flex items-center px-4 py-4 sticky top-0 z-10 bg-white/90 backdrop-blur-md">
          <button 
            onClick={onBack}
            className="p-2 -ml-2 text-[#111] hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronLeft className="w-7 h-7 stroke-[1.5]" />
          </button>
          <div className="flex items-center gap-1.5 ml-2 text-[15px] font-bold text-gray-700">
            <CategoryIcon name={card.iconName} className="w-4 h-4" />
            <span>{card.category}</span>
          </div>
        </header>

        <div className="px-4 flex flex-col gap-5 mt-0 md:px-6 md:gap-6">
          {/* Title & Summary */}
          <section className="flex flex-col gap-2.5">
            <h1 className="text-[20px] font-bold text-[#111] leading-tight whitespace-pre-line">
              {card.title.replace('\n', ' ')}
            </h1>
            
            {card.keyData && card.keyData[0] && (
              <div className="bg-gray-50 rounded-[12px] p-3 flex flex-col gap-0.5 border border-gray-100">
                <span className="text-[12px] text-gray-500 font-bold">{card.keyData[0].label || '핵심 요약'}</span>
                <div className="flex items-baseline gap-1.5">
                  {card.keyData[0].from && card.keyData[0].to ? (
                    <>
                      <span className="text-[15px] font-bold text-gray-400 line-through decoration-1">{card.keyData[0].from}</span>
                      <span className="text-gray-300 font-bold text-[14px]">→</span>
                      <span className="text-[20px] font-black text-[#111] tracking-tight">{card.keyData[0].to}</span>
                    </>
                  ) : (
                    <span className="text-[20px] font-black text-[#2B5DF9] tracking-tight">{card.keyData[0].highlight}</span>
                  )}
                  
                  {card.keyData[0].diff && (
                    <span className="text-[14px] font-bold text-red-500 ml-1">{card.keyData[0].diff}</span>
                  )}
                </div>
              </div>
            )}
          </section>

          {/* AI Expanded Insight */}
          <section>
            <div className="bg-[#F0F5FF] rounded-[12px] p-3 flex flex-col gap-1.5 border border-[#2B5DF9]/10">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#2B5DF9]" />
                <span className="text-[13px] font-bold text-[#2B5DF9]">AI 요약</span>
              </div>
              <p className="text-[13px] text-[#111] font-medium leading-snug line-clamp-3">
                {card.expandedAiInsight || card.aiInsight}
              </p>
            </div>
          </section>

          {/* Detailed Data */}
          {(card.detailList || card.detailPoints) && (
            <section className="flex flex-col gap-1.5">
              <h3 className="text-[14px] font-bold text-[#111] mb-0.5">상세 데이터</h3>
              <div className="flex flex-col">
                {card.detailList?.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center py-2.5 border-b border-gray-100 last:border-0 min-h-[40px]">
                    <span className="text-[13px] text-gray-600 font-medium">{item.label}</span>
                    <span className={cn("text-[13px] font-bold", item.highlight ? "text-[#2B5DF9]" : "text-[#111]")}>
                      {item.value}
                    </span>
                  </div>
                ))}
                
                {card.detailPoints && (
                  <div className="mt-3 flex flex-col gap-1.5">
                    <span className="text-[12px] text-gray-500 font-bold">주요 포인트</span>
                    <div className="flex flex-wrap gap-1.5">
                      {card.detailPoints.map((point, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-100 text-[#111] text-[12px] font-medium rounded-[6px]">
                          {point}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* AI Continuation Area */}
          {card.aiContinuationTitle && (
            <section className="mt-1 mb-4 pt-4 border-t border-gray-100">
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#2B5DF9]" />
                  <span className="text-[14px] font-bold text-[#111]">AI에게 더 물어볼 수 있어요</span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {card.aiRecommendedQuestions?.slice(0, 2).map((q, idx) => (
                    <div key={idx} className="px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-[8px] text-[12px] text-gray-700 font-bold">
                      {q}
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-1.5 mt-1">
                  <button 
                    onClick={() => handleAction(card.actionId!)}
                    className="w-full h-[46px] rounded-[12px] bg-[#111] text-white text-[14px] font-bold flex items-center justify-center"
                  >
                    {card.aiCtaText}
                  </button>

                  {card.secondaryCtaText && (
                    <button 
                      onClick={() => onNavigate('products')}
                      className="w-full py-2 text-[13px] text-gray-500 font-bold flex items-center justify-center gap-1"
                    >
                      {card.secondaryCtaText} &gt;
                    </button>
                  )}
                </div>
              </div>
            </section>
          )}
        </div>
      </motion.div>
    </div>
  );
}
