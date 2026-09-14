import React, { useState } from 'react';
import { Home, Wallet, ShoppingBag, Gift, TrendingUp } from 'lucide-react';
import { cn } from './lib/utils';
import { Tab, AIContext } from './types';
import HomeScreen from './components/HomeScreen';
import AIAgentScreen from './components/AIAgentScreen';
import ProductsScreen from './components/ProductsScreen';
import FinanceScreen from './components/FinanceScreen';
import StocksScreen from './components/StocksScreen';
import BenefitsScreen from './components/BenefitsScreen';
import InsightDetailScreen from './components/InsightDetailScreen';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [aiContext, setAiContext] = useState<AIContext | null>(null);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

  const navigateTo = (tab: Tab) => {
    setActiveTab(tab);
    setAiContext(null);
    setSelectedCardId(null);
  };

  const openAIAgent = (context: AIContext) => {
    setAiContext(context);
  };

  const closeAIAgent = () => {
    setAiContext(null);
  };

  const renderScreen = () => {
    // If it's a conversation context, show the overlay AI Agent
    if (aiContext && (aiContext.type === 'global' || aiContext.type === 'card')) {
      return (
        <AIAgentScreen 
          context={aiContext} 
          onClose={closeAIAgent}
          onNavigate={(tab, newContext) => {
            setActiveTab(tab);
            setAiContext(newContext || null);
            setSelectedCardId(null);
          }}
        />
      );
    }

    if (selectedCardId) {
      return (
        <InsightDetailScreen 
          cardId={selectedCardId}
          onBack={() => setSelectedCardId(null)}
          onNavigate={(tab, newContext) => {
            setSelectedCardId(null);
            setActiveTab(tab);
            if (newContext) setAiContext(newContext);
          }}
          onOpenAI={openAIAgent}
        />
      );
    }

    // For other tabs, potentially pass the context if it's a search_result
    const contextProp = aiContext?.type === 'search_result' ? aiContext : undefined;

    switch (activeTab) {
      case 'home':
        return <HomeScreen onOpenAI={openAIAgent} onSelectCard={(id) => setSelectedCardId(id)} />;
      case 'finance':
        return <FinanceScreen context={contextProp} />;
      case 'products':
        return <ProductsScreen context={contextProp} />;
      case 'benefits':
        return <BenefitsScreen context={contextProp} />;
      case 'stocks':
        return <StocksScreen context={contextProp} />;
      default:
        return <HomeScreen onOpenAI={openAIAgent} onSelectCard={(id) => setSelectedCardId(id)} />;
    }
  };

  return (
    <div className="flex justify-center w-full min-h-screen bg-[#F4F6F9] font-sans text-[#111]">
      <div className="w-full min-h-screen relative flex flex-col">
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto pb-[100px] md:pb-[120px]">
          {renderScreen()}
        </main>

        {/* Bottom Navigation Bar */}
        {!(aiContext && (aiContext.type === 'global' || aiContext.type === 'card')) && !selectedCardId && (
          <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center pointer-events-none px-4">
            <nav className="w-full max-w-md h-[76px] bg-white/95 backdrop-blur-md border border-gray-100 flex items-center justify-around px-2 rounded-[38px] shadow-[0_8px_30px_rgba(0,0,0,0.06)] pointer-events-auto">
              <NavItem 
                icon={<Home size={26} strokeWidth={isActive(activeTab, 'home') ? 2.5 : 2} />} 
                label="홈" 
                isActive={isActive(activeTab, 'home')} 
                onClick={() => navigateTo('home')} 
              />
              <NavItem 
                icon={<Wallet size={26} strokeWidth={isActive(activeTab, 'finance') ? 2.5 : 2} />} 
                label="금융" 
                isActive={isActive(activeTab, 'finance')} 
                onClick={() => navigateTo('finance')} 
              />
              <NavItem 
                icon={<ShoppingBag size={26} strokeWidth={isActive(activeTab, 'products') ? 2.5 : 2} />} 
                label="상품" 
                isActive={isActive(activeTab, 'products')} 
                onClick={() => navigateTo('products')} 
              />
              <NavItem 
                icon={<Gift size={26} strokeWidth={isActive(activeTab, 'benefits') ? 2.5 : 2} />} 
                label="혜택" 
                isActive={isActive(activeTab, 'benefits')} 
                onClick={() => navigateTo('benefits')} 
              />
              <NavItem 
                icon={<TrendingUp size={26} strokeWidth={isActive(activeTab, 'stocks') ? 2.5 : 2} />} 
                label="주식" 
                isActive={isActive(activeTab, 'stocks')} 
                onClick={() => navigateTo('stocks')} 
              />
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}

function isActive(current: string, target: string) {
  return current === target;
}

function NavItem({ icon, label, isActive, onClick }: { icon: React.ReactNode, label: string, isActive: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="flex flex-col items-center justify-center w-[64px] h-[64px] gap-1.5 rounded-2xl transition-all active:scale-95"
    >
      <div className={cn("transition-colors", isActive ? "text-[#2B5DF9]" : "text-[#94A3B8]")}>
        {icon}
      </div>
      <span className={cn("text-[11px] font-bold transition-colors", isActive ? "text-[#2B5DF9]" : "text-[#94A3B8]")}>
        {label}
      </span>
    </button>
  );
}
