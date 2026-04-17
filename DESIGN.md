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
│   2. 메인 컬러 설정                                           │
│   3. 섹션 On/Off & 순서 변경 (드래그앤드롭)                   │
│   4. 텍스트/이미지 수정                                       │
│   5. 저장 & 완료!                                            │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

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
│   │  - 메인 컬러   │                    │    동적 렌더링  │        │
│   │  - 섹션 편집    │                    │  - SSR/SSG    │        │
│   │  - 순서 변경    │                    │               │        │
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
| 스타일링 | 순수 CSS (CSS Custom Properties) | - |
| 아이콘 | nuxt-icon (Iconify) | 0.6.x |
| 드래그앤드롭 | vue-draggable-plus | 0.5.x |
| 애니메이션 | GSAP | 3.x |
| 슬라이더 | Swiper | 12.x |
| 데이터베이스 | MongoDB (Phase 3+) | 7.x |

---

## 4. 디렉토리 구조

```
onepage_builder/
├── nuxt.config.ts
├── package.json
├── tsconfig.json
├── DESIGN.md                     # 이 설계 문서
├── PROGRESS.md                   # 개발 진행 상황
├── README.md                     # 실행 방법
│
├── assets/
│   └── css/
│       └── main.css              # 글로벌 스타일 (CSS 변수, 공통 컴포넌트)
│
├── components/
│   ├── sections/                 # 원페이지 섹션 컴포넌트
│   │   ├── HeaderSection.vue
│   │   ├── HeroSection.vue
│   │   ├── ChurchIntroSection.vue
│   │   ├── AboutSection.vue
│   │   ├── ContactSection.vue
│   │   └── FooterSection.vue
│   │
│   └── editors/                  # 섹션별 편집기
│       ├── HeaderEditor.vue
│       ├── HeroEditor.vue
│       └── ChurchIntroEditor.vue
│
├── composables/
│   └── useThemeColor.ts          # 테마 컬러 팔레트 생성 및 CSS 변수 적용
│
├── layouts/
│   ├── default.vue
│   └── admin.vue
│
├── pages/
│   ├── index.vue                 # 에디터 페이지 (메인)
│   └── preview.vue               # 미리보기 페이지
│
├── stores/
│   └── site.ts                   # Pinia 상태관리
│
├── types/
│   └── site.ts                   # TypeScript 타입 정의
│
└── public/
    └── uploads/                  # 업로드된 이미지
```

---

## 5. 스타일링 시스템

Tailwind CSS를 제거하고 **순수 CSS + CSS Custom Properties** 기반 디자인 시스템을 사용합니다.

### 5.1 CSS 변수 구조 (`assets/css/main.css`)

```css
:root {
  /* 프라이머리 컬러 (테마 컬러에 의해 동적으로 변경됨) */
  --primary-50 ~ --primary-900

  /* 그레이 스케일 */
  --gray-50 ~ --gray-900

  /* 반경, 그림자, 트랜지션 */
  --radius-sm, --radius-md, --radius-lg, --radius-xl, --radius-full
  --shadow-sm, --shadow-md, --shadow-lg, --shadow-xl
  --transition-fast (200ms), --transition-normal (300ms)

  /* 레이아웃 */
  --sidebar-width (16rem), --editor-width (24rem), --container-max (80rem)
}
```

### 5.2 테마 컬러 시스템 (`composables/useThemeColor.ts`)

사용자가 메인 컬러를 선택하면 HSL 색상 공간에서 팔레트(50~900)를 자동 생성합니다.

- 선택한 색 = `--primary-500` 기준
- 50~400: 상대적으로 밝게 (lightness 증가)
- 600~900: 상대적으로 어둡게 (lightness 감소)
- 채도가 낮은 색도 최소 채도 보장 (`Math.max(s, 15)`)
- CSS 변수를 `document.documentElement`에 실시간 적용

### 5.3 공통 컴포넌트 스타일

`main.css`에 정의된 재사용 가능한 클래스:

| 클래스 | 용도 |
|--------|------|
| `.container-custom` | 반응형 컨테이너 (max-width + 패딩) |
| `.section` / `.section-title` / `.section-subtitle` | 섹션 기본 레이아웃 |
| `.btn-primary` / `.btn-secondary` | 버튼 스타일 |
| `.editor-section` / `.editor-label` / `.editor-input` | 에디터 폼 공통 |
| `.toggle` / `.toggle-slider` | 토글 스위치 |
| `.option-btn` | 선택 옵션 버튼 (프리셋) |
| `.color-picker` | 컬러 피커 입력 |
| `.stack-2` ~ `.stack-6` | 수직 간격 유틸리티 |
| `.section-item` | 드래그 가능한 섹션 아이템 |

---

## 6. 데이터 모델

### 6.1 SiteContent (사이트 콘텐츠)

```typescript
type SectionType =
  | 'header' | 'hero' | 'churchIntro' | 'about'
  | 'gallery' | 'testimonial' | 'pricing' | 'team'
  | 'faq' | 'cta' | 'contact' | 'footer'

interface SectionConfig {
  type: SectionType
  enabled: boolean
  order: number
  id: string  // 앵커 링크용
}

interface GlobalSettings {
  primaryColor: string  // 메인 컬러 (hex)
  fontFamily: string
  logoText: string
}
```

### 6.2 주요 섹션 콘텐츠 타입

```typescript
interface HeaderContent {
  logoText: string
  logoImage?: string
  sticky: boolean
  showLogin: boolean
  loginText: string
  loginLink: string
}

interface HeroContent {
  title: string
  subtitle: string
  description?: string
  buttonText: string
  buttonLink: string
  buttonUseTheme: boolean      // true=테마 컬러, false=직접 선택
  buttonTextDark: boolean      // 테마 모드 버튼 글자색 (true=검정, false=흰색)
  buttonBgColor: string        // 직접 선택 모드용
  buttonTextColor: string      // 직접 선택 모드용
  buttonBorderRadius: number
  backgroundImage?: string
  textAlign: 'left' | 'center' | 'right'
  height: number
  dimEnabled: boolean           // 배경 딤 처리
  dimOpacity: number            // 딤 불투명도 (0~100)
  textDark: boolean             // 텍스트 색상 (true=검정, false=흰색)
}

interface ChurchIntroContent {
  title: string
  subtitle?: string
  items: { icon: string; title: string; description: string }[]
  columns: 2 | 3 | 4
  style: 'cards' | 'icons' | 'minimal'
}
```

---

## 7. 에디터 UI 구조

### 7.1 3단 레이아웃

```
┌─────────────────────────────────────────────────────────────────┐
│ ← 템플릿 선택                           [미리보기] [저장]         │
├──────────────────┬─────────────────────────┬────────────────────┤
│  좌측 패널 (256px) │    실시간 미리보기       │  편집 패널 (384px)  │
│                   │                         │                    │
│  [메인 컬러]       │  ┌─────────────────┐    │  [Hero 섹션 편집]   │
│  🎨 #03183a       │  │                 │    │                    │
│  ████████████     │  │                 │    │  배경 이미지:        │
│  ──────────────   │  │   원페이지       │    │  [업로드/URL]       │
│  섹션 구성     ←   │  │   미리보기       │    │                    │
│  ☑ ≡ 헤더         │  │                 │    │  딤 처리: [ON]       │
│  ☑ ≡ 히어로    ←  │  │                 │    │  불투명도: 30%       │
│  ☑ ≡ 교회소개     │  │                 │    │                    │
│  ☑ ≡ 소개         │  │                 │    │  텍스트 색: [흰/검]   │
│  ☐ ≡ 갤러리       │  │                 │    │  제목/부제목/설명     │
│  ☑ ≡ 고객후기     │  └─────────────────┘    │                    │
│  ☑ ≡ 가격표       │                         │  버튼 색:            │
│  ☐ ≡ 팀소개       │                         │  [테마컬러/직접선택]  │
│  ☑ ≡ FAQ         │                         │  글자색: [흰/검]      │
│  ☑ ≡ 연락처       │                         │                    │
│  ☑ ≡ 푸터         │                         │                    │
├──────────────────┴─────────────────────────┴────────────────────┤
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 7.2 메인 컬러 설정

좌측 사이드바 최상단에 위치. 컬러피커로 색상 선택 시:
1. HSL 기반 팔레트 자동 생성 (50~900, 10단계)
2. CSS 변수 (`--primary-50` ~ `--primary-900`) 실시간 업데이트
3. 팔레트 미리보기 바 표시
4. 모든 컴포넌트에 즉시 반영

### 7.3 히어로 편집기 기능

| 기능 | 설명 |
|------|------|
| 배경 이미지 | 파일 첨부 (Base64) 또는 URL 직접 입력 |
| 딤 처리 | ON/OFF 토글 + 불투명도 0~100% 슬라이더 |
| 텍스트 색상 | 흰색/검정 2택 (배경에 따라 선택) |
| 버튼 배경색 | 테마 컬러 자동 적용 또는 직접 컬러피커 선택 |
| 버튼 글자색 | 테마 모드: 흰/검 선택, 직접 모드: 컬러피커 |
| 버튼 모서리 | 슬라이더 + 프리셋 (각진/기본/둥근/원형) |
| 텍스트 정렬 | 왼쪽/가운데/오른쪽 |
| 섹션 높이 | 숫자 입력 + 프리셋 (작게/보통/크게) |

---

## 8. 개발 단계

### Phase 1: 기본 구조 (완료)

- [x] Nuxt 3 프로젝트 초기화
- [x] TypeScript 설정
- [x] Pinia 상태관리 설정
- [x] 기본 레이아웃 구성
- [x] 기본 섹션 컴포넌트 (Header, Hero, ChurchIntro, About, Contact, Footer)
- [x] 에디터 3단 레이아웃
- [x] 섹션 On/Off 토글
- [x] 섹션 순서 변경 (vue-draggable-plus)
- [x] 실시간 미리보기
- [x] localStorage 저장/불러오기
- [x] 앵커 네비게이션
- [x] Tailwind CSS → 순수 CSS 전환
- [x] CSS Custom Properties 디자인 시스템
- [x] 메인 컬러 설정 (동적 팔레트 생성)
- [x] 히어로 편집기 (배경 업로드, 딤, 텍스트색, 버튼 테마/커스텀)
- [x] 헤더 편집기
- [x] 교회소개 편집기

### Phase 2: 추가 섹션 및 편집기

- [ ] AboutSection 편집기
- [ ] ContactSection 편집기
- [ ] FooterSection 편집기
- [ ] GallerySection 구현 + 편집기
- [ ] TestimonialSection 구현 + 편집기
- [ ] PricingSection 구현 + 편집기
- [ ] TeamSection 구현 + 편집기
- [ ] FAQSection 구현 + 편집기
- [ ] CTASection 구현 + 편집기

### Phase 3: 고급 기능

- [ ] 폰트 변경
- [ ] GSAP 스크롤 애니메이션
- [ ] 반응형 미리보기 (모바일/태블릿)
- [ ] 저장/미리보기 버튼 연결

### Phase 4: 백엔드 연동

- [ ] MongoDB 연결
- [ ] API 구현
- [ ] 이미지 업로드 서버 저장
- [ ] 사용자 인증
- [ ] 사이트 발행/배포

---

## 9. UI/UX 디자인 가이드

### 컬러 시스템

```
Primary (메인 컬러) - 사용자가 컬러피커로 설정
├── 50~400: 밝은 변형 (배경, 호버)
├── 500: 선택한 색 그대로
├── 600~900: 어두운 변형 (호버, 텍스트)

Neutral (고정)
├── Gray 50~900: UI 요소용
├── White: #FFFFFF
├── Red 500/700: 삭제/에러
```

### 타이포그래피

```
Font Family: 'Pretendard', -apple-system, sans-serif

Headings
├── H1: 2.25~3.75rem / Bold (히어로)
├── H2: 1.875~2.25rem / Bold (섹션 타이틀)
├── H3: 1.5rem / SemiBold

Body
├── Large: 1.125rem
├── Base: 1rem
├── Small: 0.875rem
├── XS: 0.75rem (힌트 텍스트)
```
