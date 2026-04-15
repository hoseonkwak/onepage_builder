# 원페이지 템플릿 빌더 설계 문서

## 1. 프로젝트 개요

**원페이지(One-Page) 전용** 템플릿 빌더.
사용자는 미리 정의된 원페이지 템플릿에서 **섹션 순서를 변경하고, 텍스트와 이미지를 교체**하여 랜딩페이지를 완성합니다.

### 핵심 컨셉

```
┌─────────────────────────────────────────────────────────────┐
│                                                              │
│   "원페이지 전문 빌더"                                        │
│                                                              │
│   1. 템플릿 선택                                              │
│   2. 섹션 On/Off & 순서 변경 (드래그앤드롭)                   │
│   3. 텍스트/이미지 수정                                       │
│   4. 저장 & 완료!                                            │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### homepage_builder와의 차이점

| 항목 | homepage_builder | onepage_builder |
|------|------------------|-----------------|
| 페이지 구조 | 다중 페이지 (메인 + 서브페이지) | 단일 페이지 (원페이지) |
| 메뉴 시스템 | 계층형 메뉴 (드롭다운 지원) | 앵커 네비게이션 (같은 페이지 내 스크롤) |
| 섹션 순서 | 고정 | 드래그앤드롭으로 변경 가능 |
| 용도 | 기업/단체 홈페이지 | 랜딩페이지, 프로모션, 포트폴리오 |
| 복잡도 | 높음 | 낮음 (심플) |

---

## 2. 시스템 아키텍처

```
┌─────────────────────────────────────────────────────────────────┐
│                         Nuxt 3 Application                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   ┌───────────────┐                    ┌───────────────┐        │
│   │  에디터 페이지  │                    │  미리보기 페이지 │        │
│   │  / (메인)      │                    │  /preview     │        │
│   │               │                    │               │        │
│   │  - 템플릿 선택  │                    │  - 원페이지    │        │
│   │  - 섹션 편집    │                    │    동적 렌더링  │        │
│   │  - 순서 변경    │                    │  - SSR/SSG    │        │
│   │  - 미리보기    │                    │               │        │
│   └───────────────┘                    └───────────────┘        │
│                                                                  │
│                      ┌─────────────────┐                        │
│                      │   localStorage   │                        │
│                      │  (Phase 1~2)    │                        │
│                      └─────────────────┘                        │
│                              │                                   │
│                              ▼                                   │
│                      ┌─────────────────┐                        │
│                      │    MongoDB      │                        │
│                      │   (Phase 3+)    │                        │
│                      └─────────────────┘                        │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. 기술 스택

| 영역 | 기술 | 버전 |
|------|------|------|
| 프레임워크 | Nuxt 3 | 3.x |
| 언어 | TypeScript | 5.x |
| 상태관리 | Pinia | 2.x |
| 스타일링 | Tailwind CSS | 3.x |
| 아이콘 | Iconify | - |
| 드래그앤드롭 | vue-draggable-plus | 0.5.x |
| 애니메이션 | GSAP | 3.x |
| 슬라이더 | Swiper | 11.x |
| 데이터베이스 | MongoDB (Phase 3+) | 7.x |

---

## 4. 디렉토리 구조

```
onepage_builder/
├── nuxt.config.ts
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── DESIGN.md                     # 이 설계 문서
│
├── assets/
│   └── css/
│       └── main.css              # 전역 스타일
│
├── components/
│   ├── editor/                   # 에디터 전용 컴포넌트
│   │   ├── TemplateSelector.vue  # 템플릿 선택 UI
│   │   ├── SectionList.vue       # 섹션 목록 (드래그앤드롭)
│   │   ├── SectionEditor.vue     # 섹션별 편집 폼
│   │   └── PreviewPanel.vue      # 미리보기 패널
│   │
│   ├── sections/                 # 원페이지 섹션 컴포넌트
│   │   ├── HeaderSection.vue     # 헤더 (앵커 네비게이션)
│   │   ├── HeroSection.vue       # 히어로 섹션
│   │   ├── FeaturesSection.vue   # 기능/서비스 소개
│   │   ├── AboutSection.vue      # 회사/팀 소개
│   │   ├── GallerySection.vue    # 갤러리/포트폴리오
│   │   ├── TestimonialSection.vue# 고객 후기
│   │   ├── PricingSection.vue    # 가격표
│   │   ├── TeamSection.vue       # 팀 소개
│   │   ├── FAQSection.vue        # FAQ
│   │   ├── CTASection.vue        # CTA (행동 유도)
│   │   ├── ContactSection.vue    # 연락처/문의
│   │   └── FooterSection.vue     # 푸터
│   │
│   ├── templates/                # 템플릿 프리셋
│   │   ├── BusinessTemplate.vue  # 비즈니스 랜딩
│   │   ├── PortfolioTemplate.vue # 포트폴리오
│   │   ├── ProductTemplate.vue   # 제품 런칭
│   │   └── EventTemplate.vue     # 이벤트/프로모션
│   │
│   └── common/                   # 공통 컴포넌트
│       ├── SectionRenderer.vue   # 섹션 동적 렌더링
│       └── ScrollIndicator.vue   # 스크롤 인디케이터
│
├── composables/
│   ├── useSections.ts            # 섹션 관리 로직
│   └── useScrollspy.ts           # 스크롤 스파이 (앵커 네비게이션)
│
├── layouts/
│   ├── default.vue               # 기본 레이아웃
│   └── admin.vue                 # 에디터 레이아웃
│
├── pages/
│   ├── index.vue                 # 에디터 페이지 (메인)
│   └── preview.vue               # 미리보기 페이지
│
├── stores/
│   └── site.ts                   # 사이트 콘텐츠 상태
│
├── types/
│   └── site.ts                   # 타입 정의
│
└── public/
    └── uploads/                  # 업로드된 이미지
```

---

## 5. 데이터 모델

### 5.1 SiteContent (사이트 콘텐츠)

```typescript
// 템플릿 타입
type TemplateType = 'business' | 'portfolio' | 'product' | 'event'

// 섹션 타입
type SectionType =
  | 'header'
  | 'hero'
  | 'features'
  | 'about'
  | 'gallery'
  | 'testimonial'
  | 'pricing'
  | 'team'
  | 'faq'
  | 'cta'
  | 'contact'
  | 'footer'

// 사이트 콘텐츠
interface SiteContent {
  templateId: TemplateType;

  // 활성화된 섹션 (순서대로)
  sections: SectionConfig[];

  // 각 섹션 콘텐츠
  header: HeaderContent;
  hero: HeroContent;
  features: FeaturesContent;
  about: AboutContent;
  gallery: GalleryContent;
  testimonial: TestimonialContent;
  pricing: PricingContent;
  team: TeamContent;
  faq: FAQContent;
  cta: CTAContent;
  contact: ContactContent;
  footer: FooterContent;

  // 전역 설정
  settings: GlobalSettings;
}

// 섹션 설정
interface SectionConfig {
  type: SectionType;
  enabled: boolean;
  order: number;
  id: string;  // 앵커 링크용 (예: 'about', 'features')
}

// 전역 설정
interface GlobalSettings {
  primaryColor: string;
  fontFamily: string;
  logoImage?: string;
  logoText: string;
  faviconImage?: string;
}
```

### 5.2 섹션별 콘텐츠 타입

```typescript
// 헤더 (앵커 네비게이션)
interface HeaderContent {
  logoText: string;
  logoImage?: string;
  ctaText?: string;
  ctaLink?: string;
  transparent: boolean;  // 투명 헤더 여부
  sticky: boolean;       // 스크롤 시 고정 여부
}

// 히어로 섹션
interface HeroContent {
  title: string;
  subtitle: string;
  description?: string;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  backgroundImage?: string;
  backgroundVideo?: string;
  overlayOpacity: number;  // 0-100
  textAlign: 'left' | 'center' | 'right';
  height: 'full' | 'large' | 'medium';  // 100vh, 80vh, 60vh
}

// 기능/서비스 섹션
interface FeaturesContent {
  title: string;
  subtitle?: string;
  items: FeatureItem[];
  columns: 2 | 3 | 4;
  style: 'cards' | 'icons' | 'minimal';
}

interface FeatureItem {
  icon: string;
  title: string;
  description: string;
}

// 회사/팀 소개
interface AboutContent {
  title: string;
  subtitle?: string;
  description: string;
  image?: string;
  stats?: StatItem[];
  layout: 'image-left' | 'image-right' | 'image-top';
}

interface StatItem {
  value: string;
  label: string;
}

// 갤러리/포트폴리오
interface GalleryContent {
  title: string;
  subtitle?: string;
  items: GalleryItem[];
  columns: 2 | 3 | 4;
  style: 'grid' | 'masonry' | 'slider';
}

interface GalleryItem {
  image: string;
  title?: string;
  category?: string;
  link?: string;
}

// 고객 후기
interface TestimonialContent {
  title: string;
  subtitle?: string;
  items: TestimonialItem[];
  style: 'cards' | 'slider' | 'minimal';
}

interface TestimonialItem {
  content: string;
  author: string;
  role?: string;
  company?: string;
  avatar?: string;
  rating?: number;  // 1-5
}

// 가격표
interface PricingContent {
  title: string;
  subtitle?: string;
  plans: PricingPlan[];
  billingToggle: boolean;  // 월간/연간 토글 표시
}

interface PricingPlan {
  name: string;
  price: string;
  period: string;  // '월', '년'
  description?: string;
  features: string[];
  ctaText: string;
  ctaLink: string;
  highlighted: boolean;  // 추천 플랜
  yearlyPrice?: string;  // 연간 결제 가격
}

// 팀 소개
interface TeamContent {
  title: string;
  subtitle?: string;
  members: TeamMember[];
  columns: 2 | 3 | 4;
}

interface TeamMember {
  name: string;
  role: string;
  image?: string;
  bio?: string;
  social?: {
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
}

// FAQ
interface FAQContent {
  title: string;
  subtitle?: string;
  items: FAQItem[];
  style: 'accordion' | 'grid';
}

interface FAQItem {
  question: string;
  answer: string;
}

// CTA (행동 유도)
interface CTAContent {
  title: string;
  subtitle?: string;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  backgroundImage?: string;
  backgroundColor?: string;
}

// 연락처
interface ContactContent {
  title: string;
  subtitle?: string;
  email: string;
  phone?: string;
  address?: string;
  mapEnabled: boolean;
  mapAddress?: string;
  formEnabled: boolean;
  social?: SocialLink[];
}

interface SocialLink {
  platform: 'facebook' | 'instagram' | 'twitter' | 'youtube' | 'linkedin';
  url: string;
}

// 푸터
interface FooterContent {
  copyright: string;
  links?: { label: string; href: string; }[];
  social?: SocialLink[];
}
```

---

## 6. 템플릿 종류

### 6.1 Business (비즈니스 랜딩)

SaaS, 서비스 소개용 원페이지

```
┌─────────────────────────────────────────────────────────────┐
│ [Logo]  Features  About  Pricing  Contact        [시작하기] │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│                    "메인 타이틀"                             │
│                   서브 타이틀 설명                           │
│                [무료 체험]  [더 알아보기]                    │  ← Hero
│                                                             │
├─────────────────────────────────────────────────────────────┤
│       기능1           기능2           기능3                  │  ← Features
├─────────────────────────────────────────────────────────────┤
│   회사 소개                         [이미지]                 │  ← About
│   100+ 고객  |  50+ 프로젝트  |  99% 만족도                 │
├─────────────────────────────────────────────────────────────┤
│   Basic         Pro            Enterprise                   │  ← Pricing
│   $9/mo        $29/mo          $99/mo                       │
├─────────────────────────────────────────────────────────────┤
│   " 고객 후기 내용... "   " 고객 후기 내용... "              │  ← Testimonial
├─────────────────────────────────────────────────────────────┤
│       Q: 질문 1?              Q: 질문 2?                    │  ← FAQ
│       A: 답변 1               A: 답변 2                      │
├─────────────────────────────────────────────────────────────┤
│                   지금 바로 시작하세요!                       │  ← CTA
│                      [무료로 시작하기]                        │
├─────────────────────────────────────────────────────────────┤
│   연락처 정보              [문의 폼]                         │  ← Contact
├─────────────────────────────────────────────────────────────┤
│   © 2024 Company         [소셜 링크]                        │  ← Footer
└─────────────────────────────────────────────────────────────┘
```

**기본 섹션 구성:**
1. Header (필수)
2. Hero (필수)
3. Features
4. About
5. Pricing
6. Testimonial
7. FAQ
8. CTA
9. Contact
10. Footer (필수)

### 6.2 Portfolio (포트폴리오)

개인/에이전시 포트폴리오

```
섹션: Header → Hero → About → Gallery → Testimonial → Contact → Footer
```

### 6.3 Product (제품 런칭)

신제품 출시 랜딩페이지

```
섹션: Header → Hero → Features → Gallery → Pricing → FAQ → CTA → Footer
```

### 6.4 Event (이벤트/프로모션)

이벤트, 세일 프로모션

```
섹션: Header → Hero → Features → CTA → FAQ → Contact → Footer
```

---

## 7. 에디터 UI 구조

### 7.1 단계별 흐름 (2단계 시스템)

```
┌─────────────────────────────────────────────────────────────────┐
│  1단계: 템플릿 선택                                              │
│  └── 4개 템플릿 카드 중 선택                                     │
├─────────────────────────────────────────────────────────────────┤
│  2단계: 섹션 편집                                                │
│  ├── 좌측: 섹션 목록 (드래그앤드롭으로 순서 변경)                 │
│  ├── 중앙: 실시간 미리보기                                       │
│  └── 우측: 선택된 섹션 편집 패널                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 7.2 템플릿 선택 화면

```
┌─────────────────────────────────────────────────────────────────┐
│  원페이지 템플릿 선택                                            │
│  용도에 맞는 템플릿을 선택하세요.                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│   │  [미리보기]   │  │  [미리보기]   │  │  [미리보기]   │         │
│   │              │  │              │  │              │         │
│   │   Business   │  │  Portfolio   │  │   Product    │         │
│   │  비즈니스/SaaS │  │  포트폴리오   │  │  제품 런칭    │         │
│   └──────────────┘  └──────────────┘  └──────────────┘         │
│                                                                  │
│   ┌──────────────┐                                              │
│   │  [미리보기]   │                                              │
│   │              │                                              │
│   │    Event     │                                              │
│   │ 이벤트/프로모션 │                                              │
│   └──────────────┘                                              │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 7.3 섹션 편집 화면

```
┌─────────────────────────────────────────────────────────────────┐
│ ← 템플릿 선택                           [미리보기] [저장] [내보내기]│
├──────────────────┬─────────────────────────┬────────────────────┤
│  섹션 구성 (250px) │    실시간 미리보기       │   편집 패널 (350px) │
│                   │                         │                    │
│  ☑ ≡ Header       │  ┌─────────────────┐    │  [Hero 섹션]       │
│  ☑ ≡ Hero      ←  │  │                 │    │                    │
│  ☑ ≡ Features     │  │                 │    │  제목:             │
│  ☑ ≡ About        │  │   원페이지       │    │  [입력 필드]        │
│  ☐ ≡ Gallery      │  │   미리보기       │    │                    │
│  ☑ ≡ Pricing      │  │                 │    │  부제목:            │
│  ☐ ≡ Team         │  │                 │    │  [입력 필드]        │
│  ☑ ≡ Testimonial  │  │                 │    │                    │
│  ☑ ≡ FAQ          │  │                 │    │  CTA 버튼:          │
│  ☑ ≡ CTA          │  │                 │    │  [입력 필드]        │
│  ☑ ≡ Contact      │  └─────────────────┘    │                    │
│  ☑ ≡ Footer       │                         │  배경 이미지:        │
│                   │                         │  [업로드 버튼]       │
│  ───────────────  │                         │                    │
│  [+ 섹션 추가]     │                         │                    │
├──────────────────┴─────────────────────────┴────────────────────┤
│  활성 섹션: 10개                              [변경사항 저장]      │
└─────────────────────────────────────────────────────────────────┘
```

**기능 설명:**
- **≡**: 드래그 핸들 (순서 변경)
- **☑/☐**: 섹션 활성화/비활성화 토글
- **←**: 현재 선택된 섹션 (편집 중)

### 7.4 앵커 네비게이션

원페이지 특성상 헤더의 메뉴는 **같은 페이지 내 섹션으로 스크롤**됩니다.

```typescript
// 메뉴 아이템 자동 생성
const generateNavItems = (sections: SectionConfig[]) => {
  const navLabels: Record<SectionType, string> = {
    features: '기능',
    about: '소개',
    gallery: '갤러리',
    testimonial: '후기',
    pricing: '가격',
    team: '팀',
    faq: 'FAQ',
    cta: '',  // 메뉴에 표시 안함
    contact: '연락처',
    header: '',
    hero: '',
    footer: ''
  }

  return sections
    .filter(s => s.enabled && navLabels[s.type])
    .map(s => ({
      label: navLabels[s.type],
      href: `#${s.id}`
    }))
}
```

**클릭 시 동작:**
```typescript
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
```

---

## 8. 개발 단계

### Phase 1: 기본 구조

**목표**: 단일 템플릿 + 섹션 편집

- [ ] Nuxt 3 프로젝트 초기화
- [ ] TypeScript + Tailwind CSS 설정
- [ ] Pinia 상태관리 설정
- [ ] 기본 레이아웃 구성
- [ ] 기본 섹션 컴포넌트 구현 (Header, Hero, Features, About, Contact, Footer)
- [ ] 어드민 페이지 기본 UI
- [ ] 섹션 On/Off 토글
- [ ] 섹션 순서 변경 (vue-draggable-plus)
- [ ] 콘텐츠 편집 폼 UI
- [ ] 실시간 미리보기
- [ ] localStorage 저장/불러오기
- [ ] 앵커 네비게이션 (스크롤 스파이)

### Phase 2: 템플릿 확장

**목표**: 다양한 템플릿 및 섹션

- [ ] 추가 섹션 구현 (Gallery, Testimonial, Pricing, Team, FAQ, CTA)
- [ ] 템플릿 프리셋 4종 구현
- [ ] 이미지 업로드 기능
- [ ] 컬러 테마 변경
- [ ] 폰트 변경
- [ ] GSAP 스크롤 애니메이션

### Phase 3: 백엔드 연동

**목표**: 실제 데이터 저장 및 배포

- [ ] MongoDB 연결
- [ ] API 구현
- [ ] 이미지 업로드 서버 저장
- [ ] 사용자 인증
- [ ] 사이트 발행/배포 기능
- [ ] 커스텀 도메인 연결

---

## 9. UI/UX 디자인 가이드

### 디자인 컨셉
모던하고 미니멀한 랜딩페이지 빌더

### 컬러 시스템

```
Primary (강조색) - 커스터마이징 가능
├── Default: #3B82F6 (Blue)
├── Options: Purple, Green, Orange, Red, Teal

Neutral (기본색)
├── White: #FFFFFF (배경)
├── Gray 50: #F9FAFB (섹션 배경)
├── Gray 100: #F3F4F6 (카드 배경)
├── Gray 200: #E5E7EB (보더)
├── Gray 600: #4B5563 (서브 텍스트)
├── Gray 900: #111827 (메인 텍스트)
```

### 타이포그래피

```
Font Family: 'Pretendard', -apple-system, sans-serif

Headings
├── H1: 48px-72px / Bold (Hero 타이틀)
├── H2: 36px-48px / Bold (섹션 타이틀)
├── H3: 24px / SemiBold

Body
├── Large: 18px / Regular (Hero 설명)
├── Base: 16px / Regular
├── Small: 14px / Regular
```

---

## 10. 에이전트 & 스킬 시스템

### 스킬 목록

| 스킬 | 트리거 | 설명 |
|------|--------|------|
| Build | `/build` | 프로젝트 빌드 및 검증 |
| Test | `/test` | 테스트 실행 |
| AI Generate | `/ai-generate` | AI 콘텐츠 생성 |
| AI SEO | `/ai-seo` | SEO 메타 자동 생성 |

### 에이전트 목록

| 에이전트 | 용도 |
|----------|------|
| Build Agent | 빌드, 린트, 타입체크 |
| AI Agent | 콘텐츠 생성, SEO |
| Test Agent | Unit/E2E 테스트 |

---

## 11. 참고 사항

### 단순화 원칙 (homepage_builder와 동일)
- 복잡한 블록 편집 없음 (섹션 단위 편집)
- 섹션 내부 레이아웃은 고정 (콘텐츠만 변경)

### 원페이지 특화 기능
- 섹션 순서 드래그앤드롭
- 앵커 네비게이션 자동 생성
- 스크롤 애니메이션
- 반응형 자동 적용

### 향후 확장 가능
- AI 콘텐츠 생성
- A/B 테스트
- 분석 대시보드
- 폼 제출 수집
