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
    aiContinuationTitle: 'AI가 만기자금 운용안을 먼저 비교해드릴게요',
    aiContinuationDesc: '현재 상품과 비슷한 조건의 예금상품을 먼저 비교하고, 내 상황에 맞는 선택지를 정리해드릴 수 있어요.',
    aiRecommendedQuestions: [
      '지금 나에게 맞는 예금은 뭐야?',
      '6개월과 12개월 중 뭐가 나을까?',
      '3,000만원 넣으면 이자가 얼마나 차이나?',
      '금리 높은 상품부터 보여줘'
    ],
    aiCtaText: 'AI가 예금 3개 먼저 비교해주기',
    secondaryCtaText: '더 많은 상품 보기',
    actionId: 'agent_deposit',
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
    aiContinuationTitle: 'AI가 소비 증가 원인을 더 분석해드릴게요',
    aiContinuationDesc: '지금 보고 있는 외식비 증가, 요일별 특징, 업종 정보를 바탕으로 소비 패턴을 더 자세히 분석할 수 있어요.',
    aiRecommendedQuestions: [
      '어디에서 가장 많이 썼어?',
      '지난 3개월과 비교하면 어때?',
      '줄일 수 있는 소비는 뭐야?',
      '다음 달 예산은 어떻게 잡는 게 좋아?'
    ],
    aiCtaText: 'AI가 내 소비 패턴 분석하기',
    actionId: 'agent_spending',
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
    aiContinuationTitle: 'AI가 이어서 분석해드릴게요',
    aiContinuationDesc: '지금 보고 있는 목표주가 상향, 컨센서스, 실적 반응을 바탕으로 왜 이런 변화가 생겼는지 더 설명할 수 있어요.',
    aiRecommendedQuestions: [
      '왜 목표주가가 올랐나요?',
      '실적이 얼마나 좋았나요?',
      '지금 주가에 이미 반영됐나요?',
      '주문 전 체크할 점은 뭐예요?'
    ],
    aiCtaText: 'AI와 이어서 보기',
    actionId: 'agent_stock',
    ctaText: 'AI에게 이유 물어보기',
    priority: 3,
  }
];
