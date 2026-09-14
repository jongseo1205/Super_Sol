import { useState } from 'react';
import { Sparkles, ChevronRight, Bell, Menu, ArrowUp, Building2, CreditCard, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';
import { INSIGHT_CARDS } from '../data';
import { AIContext, InsightCardData } from '../types';
import { cn } from '../lib/utils';

interface HomeScreenProps {
  onOpenAI: (context: AIContext) => void;
  onSelectCard: (cardId: string) => void;
}

const CategoryIcon = ({ name, className }: { name?: string, className?: string }) => {
  if (name === 'bank') return <Building2 className={className} />;
  if (name === 'card') return <CreditCard className={className} />;
  if (name === 'stock') return <TrendingUp className={className} />;
  return null;
};

export default function HomeScreen({ onOpenAI, onSelectCard }: HomeScreenProps) {
  const [activeFilter, setActiveFilter] = useState('전체 6');
  const filters = ['전체 6', '꼭 확인 1', '투자 2', '자산 1', '소비 2'];
  
  const heroCard = INSIGHT_CARDS.find(c => c.type === 'hero');
  const compactCards = INSIGHT_CARDS.filter(c => c.type === 'compact');

  return (
    <div className="flex flex-col min-h-full pb-10 bg-[#F4F6F9]">
      <div className="max-w-5xl mx-auto w-full">
        {/* Header */}
        <header className="flex justify-between items-center px-5 md:px-8 py-4 sticky top-0 z-10 bg-[#F4F6F9]/95 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <span className="text-[22px] font-bold text-[#111] tracking-tight">신한슈퍼SOL</span>
          </div>
          <div className="flex items-center gap-4 text-[#111]">
            <button 
              onClick={() => onOpenAI({ type: 'global' })}
              className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2B5DF9] to-[#3B82F6] flex items-center justify-center shadow-md relative hover:scale-105 transition-transform"
            >
              <Sparkles className="text-white w-4 h-4" />
            </button>
            <Bell className="w-[26px] h-[26px] stroke-[1.5]" />
            <Menu className="w-[26px] h-[26px] stroke-[1.5]" />
          </div>
        </header>

        <div className="px-5 md:px-8 mt-2 flex flex-col gap-10">
          
          {/* Top Information Hierarchy */}
          <section className="flex flex-col gap-4">
            <div>
              <h2 className="text-[24px] md:text-[28px] font-bold text-[#111] leading-snug">오늘 나에게 중요한 금융 변화</h2>
              <p className="text-[15px] md:text-[17px] text-gray-500 mt-1.5 font-medium">6개의 변화 중 2개를 먼저 확인해보세요.</p>
            </div>

            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
              {filters.map(f => (
                <button 
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={cn(
                    "px-3.5 py-1.5 rounded-full text-[13px] md:text-[14px] font-bold whitespace-nowrap transition-colors border",
                    activeFilter === f 
                      ? "bg-[#111] border-[#111] text-white" 
                      : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
          </section>

          {/* Hero Event */}
          {heroCard && (
            <section>
              <h3 className="text-[17px] md:text-[20px] font-bold text-[#111] mb-3 px-1">오늘 가장 먼저 확인해보세요</h3>
              <HeroCard card={heroCard} onClick={() => onSelectCard(heroCard.id)} />
            </section>
          )}

          {/* Compact Feed */}
          {compactCards.length > 0 && (
            <section className="flex flex-col gap-4">
              <h3 className="text-[17px] md:text-[20px] font-bold text-[#111] mb-0 px-1">내 금융생활에서 달라진 점</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {compactCards.map((card) => (
                  <CompactCard key={card.id} card={card} onClick={() => onSelectCard(card.id)} />
                ))}
              </div>
            </section>
          )}

          {/* Load More Link */}
          <button className="flex items-center justify-center text-[15px] md:text-[16px] font-bold text-gray-500 hover:text-[#111] transition-colors -mt-2">
            내 금융 변화 더보기 <ChevronRight className="w-4 h-4 ml-0.5" />
          </button>

          {/* AI Global Entry at bottom */}
          <section className="mb-4 mt-2 max-w-2xl mx-auto w-full">
            <div className="flex items-center gap-1.5 mb-3 px-1 text-[#2B5DF9]">
              <Sparkles className="w-5 h-5" />
              <span className="text-[15px] md:text-[16px] font-bold text-[#111]">AI에게 내 금융정보 물어보기</span>
            </div>
            <div 
              onClick={() => onOpenAI({ type: 'global' })}
              className="bg-white border border-[#2B5DF9]/30 rounded-[24px] p-4 flex items-center justify-between cursor-text shadow-sm hover:border-[#2B5DF9]/60 transition-colors group"
            >
              <span className="text-[15px] md:text-[16px] text-gray-400 font-medium">이번 달 돈을 어디에 많이 썼어?</span>
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#111] flex items-center justify-center group-hover:scale-105 transition-transform">
                <ArrowUp className="w-4.5 h-4.5 md:w-5 md:h-5 text-white" />
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}

function HeroCard({ card, onClick }: { card: InsightCardData, onClick: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={onClick}
      className="bg-white rounded-[28px] p-6 shadow-sm border border-transparent hover:border-gray-200 cursor-pointer transition-colors"
    >
      <div className="flex items-center gap-2 mb-3">
        {card.badge && (
          <span className="px-2 py-0.5 bg-red-50 text-red-500 text-[12px] font-bold rounded">
            {card.badge}
          </span>
        )}
        <div className="flex items-center gap-1 text-[14px] font-medium text-gray-500">
          <CategoryIcon name={card.iconName} className="w-4 h-4" />
          <span>{card.category}</span>
        </div>
      </div>
      
      <h3 className="text-[22px] font-bold text-[#111] leading-snug whitespace-pre-line mb-6">
        {card.title}
      </h3>
      
      {card.keyData && card.keyData[0] && (
        <div className="flex flex-col gap-4 mb-5">
          {/* Key Data Row 1 */}
          <div className="flex justify-between items-end">
            <span className="text-[15px] text-gray-500 font-medium">{card.keyData[0].label}</span>
            <span className="text-[32px] font-black text-[#2B5DF9] leading-none tracking-tight">
              {card.keyData[0].highlight}
            </span>
          </div>
          
          <div className="h-[1px] w-full bg-gray-100"></div>
          
          {/* Key Data Row 2 */}
          {card.keyData[1] && (
            <div>
              <span className="text-[14px] text-gray-500 font-medium block mb-2">{card.keyData[1].label}</span>
              <div className="flex items-center gap-3">
                <span className="text-[18px] font-bold text-gray-400 line-through decoration-1">
                  {card.keyData[1].from}
                </span>
                <span className="text-gray-300 font-bold">→</span>
                <span className="text-[20px] font-bold text-[#111]">
                  {card.keyData[1].to}
                </span>
              </div>
            </div>
          )}
          
          {/* Impact Text */}
          {card.impactText && (
            <div className="bg-gray-50 rounded-xl px-4 py-3 text-[14px] text-gray-700 font-bold">
              {card.impactText}
            </div>
          )}
        </div>
      )}

      {/* Inline AI Insight */}
      <div className="flex items-start gap-2 mb-5 mt-2">
        <Sparkles className="w-[18px] h-[18px] text-[#2B5DF9] shrink-0 mt-0.5" />
        <p className="text-[14px] text-[#111] font-medium leading-relaxed whitespace-pre-line">
          {card.aiInsight}
        </p>
      </div>

      <div className="flex justify-end">
        <div className="flex items-center text-[14px] font-bold text-gray-400 hover:text-[#111] transition-colors">
          {card.ctaText} <ChevronRight className="w-4 h-4 ml-0.5" />
        </div>
      </div>
    </motion.div>
  );
}

function CompactCard({ card, onClick }: { key?: string; card: InsightCardData; onClick: () => void }) {
  // Determine accent color classes based on category
  const getAccentColor = (iconName?: string) => {
    switch (iconName) {
      case 'card': return 'text-orange-500 bg-orange-50';
      case 'stock': return 'text-purple-500 bg-purple-50';
      case 'bank': return 'text-[#2B5DF9] bg-blue-50';
      default: return 'text-gray-500 bg-gray-50';
    }
  };

  const getBadgeColor = (iconName?: string) => {
    switch (iconName) {
      case 'card': return 'text-orange-600 bg-orange-50';
      case 'stock': return 'text-purple-600 bg-purple-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-[24px] p-5 shadow-sm border border-transparent hover:border-gray-200 cursor-pointer transition-colors"
    >
      <div className="flex items-center gap-2 mb-2">
        {card.badge && (
          <span className={cn("px-2 py-0.5 text-[11px] font-bold rounded", getBadgeColor(card.iconName))}>
            {card.badge}
          </span>
        )}
        <div className="flex items-center gap-1 text-[13px] font-medium text-gray-500">
          <CategoryIcon name={card.iconName} className="w-3.5 h-3.5" />
          <span>{card.category}</span>
        </div>
      </div>
      
      <h4 className="text-[16px] font-bold text-[#111] mb-3">{card.title}</h4>
      
      {/* Inline Numbers */}
      {card.keyData && card.keyData[0] && (
        <div className="flex items-center gap-2 mb-3">
          {card.keyData[0].label && (
             <span className="text-[14px] font-medium text-gray-500 mr-1">{card.keyData[0].label}</span>
          )}
          <span className="text-[16px] font-bold text-gray-400">{card.keyData[0].from}</span>
          <span className="text-gray-300 font-bold">→</span>
          <span className="text-[18px] font-bold text-[#111]">{card.keyData[0].to}</span>
          {card.keyData[0].diff && (
            <span className={cn("px-1.5 py-0.5 text-[13px] font-bold rounded ml-1", getAccentColor(card.iconName))}>
              {card.keyData[0].diff}
            </span>
          )}
        </div>
      )}

      {/* Inline AI Insight */}
      <div className="flex items-start gap-1.5 mb-3">
        <Sparkles className="w-[15px] h-[15px] text-[#2B5DF9] shrink-0 mt-0.5" />
        <p className="text-[13px] text-gray-700 font-medium leading-snug whitespace-pre-line">
          {card.aiInsight}
        </p>
      </div>

      <div className="flex justify-end pt-1">
        <div className="flex items-center text-[13px] font-bold text-gray-400 hover:text-[#111] transition-colors">
          {card.ctaText} <ChevronRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
}
