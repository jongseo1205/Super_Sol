import { MessageCircle, Search, ShoppingCart, Sparkles, ChevronRight, ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';
import { AIContext } from '../types';

interface ProductsScreenProps {
  context?: AIContext;
}

export default function ProductsScreen({ context }: ProductsScreenProps) {
  const tabs = ['발견', '입출금', '저축', '카드', '대출', '외환', '투자'];
  const activeTab = '발견';

  return (
    <div className="flex flex-col min-h-full pb-8 bg-[#F4F6F9]">
      {/* Header */}
      <header className="px-5 py-4 flex justify-between items-center sticky top-0 bg-[#F4F6F9] z-10">
        <h1 className="text-[24px] font-bold text-[#111] flex items-center gap-1">모든상품 <ChevronDown className="w-5 h-5" /></h1>
        <div className="flex items-center gap-4 text-[#111]">
          <ShoppingCart className="w-[26px] h-[26px] stroke-[1.5]" />
          <MessageCircle className="w-[26px] h-[26px] stroke-[1.5]" />
          <Search className="w-[26px] h-[26px] stroke-[1.5]" />
        </div>
      </header>
      
      {/* Sub Tabs */}
      <div className="px-5 flex gap-5 border-b border-gray-200 sticky top-[60px] bg-[#F4F6F9] z-10 overflow-x-auto scrollbar-hide">
        {tabs.map(tab => (
          <button 
            key={tab}
            className={cn(
              "pb-3 text-[16px] whitespace-nowrap relative transition-colors",
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
        {context?.type === 'search_result' && context.title ? (
          <div className="bg-[#EBF0F9] rounded-2xl p-4 flex items-start gap-3 border border-[#2B5DF9]/10">
            <Sparkles className="w-5 h-5 text-[#2B5DF9] shrink-0 mt-0.5" />
            <div>
              <p className="text-[15px] font-bold text-[#111] leading-snug">{context.title}</p>
              {context.query && (
                <p className="text-[13px] text-[#2B5DF9] mt-1 font-medium">{context.query}</p>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 mb-2">
            <div className="w-5 h-5 rounded-full bg-[#2B5DF9] flex items-center justify-center text-white font-bold text-[10px]">S</div>
            <span className="text-[16px] font-bold text-[#111]">어떤 상품을 찾으세요?</span>
          </div>
        )}

        {/* Search */}
        <div className="border-[2px] border-[#2B5DF9] rounded-full px-5 py-3.5 flex justify-between items-center bg-white shadow-sm">
          <input 
            type="text" 
            placeholder="카페, 쇼핑 할인 카드 추천해줘" 
            defaultValue={context?.type === 'search_result' ? context.query : ''}
            className="bg-transparent outline-none flex-1 text-[15px] text-[#111] placeholder:text-gray-400"
          />
          <Search className="w-5 h-5 text-[#111]" />
        </div>

        {/* Special Zone */}
        <section className="bg-white rounded-[28px] p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col gap-5">
          <h2 className="text-[18px] font-bold text-[#111]">특화 ZONE</h2>
          
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-xl">🔗</div>
            <div className="flex-1">
              <h3 className="text-[16px] font-bold text-[#111]">신한 SOL LINK</h3>
              <p className="text-[13px] text-gray-500 mt-0.5">증권 거래 수수료가 낮은<br/>은행·증권 통합계좌</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-300" />
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-xl">💡</div>
            <div className="flex-1">
              <h3 className="text-[16px] font-bold text-[#111]">신한 적금 9단</h3>
              <p className="text-[13px] text-gray-500 mt-0.5">첫 적금, 결제계좌 우대하는 목돈마련의 한 수!</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-300" />
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-xl">🌿</div>
            <div className="flex-1">
              <h3 className="text-[16px] font-bold text-[#111]">올리브영 SOL통장</h3>
              <p className="text-[13px] text-gray-500 mt-0.5">올리브영 리워드 최대 11만원 혜택</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-300" />
          </div>
        </section>

        {/* Interests Tags */}
        <section className="bg-white rounded-[28px] p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
          <h2 className="text-[18px] font-bold text-[#111] mb-5">요즘 내 관심사는?</h2>
          <div className="flex flex-wrap gap-2">
            <span className="px-4 py-2 bg-[#2C3E50] text-white text-[14px] rounded-full flex items-center gap-1 font-medium">
              💼 여행
            </span>
            <span className="px-4 py-2 bg-white border border-gray-200 text-[#111] text-[14px] rounded-full flex items-center gap-1 font-medium">
              ❤️ 건강
            </span>
            <span className="px-4 py-2 bg-white border border-gray-200 text-[#111] text-[14px] rounded-full flex items-center gap-1 font-medium">
              💵 재테크
            </span>
            <span className="px-4 py-2 bg-white border border-gray-200 text-[#111] text-[14px] rounded-full flex items-center gap-1 font-medium">
              🏠 부동산
            </span>
            <span className="px-4 py-2 bg-white border border-gray-200 text-[#111] text-[14px] rounded-full flex items-center gap-1 font-medium">
              👴 은퇴
            </span>
          </div>
        </section>

      </div>
    </div>
  );
}
