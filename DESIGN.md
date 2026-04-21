# 원페이지 템플릿 빌더 설계 문서

## 1. 프로젝트 개요

교회 홈페이지 전용 **원페이지(One-Page) 빌더**.
섹션 단위로 콘텐츠와 스타일을 편집해 랜딩페이지를 완성합니다.

### 핵심 흐름

```
1. 템플릿 선택
2. 교회 이름 입력
3. 메인 컬러 설정 (HSL 자동 팔레트)
4. 섹션 구성 — On/Off + 순서 드래그 + 배경색
5. 섹션별 편집 — 텍스트/이미지/색상/버튼/스타일
6. 저장 & 완료
```

---

## 2. 기술 스택

| 영역 | 기술 |
|------|------|
| 프레임워크 | Nuxt 3 |
| 언어 | TypeScript |
| 상태관리 | Pinia |
| 스타일링 | 순수 CSS + CSS Custom Properties |
| 아이콘 | nuxt-icon (Iconify, MDI) |
| 드래그앤드롭 | vue-draggable-plus |

---

## 3. 디렉토리 구조

```
onepage_builder/
├── CLAUDE.md                     # Claude Code 가이드
├── assets/css/main.css           # 글로벌 CSS 변수 + 공통 스타일
├── components/
│   ├── sections/                 # 섹션 렌더링 (10종)
│   └── editors/                  # 편집기 + IconPicker
├── composables/useThemeColor.ts  # 테마 팔레트 생성
├── layouts/                      # default, admin
├── pages/                        # index (에디터), preview (미리보기)
├── stores/site.ts                # Pinia 단일 store
└── types/site.ts                 # TypeScript 타입
```

---

## 4. 스타일링 시스템

### 4.1 CSS Custom Properties

| 변수 그룹 | 설명 |
|-----------|------|
| `--primary-50` ~ `--primary-900` | 동적 — `useThemeColor`가 실시간 갱신 |
| `--gray-50` ~ `--gray-900` | 고정 |
| `--radius-sm/md/lg/xl/full` | 반경 |
| `--shadow-sm/md/lg/xl` | 그림자 |
| `--transition-fast/normal` | 200ms / 300ms |
| `--sidebar-width`, `--editor-width`, `--container-max` | 레이아웃 |

### 4.2 공통 클래스

| 클래스 | 용도 |
|--------|------|
| `.section` | 섹션 기본 패딩 |
| `.section-header` | 섹션 헤더 블록 (중앙 정렬) |
| `.section-title` / `.section-divider` / `.section-subtitle` | 제목/구분선/부제목 |
| `.container-custom` | 반응형 컨테이너 |
| `.btn-primary` / `.btn-secondary` | 버튼 |
| `.editor-section` / `.editor-label` / `.editor-input` | 에디터 폼 |
| `.toggle` / `.toggle-slider` | 토글 |
| `.option-btn` | 프리셋 버튼 |
| `.color-picker` | 컬러 피커 |
| `.stack-2~6` | 수직 간격 유틸 |

### 4.3 테마 컬러

- 사용자 선택 색 = `--primary-500`
- 50~400: 상대적으로 밝게
- 600~900: 상대적으로 어둡게
- 채도 낮은 색도 최소 15% 보장
- `document.documentElement.style`에 실시간 반영

---

## 5. 데이터 모델

### 5.1 전역 설정

```typescript
interface GlobalSettings {
  primaryColor: string
  fontFamily: string
  logoText: string
  churchName: string      // 푸터 copyright에 반영
  logoImage?: string
  faviconImage?: string
}
```

### 5.2 섹션 설정

```typescript
type SectionType =
  | 'header' | 'hero'
  | 'churchIntro' | 'worshipInfo'
  | 'board' | 'newfamilyInfo' | 'youth'
  | 'gallery' | 'map' | 'footer'

interface SectionConfig {
  type: SectionType
  enabled: boolean
  order: number
  id: string
  useBgColor: boolean     // 섹션별 배경색 on/off
  bgColor: string
}
```

### 5.3 섹션별 콘텐츠 요약

```typescript
// 히어로
interface HeroContent {
  title, subtitle, description
  textDark                // 제목 흰/검
  backgroundImage?        // 파일 업로드 or URL
  dimEnabled, dimOpacity  // 0~100
  buttonUseTheme, buttonTextDark, buttonBgColor, buttonTextColor
  buttonBorderRadius, textAlign, height
}

// 교회소개
interface ChurchIntroContent {
  title, subtitle, showDivider, columns
  style: 'cards' | 'icons' | 'minimal'
  items: { icon, title, description }[]
  iconUseTheme, iconBgColor, iconColor
  cardBgColor
  cardShadow: 'none' | 'sm' | 'md' | 'lg' | 'custom'
  cardShadowDir: 'center' | 'left' | 'bottom' | 'right'
  cardShadowX/Y/Blur/Spread, cardShadowColor
}

// 예배안내
interface WorshipInfoContent {
  title, subtitle, showDivider, columns
  items: { icon, title, description }[]
  iconUseTheme, iconBgColor, iconColor, bgColor
}

// 게시판
interface BoardContent {
  title, subtitle, showDivider
  items: { title, date, author?, link? }[]
  backgroundImage?, dimEnabled, dimOpacity, textDark
  iconUseTheme, iconBgColor, iconColor  // 따옴표 아이콘
  moreText?, moreLink?
}

// 새가족안내
interface NewFamilyInfoContent {
  title, subtitle, showDivider, columns
  steps: {
    label, title, subtitle, description
    buttonText?, buttonLink?
    buttonUseTheme, buttonTextDark, buttonBgColor, buttonTextColor
  }[]
}

// 교회학교
interface YouthContent {
  title, subtitle, showDivider, columns
  departments: {
    name, description, image?
    buttonText?, buttonLink?
    buttonUseTheme, buttonTextDark, buttonBgColor, buttonTextColor
  }[]
}

// 갤러리
interface GalleryContent {
  title, subtitle, showDivider, columns
  style: 'grid' | 'masonry' | 'slider'
  items: { image, title?, category?, link? }[]
}

// 지도
interface MapContent {
  address, height
}

// 푸터
interface FooterContent {
  address                 // 편집 가능
  socialUseTheme, socialBgColor, socialIconColor
  social?: SocialLink[]
}
```

---

## 6. 에디터 UI

### 6.1 3단 레이아웃

```
┌───────────────────────────────────────────────────────────┐
│ ← 템플릿선택                            [미리보기] [저장]  │
├──────────────┬─────────────────────┬──────────────────────┤
│ 좌: 사이드바  │    실시간 미리보기   │  우: 편집 패널        │
│              │                     │                      │
│ 🏛 교회 이름  │                     │                      │
│ 🎨 메인컬러  │                     │                      │
│ ██████████  │                     │                      │
│ ──────────   │                     │                      │
│ 섹션 구성    │                     │                      │
│ ☑ 헤더       │                     │                      │
│ ☑ 히어로     │                     │                      │
│ ☑ 교회소개    │                     │                      │
│   🟫 배경색   │                     │                      │
│ ☑ 예배안내    │                     │                      │
│ ☑ 게시판     │                     │                      │
│ ☑ 새가족안내  │                     │                      │
│ ☑ 교회학교    │                     │                      │
│ ☑ 갤러리     │                     │                      │
│ ☑ 지도       │                     │                      │
│ ☑ 푸터       │                     │                      │
└──────────────┴─────────────────────┴──────────────────────┘
```

### 6.2 공통 편집 패턴

- **색상 선택** — 테마/직접 2모드 토글
- **텍스트 색 (흰/검)** — 2택 버튼
- **배경 이미지** — 파일 업로드(Base64) 또는 URL
- **딤 처리** — 토글 + 0~100% 슬라이더
- **구분선** — `showDivider` 토글
- **아이콘 선택** — `IconPicker` 공통 컴포넌트
- **섹션별 배경색** — 사이드바에서 섹션 선택 시 펼침 (헤더/히어로 제외)

### 6.3 IconPicker

- 100+개 MDI 아이콘
- 카테고리: 종교, 사람, 자연, 교육, 미디어, 비즈니스, UI
- 검색 (한글/영문), 외부 클릭 시 닫힘

---

## 7. 섹션 디자인 특징

| 섹션 | 특징 |
|------|------|
| 히어로 | 배경 이미지 + 딤, 정렬 3종, 버튼 테마/커스텀 |
| 교회소개 | 카드/아이콘/미니멀 3스타일, 그림자 5종 + 방향 + 커스텀 |
| 예배안내 | 아이콘 + 제목 + 다줄 설명 가로 배치 |
| 게시판 | 주보 카드 3개, 따옴표 아이콘, 말풍선 꼬리, 더보기 버튼 |
| 새가족안내 | STEP 카드 (라벨 → 제목 → 부제목 → 구분선 → 설명 → 버튼) |
| 교회학교 | 좌측 텍스트 + 우측 이미지 2단 카드 |
| 갤러리 | 그리드 + 클릭 시 전체화면 모달 (좌/우 화살표, ESC 닫기) |
| 지도 | 주소 입력 → Google Maps embed 자동 |
| 푸터 | 주소 / 자동 copyright / credit line / 소셜 아이콘 |

---

## 8. 개발 단계

### Phase 1 (완료)

- [x] 프로젝트 설정, 순수 CSS 전환, 디자인 시스템
- [x] 메인 컬러 동적 팔레트
- [x] 교회 이름 전역 설정
- [x] 에디터 3단 레이아웃 + 섹션 On/Off/순서/배경색
- [x] 섹션 10종 + 편집기 10종 구현
- [x] IconPicker 공통 컴포넌트

### Phase 2

- [ ] 저장/미리보기 버튼 연결
- [ ] 폰트 변경, GSAP 스크롤 애니메이션
- [ ] 반응형 미리보기 (모바일/태블릿)

### Phase 3 (백엔드)

- [ ] MongoDB, API, 이미지 업로드 서버
- [ ] 사용자 인증, 사이트 발행/배포
