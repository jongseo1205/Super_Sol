export type Tab = 'home' | 'finance' | 'products' | 'benefits' | 'stocks';
export type AICategory = '은행' | '카드' | '투자' | '보험' | '자산관리' | 'News';

export interface KeyData {
  label?: string;
  from?: string;
  to?: string;
  diff?: string;
  highlight?: string;
}

export interface DetailItem {
  label: string;
  value: string;
  highlight?: boolean;
}

export interface ActionItem {
  label: string;
  type: 'primary' | 'secondary' | 'ai';
  actionId: string;
}

export interface InsightCardData {
  id: string;
  type: 'hero' | 'compact';
  category: string;
  iconName?: 'bank' | 'card' | 'stock';
  badge?: string;
  title: string;
  keyData: KeyData[];
  impactText?: string;
  aiInsight: string;
  expandedAiInsight?: string;
  detailList?: DetailItem[];
  detailPoints?: string[];
  detailActions?: ActionItem[];
  ctaText: string;
  priority: number;
}

export interface AIContext {
  type: 'card' | 'global' | 'search_result';
  cardId?: string;
  query?: string;
  title?: string;
  description?: string;
}
