// 템플릿 타입
export type TemplateType = 'business' | 'portfolio' | 'product' | 'event'

// 섹션 타입
export type SectionType =
  | 'header'
  | 'hero'
  | 'churchIntro'
  | 'worshipInfo'
  | 'board'
  | 'newfamilyInfo'
  | 'youth'
  | 'gallery'
  | 'map'
  | 'footer'

// 섹션 설정
export interface SectionConfig {
  type: SectionType
  enabled: boolean
  order: number
  id: string  // 앵커 링크용
  useBgColor: boolean
  bgColor: string
}

// 전역 설정
export interface GlobalSettings {
  primaryColor: string
  fontFamily: string
  logoImage?: string
  logoText: string
  churchName: string
  faviconImage?: string
}

// 소셜 링크
export interface SocialLink {
  platform: 'facebook' | 'instagram' | 'twitter' | 'youtube' | 'linkedin'
  url: string
}

// 헤더
export interface HeaderContent {
  logoText: string
  logoImage?: string
  sticky: boolean
  showLogin: boolean
  loginText: string
  loginLink: string
}

// 히어로
export interface HeroContent {
  title: string
  subtitle: string
  description?: string
  buttonText: string
  buttonLink: string
  buttonUseTheme: boolean
  buttonTextDark: boolean
  buttonBgColor: string
  buttonTextColor: string
  buttonBorderRadius: number // px 단위
  backgroundImage?: string
  textAlign: 'left' | 'center' | 'right'
  height: number // px 단위
  dimEnabled: boolean
  dimOpacity: number // 0~100
  textDark: boolean // true=검정, false=흰색
}

// 교회소개
export interface ChurchIntroItem {
  icon: string
  title: string
  description: string
}

export interface ChurchIntroContent {
  title: string
  subtitle?: string
  showDivider: boolean
  items: ChurchIntroItem[]
  columns: 2 | 3 | 4
  style: 'cards' | 'icons' | 'minimal'
  iconUseTheme: boolean
  iconBgColor: string
  iconColor: string
  cardBgColor: string
  cardShadow: 'none' | 'sm' | 'md' | 'lg' | 'custom'
  cardShadowDir: 'center' | 'left' | 'bottom' | 'right'
  cardShadowX: number
  cardShadowY: number
  cardShadowBlur: number
  cardShadowSpread: number
  cardShadowColor: string
}

// 예배안내
export interface WorshipInfoItem {
  icon: string
  title: string
  description: string
}

export interface WorshipInfoContent {
  title: string
  subtitle?: string
  items: WorshipInfoItem[]
  columns: 2 | 3 | 4
  iconUseTheme: boolean
  iconBgColor: string
  iconColor: string
  bgColor: string
  showDivider: boolean
}

// 게시판
export interface BoardItem {
  title: string
  date: string
  author?: string
  link?: string
}

export interface BoardContent {
  title: string
  subtitle?: string
  showDivider: boolean
  items: BoardItem[]
  backgroundImage?: string
  dimEnabled: boolean
  dimOpacity: number
  textDark: boolean
  iconUseTheme: boolean
  iconBgColor: string
  iconColor: string
  moreText?: string
  moreLink?: string
}

// 새가족안내
export interface NewFamilyStep {
  label: string       // "STEP-1"
  title: string       // "교인등록"
  subtitle: string    // "새가족 등록카드 작성"
  description: string // 하단 설명
  buttonText?: string
  buttonLink?: string
  buttonUseTheme: boolean
  buttonTextDark: boolean
  buttonBgColor: string
  buttonTextColor: string
}

export interface NewFamilyInfoContent {
  title: string
  subtitle?: string
  showDivider: boolean
  steps: NewFamilyStep[]
  columns: 2 | 3 | 4
}

// 교회학교
export interface YouthDept {
  name: string
  description: string
  image?: string
  buttonText?: string
  buttonLink?: string
  buttonUseTheme: boolean
  buttonTextDark: boolean
  buttonBgColor: string
  buttonTextColor: string
}

export interface YouthContent {
  title: string
  subtitle?: string
  showDivider: boolean
  departments: YouthDept[]
  columns: 1 | 2 | 3
}

// 갤러리
export interface GalleryItem {
  image: string
  title?: string
  category?: string
  link?: string
}

export interface GalleryContent {
  title: string
  subtitle?: string
  showDivider: boolean
  items: GalleryItem[]
  columns: 2 | 3 | 4
  style: 'grid' | 'masonry' | 'slider'
}

// 지도
export interface MapContent {
  address: string
  height: number
}

// 푸터
export interface FooterContent {
  address: string
  socialUseTheme: boolean
  socialBgColor: string
  socialIconColor: string
  social?: SocialLink[]
}

// 사이트 콘텐츠 전체
export interface SiteContent {
  templateId: TemplateType
  sections: SectionConfig[]
  header: HeaderContent
  hero: HeroContent
  churchIntro: ChurchIntroContent
  worshipInfo: WorshipInfoContent
  board: BoardContent
  newfamilyInfo: NewFamilyInfoContent
  youth: YouthContent
  gallery: GalleryContent
  map: MapContent
  footer: FooterContent
  settings: GlobalSettings
}

// 네비게이션 아이템 (앵커 링크)
export interface NavItem {
  label: string
  href: string
}
