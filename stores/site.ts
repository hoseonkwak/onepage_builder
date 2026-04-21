import { defineStore } from 'pinia'
import type {
  SiteContent,
  TemplateType,
  SectionConfig,
  SectionType,
  NavItem,
  HeaderContent,
  HeroContent,
  ChurchIntroContent,
  WorshipInfoContent,
  BoardContent,
  NewFamilyInfoContent,
  YouthContent,
  GalleryContent,
  MapContent,
  FooterContent
} from '~/types/site'

// 섹션 라벨 맵
const sectionLabels: Record<SectionType, string> = {
  header: '헤더',
  hero: '히어로',
  churchIntro: '교회소개',
  worshipInfo: '예배안내',
  board: '게시판',
  newfamilyInfo: '새가족안내',
  youth: '교회학교',
  gallery: '갤러리',
  map: '지도',
  footer: '푸터'
}

// 네비게이션에 표시할 섹션
const navSections: SectionType[] = [
  'churchIntro',
  'worshipInfo',
  'board',
  'newfamilyInfo',
  'youth',
  'gallery',
  'map'
]

// 기본 사이트 콘텐츠
const getDefaultContent = (): SiteContent => ({
  templateId: 'business',
  sections: [
    { type: 'header', enabled: true, order: 0, id: 'header', useBgColor: false, bgColor: '#ffffff' },
    { type: 'hero', enabled: true, order: 1, id: 'hero', useBgColor: false, bgColor: '#ffffff' },
    { type: 'churchIntro', enabled: true, order: 2, id: 'churchIntro', useBgColor: false, bgColor: '#ffffff' },
    { type: 'worshipInfo', enabled: true, order: 3, id: 'worshipInfo', useBgColor: true, bgColor: '#f3f4f6' },
    { type: 'board', enabled: true, order: 4, id: 'board', useBgColor: false, bgColor: '#ffffff' },
    { type: 'newfamilyInfo', enabled: true, order: 5, id: 'newfamilyInfo', useBgColor: true, bgColor: '#f9fafb' },
    { type: 'youth', enabled: true, order: 6, id: 'youth', useBgColor: false, bgColor: '#ffffff' },
    { type: 'gallery', enabled: true, order: 7, id: 'gallery', useBgColor: true, bgColor: '#f9fafb' },
    { type: 'map', enabled: true, order: 8, id: 'map', useBgColor: false, bgColor: '#ffffff' },
    { type: 'footer', enabled: true, order: 9, id: 'footer', useBgColor: false, bgColor: '#ffffff' }
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
    showDivider: true,
    items: [
      { icon: 'mdi:cross', title: '예배', description: '매주 주일 예배와 수요 예배를 드립니다' },
      { icon: 'mdi:book-open-variant', title: '말씀', description: '성경 중심의 말씀을 전합니다' },
      { icon: 'mdi:account-group', title: '교제', description: '서로 사랑하며 함께 성장합니다' }
    ],
    columns: 3,
    style: 'cards',
    iconUseTheme: true,
    iconBgColor: '#dbeafe',
    iconColor: '#3b82f6',
    cardBgColor: '#f9fafb',
    cardShadow: 'none',
    cardShadowDir: 'bottom',
    cardShadowX: 0,
    cardShadowY: 4,
    cardShadowBlur: 6,
    cardShadowSpread: -1,
    cardShadowColor: '#00000015'
  },
  worshipInfo: {
    title: '예배안내',
    subtitle: '은혜가 넘치는 예배가 있습니다.',
    items: [
      { icon: 'mdi:check-circle-outline', title: '주일 예배', description: '주일낮예배 오전 11:00\n주일오후기도회 오후 2:00' },
      { icon: 'mdi:account-group', title: '교회학교 예배', description: '유초등부 오후 2:00\n중고등부 오후 2:00\n청년부 오후 2:00' },
      { icon: 'mdi:calendar', title: '주일 외 예배', description: '새벽기도회 오전 5:00\n수요기도회 오후 7:30' }
    ],
    columns: 3,
    iconUseTheme: false,
    iconBgColor: 'transparent',
    iconColor: '#1f2937',
    bgColor: '#f3f4f6',
    showDivider: true
  },
  board: {
    title: '주보 게시판',
    subtitle: '금주의 주보를 확인해보세요.',
    showDivider: true,
    items: [
      { title: '[55-35] 2025년 8월 31일 주보', date: '2025-08-31 09:50:46', author: '김현' },
      { title: '[55-34] 2025년 8월 24일 주보', date: '2025-08-23 10:44:10', author: '김현' },
      { title: '[55-33] 2025년 8월 17일 주보', date: '2025-08-20 10:09:15', author: '김현' }
    ],
    backgroundImage: '',
    dimEnabled: true,
    dimOpacity: 50,
    textDark: false,
    iconUseTheme: true,
    iconBgColor: '#1d4ed8',
    iconColor: '#ffffff',
    moreText: '주보 더보기',
    moreLink: '#'
  },
  newfamilyInfo: {
    title: '새가족안내',
    subtitle: '새가족등록방법 안내',
    showDivider: true,
    steps: [
      { label: 'STEP-1', title: '교인등록', subtitle: '새가족 등록카드 작성', description: '새가족부의 안내에 따라 등록해 주시면 됩니다.', buttonText: '등록카드 작성', buttonLink: '#', buttonUseTheme: false, buttonTextDark: false, buttonBgColor: '#111827', buttonTextColor: '#ffffff' },
      { label: 'STEP-2', title: '대면심방', subtitle: '1시간 소요', description: '은천제일교회에 새로 등록하신 분들은 담임목사와 면담이 있습니다.', buttonUseTheme: false, buttonTextDark: false, buttonBgColor: '#111827', buttonTextColor: '#ffffff' },
      { label: 'STEP-3', title: '양육', subtitle: '5주과정', description: '5주과정의 새가족양육을 시간을 맞추어 함께 받습니다.', buttonUseTheme: false, buttonTextDark: false, buttonBgColor: '#111827', buttonTextColor: '#ffffff' },
      { label: 'STEP-4', title: '구역연결', subtitle: '구역장 배정', description: '양육 후에 구역으로 배정받습니다.', buttonUseTheme: false, buttonTextDark: false, buttonBgColor: '#111827', buttonTextColor: '#ffffff' }
    ],
    columns: 4
  },
  youth: {
    title: '교회학교',
    subtitle: '은혜로 천국을 사는 교회학교',
    showDivider: true,
    departments: [
      { name: '영유아부', description: '하나님 나라를 꿈꾸는 영유아부', image: '', buttonText: '영유아부 SNS', buttonLink: '#', buttonUseTheme: false, buttonTextDark: false, buttonBgColor: '#1e3a8a', buttonTextColor: '#ffffff' },
      { name: '유초등부', description: '하나님 나라를 배우며 성장하는 유초등부', image: '', buttonText: '유초등부 SNS', buttonLink: '#', buttonUseTheme: false, buttonTextDark: false, buttonBgColor: '#1e3a8a', buttonTextColor: '#ffffff' },
      { name: '중고등부', description: '말씀으로 세상을 바라보는 중고등부', image: '', buttonText: '중고등부 SNS', buttonLink: '#', buttonUseTheme: false, buttonTextDark: false, buttonBgColor: '#1e3a8a', buttonTextColor: '#ffffff' },
      { name: '청년부', description: '참된 예배자로 세상을 변혁시켜가는 청년부', image: '', buttonText: '청년부 SNS', buttonLink: '#', buttonUseTheme: false, buttonTextDark: false, buttonBgColor: '#1e3a8a', buttonTextColor: '#ffffff' }
    ],
    columns: 2
  },
  gallery: {
    title: '갤러리',
    subtitle: '교회의 다양한 모습을 확인하세요',
    showDivider: true,
    items: [],
    columns: 3,
    style: 'grid'
  },
  map: {
    address: '서울특별시 관악구 신림로 340',
    height: 450
  },
  footer: {
    address: '서울시 관악구 국회단지길 14',
    socialUseTheme: false,
    socialBgColor: '#111827',
    socialIconColor: '#ffffff',
    social: [
      { platform: 'youtube', url: '#' },
      { platform: 'instagram', url: '#' },
      { platform: 'facebook', url: '#' }
    ]
  },
  settings: {
    primaryColor: '#3b82f6',
    fontFamily: 'Pretendard',
    logoText: 'Brand',
    churchName: '은전체일교회'
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

    // 예배안내 콘텐츠 업데이트
    updateWorshipInfo(content: WorshipInfoContent) {
      this.content.worshipInfo = content
      this.isDirty = true
    },

    // 게시판 콘텐츠 업데이트
    updateBoard(content: BoardContent) {
      this.content.board = content
      this.isDirty = true
    },

    // 새가족안내 콘텐츠 업데이트
    updateNewFamilyInfo(content: NewFamilyInfoContent) {
      this.content.newfamilyInfo = content
      this.isDirty = true
    },

    // 교회학교 콘텐츠 업데이트
    updateYouth(content: YouthContent) {
      this.content.youth = content
      this.isDirty = true
    },

    // 갤러리 콘텐츠 업데이트
    updateGallery(content: GalleryContent) {
      this.content.gallery = content
      this.isDirty = true
    },

    // 지도 콘텐츠 업데이트
    updateMap(content: MapContent) {
      this.content.map = content
      this.isDirty = true
    },

    // 푸터 콘텐츠 업데이트
    updateFooter(content: FooterContent) {
      this.content.footer = content
      this.isDirty = true
    },

    // 섹션 콘텐츠 업데이트
    updateSectionContent<K extends keyof SiteContent>(
      sectionKey: K,
      content: Partial<SiteContent[K]>
    ) {
      if (this.content[sectionKey]) {
        this.content[sectionKey] = {
          ...(this.content[sectionKey] as object),
          ...(content as object)
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
              worshipInfo: { ...defaults.worshipInfo, ...parsed.worshipInfo },
              board: { ...defaults.board, ...parsed.board },
              newfamilyInfo: { ...defaults.newfamilyInfo, ...parsed.newfamilyInfo },
              youth: { ...defaults.youth, ...parsed.youth },
              gallery: { ...defaults.gallery, ...parsed.gallery },
              map: { ...defaults.map, ...parsed.map },
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
