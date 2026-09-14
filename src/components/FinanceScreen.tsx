import { MessageCircle, Search, Settings, Info, ChevronRight, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';
import { AIContext } from '../types';

interface FinanceScreenProps {
  context?: AIContext;
}

export default function FinanceScreen({ context }: FinanceScreenProps) {
  const tabs = ['은행', '카드', '증권', '보험'];
  const activeTab = '은행';

  return (
    <div className="flex flex-col min-h-full pb-8 bg-[#F4F6F9]">
      {/* Header */}
      <header className="px-5 py-4 flex justify-between items-center sticky top-0 bg-[#F4F6F9] z-10">
        <h1 className="text-[24px] font-bold text-[#111]">금융</h1>
        <div className="flex items-center gap-4 text-[#111]">
          <MessageCircle className="w-[26px] h-[26px] stroke-[1.5]" />
          <Search className="w-[26px] h-[26px] stroke-[1.5]" />
        </div>
      </header>
      
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
      <div className="px-5 py-6 flex flex-col gap-6">
        
        {/* Context Banner */}
        {context?.type === 'search_result' && (
          <div className="bg-[#EBF0F9] rounded-2xl p-4 flex flex-col gap-2 shadow-sm border border-[#2B5DF9]/10">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#2B5DF9]" />
              <span className="text-[14px] font-bold text-[#2B5DF9]">AI 맞춤 제안</span>
            </div>
            <p className="text-[15px] font-bold text-[#111]">{context.title}</p>
            {context.query && (
              <p className="text-[13px] text-gray-600">{context.query}</p>
            )}
          </div>
        )}

        <div className="flex items-center gap-2 mb-2">
          <span className="text-[15px] font-medium text-[#111]">금액</span>
          <div className="w-12 h-6 bg-[#2B5DF9] rounded-full flex items-center px-1">
            <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center text-[#2B5DF9] text-[10px] font-bold">₩</div>
          </div>
          <div className="ml-auto flex items-center text-[14px] text-gray-600 font-medium">
            편집 <ChevronRight className="w-4 h-4" />
          </div>
        </div>

        {/* Account List */}
        <section className="bg-white rounded-[28px] p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-[18px] font-bold text-[#111]">계좌</h2>
            <button className="text-[14px] text-gray-500 font-medium flex items-center">
              전체계좌 <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex flex-col">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#2B5DF9] flex items-center justify-center text-white font-bold text-xl leading-none">
                  S
                </div>
                <div>
                  <p className="text-[15px] font-bold text-[#111]">입출금 [거래중지계좌]저축예금</p>
                  <p className="text-[13px] text-gray-500 mt-0.5 flex items-center gap-1">신한 227-02-120563 <span className="text-gray-400">⧉</span></p>
                </div>
              </div>
              <Settings className="w-5 h-5 text-gray-400" />
            </div>
            
            <div className="text-[26px] font-bold text-[#111] mb-5">0원</div>
            
            <button className="w-full py-3.5 bg-[#F0F5FF] hover:bg-[#E1EAFF] transition-colors rounded-xl text-[15px] font-bold text-[#2B5DF9]">
              해지
            </button>
          </div>
        </section>

        {/* Banner */}
        <section className="flex items-center justify-between bg-transparent">
          <div>
            <h2 className="text-[16px] font-bold text-[#111]">신한은행에서 개인형IRP 통합관리하기</h2>
            <button className="text-[#2B5DF9] text-[13px] font-medium flex items-center mt-1">
              퇴직연금 가져오기 <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="w-20 h-20 bg-gray-200/50 rounded-2xl flex items-center justify-center text-3xl">
            🏦
          </div>
        </section>

        {/* Asset Management List */}
        <section className="bg-white rounded-[28px] p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
          <h2 className="text-[18px] font-bold text-[#111] mb-6">자산관리</h2>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-xl">
                💰
              </div>
              <div>
                <p className="text-[13px] text-gray-500">금융자산, 부동산, 자동차까지</p>
                <p className="text-[16px] font-bold text-[#111]">내 모든 자산 한 눈에 보기</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </section>

      </div>
    </div>
  );
}
