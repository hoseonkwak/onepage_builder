import { defineStore } from 'pinia'
import type {
  SiteContent,
  TemplateType,
  SectionConfig,
  SectionType,
  NavItem,
  HeaderContent,
  HeroContent,
  ChurchIntroContent
} from '~/types/site'

// 섹션 라벨 맵
const sectionLabels: Record<SectionType, string> = {
  header: '헤더',
  hero: '히어로',
  churchIntro: '교회소개',
  about: '소개',
  gallery: '갤러리',
  testimonial: '고객후기',
  pricing: '가격표',
  team: '팀 소개',
  faq: 'FAQ',
  cta: 'CTA',
  contact: '연락처',
  footer: '푸터'
}

// 네비게이션에 표시할 섹션
const navSections: SectionType[] = [
  'churchIntro',
  'about',
  'gallery',
  'testimonial',
  'pricing',
  'team',
  'faq',
  'contact'
]

// 기본 사이트 콘텐츠
const getDefaultContent = (): SiteContent => ({
  templateId: 'business',
  sections: [
    { type: 'header', enabled: true, order: 0, id: 'header' },
    { type: 'hero', enabled: true, order: 1, id: 'hero' },
    { type: 'churchIntro', enabled: true, order: 2, id: 'churchIntro' },
    { type: 'about', enabled: true, order: 3, id: 'about' },
    { type: 'gallery', enabled: false, order: 4, id: 'gallery' },
    { type: 'testimonial', enabled: true, order: 5, id: 'testimonial' },
    { type: 'pricing', enabled: true, order: 6, id: 'pricing' },
    { type: 'team', enabled: false, order: 7, id: 'team' },
    { type: 'faq', enabled: true, order: 8, id: 'faq' },
    { type: 'cta', enabled: true, order: 9, id: 'cta' },
    { type: 'contact', enabled: true, order: 10, id: 'contact' },
    { type: 'footer', enabled: true, order: 11, id: 'footer' }
  ],
  header: {
    logoText: 'Brand',
    sticky: true,
    showLogin: true,
    loginText: '로그인',
    loginLink: '/login'
  },
  hero: {
    title: '비즈니스를 성장시키세요',
    subtitle: '최고의 솔루션으로 더 나은 결과를 만들어보세요',
    description: '',
    buttonText: '자세히 보기',
    buttonLink: '#features',
    buttonUseTheme: true,
    buttonTextDark: false,
    buttonBgColor: '#3b82f6',
    buttonTextColor: '#ffffff',
    buttonBorderRadius: 8,
    backgroundImage: '',
    textAlign: 'center',
    height: 500,
    dimEnabled: true,
    dimOpacity: 30,
    textDark: false
  },
  churchIntro: {
    title: '교회소개',
    subtitle: '하나님의 사랑을 나누는 공동체',
    items: [
      { icon: 'mdi:cross', title: '예배', description: '매주 주일 예배와 수요 예배를 드립니다' },
      { icon: 'mdi:book-open-variant', title: '말씀', description: '성경 중심의 말씀을 전합니다' },
      { icon: 'mdi:account-group', title: '교제', description: '서로 사랑하며 함께 성장합니다' }
    ],
    columns: 3,
    style: 'cards'
  },
  about: {
    title: '우리에 대해',
    subtitle: '신뢰할 수 있는 파트너',
    description: '10년 이상의 경험을 바탕으로 고객의 성공을 위해 최선을 다하고 있습니다. 혁신적인 솔루션과 전문적인 서비스로 비즈니스 목표 달성을 도와드립니다.',
    stats: [
      { value: '100+', label: '고객사' },
      { value: '500+', label: '프로젝트' },
      { value: '99%', label: '만족도' }
    ],
    layout: 'image-right'
  },
  gallery: {
    title: '포트폴리오',
    subtitle: '우리의 작업을 확인하세요',
    items: [],
    columns: 3,
    style: 'grid'
  },
  testimonial: {
    title: '고객 후기',
    subtitle: '고객들이 말하는 우리 서비스',
    items: [
      {
        content: '정말 훌륭한 서비스입니다. 비즈니스 성장에 큰 도움이 되었습니다.',
        author: '김철수',
        role: 'CEO',
        company: 'ABC Company',
        rating: 5
      },
      {
        content: '전문적이고 친절한 팀 덕분에 프로젝트를 성공적으로 완료했습니다.',
        author: '이영희',
        role: 'Marketing Director',
        company: 'XYZ Corp',
        rating: 5
      }
    ],
    style: 'cards'
  },
  pricing: {
    title: '가격 안내',
    subtitle: '비즈니스에 맞는 플랜을 선택하세요',
    plans: [
      {
        name: 'Basic',
        price: '29,000',
        period: '월',
        features: ['기본 기능', '이메일 지원', '5GB 저장공간'],
        ctaText: '시작하기',
        ctaLink: '#contact',
        highlighted: false
      },
      {
        name: 'Pro',
        price: '59,000',
        period: '월',
        features: ['모든 기능', '우선 지원', '50GB 저장공간', 'API 접근'],
        ctaText: '시작하기',
        ctaLink: '#contact',
        highlighted: true
      },
      {
        name: 'Enterprise',
        price: '문의',
        period: '',
        features: ['맞춤 기능', '전담 매니저', '무제한 저장공간', 'SLA 보장'],
        ctaText: '문의하기',
        ctaLink: '#contact',
        highlighted: false
      }
    ],
    billingToggle: false
  },
  team: {
    title: '팀 소개',
    subtitle: '열정적인 전문가들이 함께합니다',
    members: [],
    columns: 3
  },
  faq: {
    title: '자주 묻는 질문',
    subtitle: '궁금한 점이 있으신가요?',
    items: [
      { question: '무료 체험이 가능한가요?', answer: '네, 14일 무료 체험을 제공합니다.' },
      { question: '결제 방법은 무엇인가요?', answer: '신용카드, 계좌이체, 페이팔 등 다양한 결제 수단을 지원합니다.' },
      { question: '환불 정책은 어떻게 되나요?', answer: '구매 후 7일 이내 100% 환불이 가능합니다.' }
    ],
    style: 'accordion'
  },
  cta: {
    title: '지금 바로 시작하세요',
    subtitle: '14일 무료 체험으로 모든 기능을 경험해보세요',
    ctaText: '무료로 시작하기',
    ctaLink: '#contact',
    backgroundColor: '#3b82f6'
  },
  contact: {
    title: '문의하기',
    subtitle: '궁금한 점이 있으시면 언제든 연락주세요',
    email: 'contact@example.com',
    phone: '02-1234-5678',
    address: '서울시 강남구 테헤란로 123',
    mapEnabled: false,
    formEnabled: true
  },
  footer: {
    copyright: '© 2024 Brand. All rights reserved.',
    social: [
      { platform: 'facebook', url: '#' },
      { platform: 'instagram', url: '#' },
      { platform: 'twitter', url: '#' }
    ]
  },
  settings: {
    primaryColor: '#3b82f6',
    fontFamily: 'Pretendard',
    logoText: 'Brand'
  }
})

// 빌더 템플릿 타입 (type1, type2, type3)
export type BuilderTemplateType = 'type1' | 'type2' | 'type3'

export const useSiteStore = defineStore('site', {
  state: () => ({
    content: getDefaultContent() as SiteContent,
    selectedSection: null as SectionType | null,
    isDirty: false,
    builderTemplate: null as BuilderTemplateType | null // 선택된 빌더 템플릿
  }),

  getters: {
    // 활성화된 섹션만 순서대로
    enabledSections: (state): SectionConfig[] => {
      return [...state.content.sections]
        .filter(s => s.enabled)
        .sort((a, b) => a.order - b.order)
    },

    // 네비게이션 아이템 생성
    navItems: (state): NavItem[] => {
      return [...state.content.sections]
        .filter(s => s.enabled && navSections.includes(s.type))
        .sort((a, b) => a.order - b.order)
        .map(s => ({
          label: sectionLabels[s.type],
          href: `#${s.id}`
        }))
    },

    // 섹션 라벨 가져오기
    getSectionLabel: () => (type: SectionType): string => {
      return sectionLabels[type]
    }
  },

  actions: {
    // 빌더 템플릿 선택
    selectBuilderTemplate(template: BuilderTemplateType) {
      this.builderTemplate = template
      if (import.meta.client) {
        localStorage.setItem('onepage-builder-template', template)
      }
    },

    // 빌더 템플릿 초기화 (템플릿 선택 화면으로 돌아가기)
    resetBuilderTemplate() {
      this.builderTemplate = null
      if (import.meta.client) {
        localStorage.removeItem('onepage-builder-template')
      }
    },

    // 템플릿 변경
    setTemplate(templateId: TemplateType) {
      this.content.templateId = templateId
      this.isDirty = true
      // TODO: 템플릿별 기본 섹션 구성 적용
    },

    // 섹션 활성화/비활성화
    toggleSection(type: SectionType) {
      const section = this.content.sections.find(s => s.type === type)
      if (section) {
        section.enabled = !section.enabled
        this.isDirty = true
      }
    },

    // 섹션 순서 변경
    reorderSections(sections: SectionConfig[]) {
      sections.forEach((section, index) => {
        const target = this.content.sections.find(s => s.type === section.type)
        if (target) {
          target.order = index
        }
      })
      this.isDirty = true
    },

    // 섹션 선택
    selectSection(type: SectionType | null) {
      this.selectedSection = type
    },

    // 헤더 콘텐츠 업데이트
    updateHeader(content: HeaderContent) {
      this.content.header = content
      this.isDirty = true
    },

    // 히어로 콘텐츠 업데이트
    updateHero(content: HeroContent) {
      this.content.hero = content
      this.isDirty = true
    },

    // 교회소개 콘텐츠 업데이트
    updateChurchIntro(content: ChurchIntroContent) {
      this.content.churchIntro = content
      this.isDirty = true
    },

    // 섹션 콘텐츠 업데이트
    updateSectionContent<K extends keyof SiteContent>(
      sectionKey: K,
      content: Partial<SiteContent[K]>
    ) {
      if (this.content[sectionKey]) {
        this.content[sectionKey] = {
          ...this.content[sectionKey],
          ...content
        } as SiteContent[K]
        this.isDirty = true
      }
    },

    // 전역 설정 업데이트
    updateSettings(settings: Partial<SiteContent['settings']>) {
      this.content.settings = {
        ...this.content.settings,
        ...settings
      }
      this.isDirty = true
    },

    // localStorage에 저장
    saveToLocal() {
      if (import.meta.client) {
        localStorage.setItem('onepage-content', JSON.stringify(this.content))
        this.isDirty = false
      }
    },

    // localStorage에서 불러오기
    loadFromLocal() {
      if (import.meta.client) {
        // 빌더 템플릿 불러오기
        const savedTemplate = localStorage.getItem('onepage-builder-template')
        if (savedTemplate) {
          this.builderTemplate = savedTemplate as BuilderTemplateType
        }

        const saved = localStorage.getItem('onepage-content')
        if (saved) {
          try {
            const parsed = JSON.parse(saved)
            // 기본값과 병합하여 누락된 필드 보완
            const defaults = getDefaultContent()
            this.content = {
              ...defaults,
              ...parsed,
              header: { ...defaults.header, ...parsed.header },
              hero: { ...defaults.hero, ...parsed.hero },
              churchIntro: { ...defaults.churchIntro, ...parsed.churchIntro },
              about: { ...defaults.about, ...parsed.about },
              contact: { ...defaults.contact, ...parsed.contact },
              footer: { ...defaults.footer, ...parsed.footer },
              settings: { ...defaults.settings, ...parsed.settings }
            }
          } catch (e) {
            console.error('Failed to load saved content:', e)
          }
        }
      }
    },

    // 초기화
    resetContent() {
      this.content = getDefaultContent()
      this.isDirty = false
    }
  }
})
