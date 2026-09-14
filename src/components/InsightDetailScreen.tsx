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

        <div className="px-6 flex flex-col gap-8 mt-2">
          {/* Title & Summary */}
          <section>
            <h1 className="text-[26px] font-bold text-[#111] leading-tight mb-6 whitespace-pre-line">
              {card.title.replace('\n', ' ')}
            </h1>
            
            {card.keyData && card.keyData[0] && (
              <div className="bg-gray-50/80 rounded-[20px] p-6 flex flex-col gap-2">
                <span className="text-[14px] text-gray-500 font-medium">요약 수치</span>
                <div className="flex items-end gap-3 flex-wrap">
                  {card.keyData[0].from && card.keyData[0].to ? (
                    <>
                      <span className="text-[22px] font-bold text-gray-400 line-through decoration-1">{card.keyData[0].from}</span>
                      <span className="text-gray-300 font-bold mb-1">→</span>
                      <span className="text-[32px] font-black text-[#111] tracking-tight leading-none">{card.keyData[0].to}</span>
                    </>
                  ) : (
                    <span className="text-[32px] font-black text-[#2B5DF9] tracking-tight leading-none">{card.keyData[0].highlight}</span>
                  )}
                  
                  {card.keyData[0].diff && (
                    <span className="text-[18px] font-bold text-red-500 mb-1 ml-1">{card.keyData[0].diff}</span>
                  )}
                </div>
              </div>
            )}
          </section>

          {/* AI Expanded Insight */}
          <section>
            <div className="bg-[#F0F5FF] rounded-[24px] p-6 relative overflow-hidden">
              <div className="absolute -top-6 -right-6 opacity-10">
                <Sparkles className="w-32 h-32 text-[#2B5DF9]" />
              </div>
              <div className="flex items-center gap-2 mb-3 relative z-10">
                <Sparkles className="w-5 h-5 text-[#2B5DF9]" />
                <span className="text-[15px] font-bold text-[#2B5DF9]">AI 요약 분석</span>
              </div>
              <p className="text-[15px] text-[#111] font-medium leading-relaxed whitespace-pre-line relative z-10">
                {card.expandedAiInsight || card.aiInsight}
              </p>
            </div>
          </section>

          {/* Detailed Data */}
          {(card.detailList || card.detailPoints) && (
            <section>
              <h3 className="text-[18px] font-bold text-[#111] mb-4">상세 데이터</h3>
              <div className="flex flex-col">
                {card.detailList?.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center py-4 border-b border-gray-100 last:border-0">
                    <span className="text-[15px] text-gray-600 font-medium">{item.label}</span>
                    <span className={cn("text-[16px] font-bold", item.highlight ? "text-[#2B5DF9]" : "text-[#111]")}>
                      {item.value}
                    </span>
                  </div>
                ))}
                
                {card.detailPoints && (
                  <div className="mt-4 flex flex-col gap-3">
                    <span className="text-[15px] text-gray-600 font-medium mb-1">주요 포인트</span>
                    {card.detailPoints.map((point, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#2B5DF9] mt-2 shrink-0" />
                        <span className="text-[15px] text-[#111] font-medium leading-snug">{point}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          )}

          {/* AI Continuation Area */}
          {card.aiContinuationTitle && (
            <section className="mt-4 mb-6">
              <div className="bg-gradient-to-b from-[#F0F5FF] to-white border border-[#2B5DF9]/20 rounded-[28px] p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-[#2B5DF9]" />
                  <h3 className="text-[18px] font-bold text-[#111] leading-tight whitespace-pre-line">{card.aiContinuationTitle}</h3>
                </div>
                <p className="text-[14px] text-gray-600 font-medium leading-relaxed mb-5">
                  {card.aiContinuationDesc}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {card.aiRecommendedQuestions?.map((q, idx) => (
                    <div key={idx} className="px-3.5 py-2 bg-white border border-gray-200 rounded-full text-[13px] text-gray-600 font-bold shadow-sm">
                      {q}
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => handleAction(card.actionId!)}
                  className="w-full py-4 rounded-[20px] bg-[#111] text-white text-[16px] font-bold flex items-center justify-center gap-2 hover:bg-black/90 transition-colors shadow-md"
                >
                  <Sparkles className="w-5 h-5 text-yellow-300" />
                  {card.aiCtaText}
                </button>

                {card.secondaryCtaText && (
                  <button 
                    onClick={() => onNavigate('products')}
                    className="w-full mt-3 py-4 rounded-[20px] bg-white text-gray-700 text-[16px] font-bold border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm"
                  >
                    {card.secondaryCtaText}
                  </button>
                )}
              </div>
            </section>
          )}
        </div>
      </motion.div>
    </div>
  );
}
