import { MessageCircle, Search, Sparkles, ChevronRight, ChevronLeft, ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';
import { AIContext } from '../types';

interface StocksScreenProps {
  context?: AIContext;
}

export default function StocksScreen({ context }: StocksScreenProps) {
  const tabs = ['MY', '관심', '탐색', '투자정보'];
  const activeTab = context?.type === 'search_result' ? '투자정보' : '투자정보';

  return (
    <div className="flex flex-col min-h-full pb-8 bg-[#F4F6F9]">
      {/* Header */}
      <header className="px-5 py-4 flex justify-between items-center sticky top-0 bg-[#F4F6F9] z-10">
        <h1 className="text-[24px] font-bold text-[#111]">주식</h1>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-gray-200/60 px-3 py-1.5 rounded-full text-[13px] font-medium text-[#111]">
            <Search className="w-4 h-4 text-gray-600" /> 주식검색
          </div>
          <MessageCircle className="w-[26px] h-[26px] stroke-[1.5] text-[#111]" />
          <Search className="w-[26px] h-[26px] stroke-[1.5] text-[#111]" />
        </div>
      </header>
      
      {/* Index Pill */}
      <div className="px-5 mb-6 mt-1">
        <div className="bg-white rounded-full px-5 py-3 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#111] text-[15px]">나스닥종합</span>
            <span className="font-bold text-[#2B5DF9] text-[15px]">26,049.05</span>
            <span className="font-medium text-[#2B5DF9] text-[13px]">-1.08%</span>
          </div>
          <div className="flex items-center gap-2 text-[12px] font-medium text-gray-500">
            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full border border-gray-300"></span> 국내</span>
            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> 미국</span>
          </div>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="px-5 flex gap-5 border-b border-gray-200 sticky top-[60px] bg-[#F4F6F9] z-10">
        {tabs.map(tab => (
          <button 
            key={tab}
            className={cn(
              "pb-3 text-[16px] relative transition-colors",
              activeTab === tab ? "font-bold text-[#111]" : "text-gray-500 font-medium"
            )}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#111]" />
            )}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="px-5 py-6 flex flex-col gap-8">
        
        {/* Context Banner */}
        {context?.type === 'search_result' && context.title && (
          <div className="bg-[#111] rounded-[28px] p-6 flex flex-col gap-3 shadow-md border border-gray-800">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#2B5DF9]" />
              <span className="text-[13px] font-bold text-[#2B5DF9]">AI 투자정보 분석</span>
            </div>
            <p className="text-[18px] font-bold text-white leading-snug">{context.title}</p>
            {context.query && (
              <p className="text-[14px] text-gray-400 mt-1">종목: {context.query}</p>
            )}
            <button className="mt-3 py-3.5 w-full bg-white text-[#111] font-bold text-[15px] rounded-xl">
              주문하기
            </button>
          </div>
        )}

        {/* AI Market Summary */}
        <section className="bg-white rounded-[28px] p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-[18px] font-bold text-[#2B5DF9] mb-1">AI 시황 요약</h2>
              <p className="text-[13px] text-gray-500">26.09.14 11:40 기준</p>
            </div>
            <div className="flex items-center gap-1 bg-gray-50 rounded-full px-2 py-1 border border-gray-200">
              <span className="text-[11px] font-medium text-gray-600 px-1">국내</span>
              <span className="text-[11px] font-bold text-[#111] bg-white px-2 py-0.5 rounded-full shadow-sm border border-gray-100 flex items-center gap-1">
                🇺🇸 미국
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-2 text-[15px] text-[#111] leading-relaxed">
            <p className="flex items-start gap-2">
              <span className="mt-0.5">📈</span>
              <span>S&P500(미국 날짜 2026-09-14) 시황 요약</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="mt-0.5">🔔</span>
              <span>시장 이벤트</span>
            </p>
            <p className="text-gray-600 line-clamp-2 mt-1">
              미국 시가에서 S&P 500은 45.5포인트(0.59%) 하락한 7,61...
            </p>
          </div>
        </section>

        {/* AI PB Section */}
        <section>
          <h2 className="text-[18px] font-bold text-[#111] flex items-center gap-2 mb-4">
            <span className="text-[20px] font-black text-[#2B5DF9] italic">S</span>
            AI PB에게 물어보세요
          </h2>
          <div className="border-[2px] border-[#2B5DF9] rounded-full px-5 py-3.5 flex justify-between items-center bg-white shadow-sm">
            <input 
              type="text" 
              placeholder="월트디즈니 자발적 상장폐지 발표, 영향은?" 
              className="bg-transparent outline-none flex-1 text-[15px] text-[#111] placeholder:text-gray-400"
            />
            <Search className="w-5 h-5 text-[#111]" />
          </div>
        </section>

        {/* Hot Issues */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[18px] font-bold text-[#111] flex items-center gap-1.5">
              <span className="text-red-500">🔥</span> 지금 주목할 이슈
            </h2>
            <div className="flex items-center text-gray-400 text-[13px] font-medium gap-1">
              <ChevronLeft className="w-4 h-4" /> 1 / 4 <ChevronRight className="w-4 h-4" />
            </div>
          </div>
          
          <div className="flex gap-4 overflow-x-auto scrollbar-hide -mx-5 px-5 pb-4">
            <div className="min-w-[160px] bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col shrink-0">
              <div className="h-24 bg-[#7FA4C3] relative flex items-center justify-center">
                <span className="text-4xl">📉</span>
              </div>
              <div className="p-4">
                <h3 className="text-[14px] font-bold text-[#111] leading-snug">FOMC 결과에 따른<br/>코스피 영향 분석은?</h3>
              </div>
            </div>
            
            <div className="min-w-[160px] bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col shrink-0">
              <div className="h-24 bg-[#7FA4C3] relative flex items-center justify-center">
                <span className="text-4xl">💵</span>
              </div>
              <div className="p-4">
                <h3 className="text-[14px] font-bold text-[#111] leading-snug">FOMC 금리 신호,<br/>S&P500 단기 영향은?</h3>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
