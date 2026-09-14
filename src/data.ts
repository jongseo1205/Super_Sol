import { InsightCardData } from './types';

export const INSIGHT_CARDS: InsightCardData[] = [
  {
    id: 'deposit_maturity',
    type: 'hero',
    category: '은행',
    iconName: 'bank',
    badge: '꼭 확인',
    title: '정기예금 3,000만원의\n만기가 다가오고 있어요',
    keyData: [
      { label: '만기까지', highlight: 'D-7' },
      { label: '현재 예금금리와 비교하면', from: '연 3.1%', to: '연 3.4%' }
    ],
    impactText: '금리 차이는 연간 약 9만원이에요.',
    aiInsight: '현재 유사 예금의 금리가 기존 상품보다 높아\n만기 전에 운용 방법을 다시 비교해볼 만해요.',
    expandedAiInsight: '만기 이후 동일 상품으로 자동 운용하기보다 현재 금리와 다른 운용 선택지를 함께 비교해볼 수 있어요.\n최근 특판 예금이 출시되어 갈아타기를 고려해볼 시점입니다.',
    detailList: [
      { label: '만기일', value: '2026.09.21' },
      { label: '현재 상품 금리', value: '연 3.1%' },
      { label: '유사 상품 최고 금리', value: '연 3.4%', highlight: true }
    ],
    detailActions: [
      { label: '내 돈 운용 살펴보기', type: 'primary', actionId: 'view_products' },
      { label: 'AI에게 맞춤 상품 묻기', type: 'ai', actionId: 'ask_ai' }
    ],
    ctaText: '내 돈 운용 살펴보기',
    priority: 1,
  },
  {
    id: 'card_overspend',
    type: 'compact',
    category: '카드',
    iconName: 'card',
    badge: '변화 큼',
    title: '이번 달 외식비가 많이 늘었어요',
    keyData: [
      { from: '42만원', to: '71만원', diff: '+69%' }
    ],
    aiInsight: '이번 달 소비 증가분의 대부분이\n주말 외식에서 발생했어요.',
    expandedAiInsight: '이번 달 소비 증가분의 대부분이 주말 외식에서 발생했어요.\n평소보다 저녁 시간대 결제가 집중된 점도 특징입니다.',
    detailList: [
      { label: '외식비 증가액', value: '+29만원', highlight: true },
      { label: '증가가 큰 요일', value: '토요일, 일요일' },
      { label: '지난달 대비 증가율', value: '+69%' },
      { label: '주요 업종', value: '음식점 / 카페' }
    ],
    detailActions: [
      { label: '소비 내역 자세히 보기', type: 'primary', actionId: 'view_finance' },
      { label: '절약 팁 보기', type: 'secondary', actionId: 'view_tips' },
      { label: 'AI에게 내 소비 패턴 물어보기', type: 'ai', actionId: 'ask_ai' }
    ],
    ctaText: '소비 내역 보기',
    priority: 2,
  },
  {
    id: 'stock_issue',
    type: 'compact',
    category: '투자 · NVIDIA',
    iconName: 'stock',
    badge: '내 투자',
    title: '보유 종목에 새로운 변화가 있어요',
    keyData: [
      { label: '평균 목표주가', from: '$185', to: '$202', diff: '+9.2%' }
    ],
    aiInsight: '실적 발표 이후 목표주가가 평균 9.2% 높아지며\n시장의 실적 기대도 함께 올라갔어요.',
    expandedAiInsight: '실적 발표 이후 7개 증권사가 목표주가를 상향 조정하면서 시장 기대 수준이 이전보다 높아졌습니다.\n특히 데이터센터 매출 성장과 가이던스가 긍정적으로 해석됐습니다.',
    detailList: [
      { label: '목표주가 상향 증권사 수', value: '7곳' },
      { label: '최근 컨센서스', value: 'BUY 24 / HOLD 7 / SELL 2' },
      { label: '실적 발표 이후 주가 반응', value: '+4.1%', highlight: true }
    ],
    detailPoints: [
      '실적 서프라이즈',
      '가이던스 상향',
      'AI 수요 지속 기대'
    ],
    detailActions: [
      { label: 'AI에게 이유 더 물어보기', type: 'ai', actionId: 'ask_ai' },
      { label: '최근 리포트 보기', type: 'secondary', actionId: 'view_report' },
      { label: '주문 화면으로 이동', type: 'primary', actionId: 'view_stocks' }
    ],
    ctaText: 'AI에게 이유 물어보기',
    priority: 3,
  }
];
