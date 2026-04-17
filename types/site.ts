// 템플릿 타입
export type TemplateType = 'business' | 'portfolio' | 'product' | 'event'

// 섹션 타입
export type SectionType =
  | 'header'
  | 'hero'
  | 'churchIntro'
  | 'worshipInfo'
  | 'gallery'
  | 'testimonial'
  | 'pricing'
  | 'team'
  | 'faq'
  | 'cta'
  | 'contact'
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
  items: GalleryItem[]
  columns: 2 | 3 | 4
  style: 'grid' | 'masonry' | 'slider'
}

// 고객 후기
export interface TestimonialItem {
  content: string
  author: string
  role?: string
  company?: string
  avatar?: string
  rating?: number
}

export interface TestimonialContent {
  title: string
  subtitle?: string
  items: TestimonialItem[]
  style: 'cards' | 'slider' | 'minimal'
}

// 가격표
export interface PricingPlan {
  name: string
  price: string
  period: string
  description?: string
  features: string[]
  ctaText: string
  ctaLink: string
  highlighted: boolean
  yearlyPrice?: string
}

export interface PricingContent {
  title: string
  subtitle?: string
  plans: PricingPlan[]
  billingToggle: boolean
}

// 팀 소개
export interface TeamMember {
  name: string
  role: string
  image?: string
  bio?: string
  social?: {
    linkedin?: string
    twitter?: string
    email?: string
  }
}

export interface TeamContent {
  title: string
  subtitle?: string
  members: TeamMember[]
  columns: 2 | 3 | 4
}

// FAQ
export interface FAQItem {
  question: string
  answer: string
}

export interface FAQContent {
  title: string
  subtitle?: string
  items: FAQItem[]
  style: 'accordion' | 'grid'
}

// CTA
export interface CTAContent {
  title: string
  subtitle?: string
  ctaText: string
  ctaLink: string
  secondaryCtaText?: string
  secondaryCtaLink?: string
  backgroundImage?: string
  backgroundColor?: string
}

// 연락처
export interface ContactContent {
  title: string
  subtitle?: string
  email: string
  phone?: string
  address?: string
  mapEnabled: boolean
  mapAddress?: string
  formEnabled: boolean
  social?: SocialLink[]
}

// 푸터
export interface FooterContent {
  copyright: string
  links?: { label: string; href: string }[]
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
  gallery: GalleryContent
  testimonial: TestimonialContent
  pricing: PricingContent
  team: TeamContent
  faq: FAQContent
  cta: CTAContent
  contact: ContactContent
  footer: FooterContent
  settings: GlobalSettings
}

// 네비게이션 아이템 (앵커 링크)
export interface NavItem {
  label: string
  href: string
}
