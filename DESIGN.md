# 원페이지 템플릿 빌더 설계 문서

## 1. 프로젝트 개요

**원페이지(One-Page) 전용** 템플릿 빌더.
사용자는 미리 정의된 원페이지 템플릿에서 **섹션 순서를 변경하고, 텍스트와 이미지를 교체**하여 랜딩페이지를 완성합니다.

### 핵심 컨셉

```
1. 템플릿 선택
2. 메인 컬러 설정
3. 섹션 On/Off & 순서 변경 (드래그앤드롭)
4. 섹션별 배경색 설정
5. 텍스트/이미지/스타일 수정
6. 저장 & 완료!
```

---

## 2. 기술 스택

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

---

## 3. 디렉토리 구조

```
onepage_builder/
├── assets/css/main.css           # 글로벌 CSS (변수, 공통 스타일)
├── components/
│   ├── sections/                 # 섹션 컴포넌트
│   │   ├── HeaderSection.vue
│   │   ├── HeroSection.vue
│   │   ├── ChurchIntroSection.vue
│   │   ├── WorshipInfoSection.vue
│   │   ├── ContactSection.vue
│   │   └── FooterSection.vue
│   └── editors/                  # 섹션 편집기
│       ├── HeaderEditor.vue
│       ├── HeroEditor.vue
│       ├── ChurchIntroEditor.vue
│       ├── WorshipInfoEditor.vue
│       └── IconPicker.vue        # 아이콘 선택 공통 컴포넌트
├── composables/
│   └── useThemeColor.ts          # 테마 컬러 팔레트 생성 + CSS 변수 적용
├── layouts/
│   ├── default.vue
│   └── admin.vue
├── pages/
│   ├── index.vue                 # 에디터 (메인)
│   └── preview.vue               # 미리보기
├── stores/site.ts                # Pinia 상태관리
└── types/site.ts                 # TypeScript 타입 정의
```

---

## 4. 스타일링 시스템

### 4.1 CSS Custom Properties (`main.css`)

| 변수 그룹 | 예시 |
|-----------|------|
| 프라이머리 컬러 | `--primary-50` ~ `--primary-900` (동적) |
| 그레이 스케일 | `--gray-50` ~ `--gray-900` (고정) |
| 반경 | `--radius-sm/md/lg/xl/full` |
| 그림자 | `--shadow-sm/md/lg/xl` |
| 트랜지션 | `--transition-fast` (200ms), `--transition-normal` (300ms) |
| 레이아웃 | `--sidebar-width`, `--editor-width`, `--container-max` |

### 4.2 공통 클래스

| 클래스 | 용도 |
|--------|------|
| `.section` / `.section-title` / `.section-subtitle` | 섹션 기본 |
| `.section-header` | 섹션 헤더 (중앙 정렬 + 하단 마진) |
| `.section-divider` | 제목 아래 구분선 (3rem × 3px) |
| `.container-custom` | 반응형 컨테이너 |
| `.btn-primary` / `.btn-secondary` | 버튼 |
| `.editor-section` / `.editor-label` / `.editor-input` | 에디터 폼 |
| `.toggle` / `.toggle-slider` | 토글 스위치 |
| `.option-btn` | 프리셋 선택 버튼 |
| `.color-picker` | 컬러 피커 |
| `.stack-2` ~ `.stack-6` | 수직 간격 유틸리티 |

### 4.3 테마 컬러 (`useThemeColor`)

- 사용자가 컬러피커로 메인 색 선택
- 선택 색 = `--primary-500`, 나머지는 HSL 기반 상대 밝기로 생성
- 채도 낮은 색도 최소 15% 보장
- CSS 변수를 `document.documentElement`에 실시간 적용

---

## 5. 데이터 모델

### 5.1 섹션 설정

```typescript
type SectionType =
  | 'header' | 'hero' | 'churchIntro' | 'worshipInfo'
  | 'gallery' | 'testimonial' | 'pricing' | 'team'
  | 'faq' | 'cta' | 'contact' | 'footer'

interface SectionConfig {
  type: SectionType
  enabled: boolean
  order: number
  id: string
  useBgColor: boolean  // 배경색 사용 여부
  bgColor: string      // 배경색 (hex)
}
```

### 5.2 주요 콘텐츠 타입

```typescript
interface HeroContent {
  title, subtitle, description
  buttonUseTheme: boolean      // 버튼: 테마/직접선택
  buttonTextDark: boolean      // 버튼 글자: 흰/검
  buttonBgColor, buttonTextColor, buttonBorderRadius
  backgroundImage?: string     // 파일 업로드 또는 URL
  dimEnabled: boolean          // 딤 처리
  dimOpacity: number           // 0~100
  textDark: boolean            // 텍스트: 흰/검
  textAlign, height
}

interface ChurchIntroContent {
  title, subtitle
  showDivider: boolean
  items: { icon, title, description }[]
  columns: 2 | 3 | 4
  style: 'cards' | 'icons' | 'minimal'
  iconUseTheme: boolean
  iconBgColor, iconColor
  cardBgColor: string
  cardShadow: 'none' | 'sm' | 'md' | 'lg' | 'custom'
  cardShadowDir: 'center' | 'left' | 'bottom' | 'right'
  cardShadowX, cardShadowY, cardShadowBlur, cardShadowSpread
  cardShadowColor: string
}

interface WorshipInfoContent {
  title, subtitle
  showDivider: boolean
  items: { icon, title, description }[]
  columns: 2 | 3 | 4
  iconUseTheme: boolean
  iconBgColor, iconColor
  bgColor: string
}
```

---

## 6. 에디터 UI

### 6.1 3단 레이아웃

```
┌────────────────────────────────────────────────────────────────┐
│ ← 템플릿 선택                              [미리보기] [저장]    │
├─────────────┬──────────────────────┬───────────────────────────┤
│  좌측 (256)  │     미리보기         │     편집 패널 (384)       │
│             │                      │                           │
│  🎨 메인컬러 │  ┌──────────────┐   │  [선택된 섹션 편집]        │
│  ████████   │  │              │   │                           │
│  ──────────  │  │   원페이지   │   │  배경/딤/텍스트/버튼       │
│  섹션 구성   │  │   미리보기    │   │  레이아웃/스타일           │
│  ☑ 헤더      │  │              │   │  아이콘/그림자 등          │
│  ☑ 히어로    │  │              │   │                           │
│  ☑ 교회소개  │  └──────────────┘   │                           │
│    🟫 배경색  │                     │                           │
│  ☑ 예배안내  │                     │                           │
│    🟫 배경색  │                     │                           │
├─────────────┴──────────────────────┴───────────────────────────┤
└────────────────────────────────────────────────────────────────┘
```

### 6.2 섹션별 배경색

- 좌측 사이드바에서 섹션 선택 시 배경색 설정 UI 펼침
- 헤더/히어로 제외
- 프리셋 3종 (흰색, 밝은회색, 회색) + 커스텀 컬러피커

### 6.3 IconPicker

- 100+개 MDI 아이콘 제공
- 7개 카테고리: 종교, 사람, 자연, 교육, 미디어, 비즈니스, UI
- 한국어 검색 지원
- 드롭다운 형태, 외부 클릭 시 닫힘

---

## 7. 개발 단계

### Phase 1: 기본 기능 (완료)

- [x] 프로젝트 설정 (Nuxt 3, TypeScript, Pinia)
- [x] 순수 CSS 디자인 시스템
- [x] 메인 컬러 시스템 (동적 팔레트)
- [x] 에디터 3단 레이아웃
- [x] 섹션 On/Off, 드래그 순서 변경
- [x] 섹션별 배경색 설정
- [x] HeaderSection + Editor
- [x] HeroSection + Editor (배경/딤/텍스트/버튼)
- [x] ChurchIntroSection + Editor (카드/그림자/아이콘)
- [x] WorshipInfoSection + Editor (예배안내)
- [x] IconPicker 공통 컴포넌트
- [x] ContactSection, FooterSection (컴포넌트)

### Phase 2: 나머지 편집기 + 추가 섹션

- [ ] ContactSection 편집기
- [ ] FooterSection 편집기
- [ ] Gallery, Testimonial, Pricing, Team, FAQ, CTA 섹션

### Phase 3: 고급 기능

- [ ] 폰트 변경, 스크롤 애니메이션, 반응형 미리보기

### Phase 4: 백엔드

- [ ] MongoDB, API, 인증, 배포
