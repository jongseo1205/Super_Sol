import { MessageCircle, Search, Sparkles, ChevronRight, Info } from 'lucide-react';
import { cn } from '../lib/utils';
import { AIContext } from '../types';

interface BenefitsScreenProps {
  context?: AIContext;
}

export default function BenefitsScreen({ context }: BenefitsScreenProps) {
  const tabs = ['혜택/이벤트', '생활편의'];
  const activeTab = '혜택/이벤트';

  return (
    <div className="flex flex-col min-h-full pb-8 bg-[#F4F6F9]">
      {/* Header */}
      <header className="px-5 py-4 flex justify-between items-center sticky top-0 bg-[#F4F6F9] z-10">
        <h1 className="text-[24px] font-bold text-[#111]">혜택</h1>
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
        {context?.type === 'search_result' ? (
          <div className="bg-gradient-to-r from-[#2B5DF9] to-[#5C85FF] rounded-[28px] p-5 flex flex-col gap-2 shadow-md text-white">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-white/80" />
              <span className="text-[14px] font-bold text-white/90">AI 맞춤 혜택</span>
            </div>
            <p className="text-[16px] font-bold">{context.title}</p>
            {context.query && (
              <p className="text-[13px] text-white/90 mt-1">{context.query} 분석을 반영한 추천입니다.</p>
            )}
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <div>
              <p className="text-[13px] text-[#2B5DF9] font-bold mb-1">만보걷기</p>
              <h2 className="text-[18px] font-bold text-[#111]">만보걷기에 참여해 보세요!</h2>
            </div>
            <div className="text-3xl">👟</div>
          </div>
        )}

        {/* Big Blue Card */}
        <section className="bg-[#477CFF] rounded-[32px] pt-6 px-1.5 pb-1.5 shadow-[0_4px_20px_rgba(71,124,255,0.3)]">
          <div className="px-5 pb-5 flex justify-between items-start text-white relative">
            <div className="z-10">
              <div className="text-white/90 text-[14px] mb-1 flex items-center gap-1 font-medium">
                마이신한포인트 <Info className="w-4 h-4" />
              </div>
              <div className="text-[32px] font-bold flex items-center gap-1 leading-none">
                0P <ChevronRight className="w-6 h-6" />
              </div>
            </div>
            <div className="absolute -right-2 -top-2 w-24 h-24 text-[80px] leading-none opacity-90 mix-blend-luminosity">
              🐻
            </div>
          </div>
          
          <div className="bg-white rounded-[28px] p-5 flex flex-col gap-4 text-[#111]">
            <div className="flex justify-between items-center cursor-pointer">
              <span className="text-[15px] font-medium text-gray-700">내 멤버십</span>
              <span className="text-[15px] font-bold flex items-center gap-1">
                <span className="text-green-500 text-[12px]">⬢</span> 베스트 <ChevronRight className="w-4 h-4 text-gray-400" />
              </span>
            </div>
            <div className="flex justify-between items-center cursor-pointer">
              <span className="text-[15px] font-medium text-gray-700">내 쿠폰</span>
              <span className="text-[15px] font-bold flex items-center gap-1">
                더보기 <ChevronRight className="w-4 h-4 text-gray-400" />
              </span>
            </div>
          </div>
        </section>

        {/* Points Events */}
        <section className="bg-white rounded-[28px] p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
          <h2 className="text-[18px] font-bold text-[#111] mb-6">매일매일 포인트 쌓기</h2>
          
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-xl">⚾</div>
                <div>
                  <h3 className="text-[16px] font-bold text-[#111]">SOL야구</h3>
                  <p className="text-[13px] text-gray-500 mt-0.5">365 즐기는 야구 생활</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-[#F0F5FF] text-[#2B5DF9] rounded-xl text-[13px] font-bold">
                참여하기
              </button>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-xl">⚖️</div>
                <div>
                  <h3 className="text-[16px] font-bold text-[#111]">밸런스게임</h3>
                  <p className="text-[13px] text-gray-500 mt-0.5">짜장면 VS 짬뽕</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-[#F0F5FF] text-[#2B5DF9] rounded-xl text-[13px] font-bold">
                랜덤포인트
              </button>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-xl">👟</div>
                <div>
                  <h3 className="text-[16px] font-bold text-[#111]">만보걷기</h3>
                  <p className="text-[13px] text-gray-500 mt-0.5">매일 만보걷고 포인트 받기</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-[#F0F5FF] text-[#2B5DF9] rounded-xl text-[13px] font-bold">
                랜덤포인트
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
