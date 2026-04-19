# 원페이지 템플릿 빌더 설계 문서

## 1. 프로젝트 개요

교회 홈페이지 전용 **원페이지(One-Page) 빌더**.
사용자는 섹션 단위로 콘텐츠와 스타일을 편집해 랜딩페이지를 완성합니다.

### 핵심 흐름

```
1. 템플릿 선택
2. 메인 컬러 설정 (HSL 자동 팔레트)
3. 섹션 구성 — On/Off + 순서 드래그 + 배경색
4. 섹션별 편집 — 텍스트/이미지/색상/버튼/스타일
5. 저장 & 완료
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
├── assets/css/main.css           # 글로벌 CSS 변수 + 공통 스타일
├── components/
│   ├── sections/                 # 섹션 렌더링 컴포넌트
│   └── editors/                  # 섹션 편집기 + IconPicker
├── composables/useThemeColor.ts  # 테마 팔레트 생성
├── layouts/                      # default, admin
├── pages/                        # index (에디터), preview
├── stores/site.ts                # Pinia 상태관리
└── types/site.ts                 # TypeScript 타입 정의
```

---

## 4. 스타일링 시스템

### 4.1 CSS Custom Properties (`main.css`)

| 변수 그룹 | 예시 |
|-----------|------|
| 프라이머리 컬러 | `--primary-50` ~ `--primary-900` (동적) |
| 그레이 스케일 | `--gray-50` ~ `--gray-900` |
| 반경 | `--radius-sm/md/lg/xl/full` |
| 그림자 | `--shadow-sm/md/lg/xl` |
| 트랜지션 | `--transition-fast/normal` |
| 레이아웃 | `--sidebar-width`, `--editor-width`, `--container-max` |

### 4.2 공통 클래스

| 클래스 | 용도 |
|--------|------|
| `.section` | 섹션 기본 패딩 |
| `.section-header` | 헤더 블록 (중앙 정렬) |
| `.section-title` | 섹션 제목 |
| `.section-divider` | 제목 하단 구분선 |
| `.section-subtitle` | 부제목 |
| `.container-custom` | 반응형 컨테이너 |
| `.btn-primary` / `.btn-secondary` | 버튼 |
| `.editor-section` / `.editor-label` / `.editor-input` | 에디터 폼 |
| `.toggle` / `.toggle-slider` | 토글 스위치 |
| `.option-btn` | 프리셋 버튼 |
| `.color-picker` | 컬러 피커 |
| `.stack-2~6` | 수직 간격 유틸 |

### 4.3 테마 컬러 (`useThemeColor`)

- 사용자 선택 색 = `--primary-500`
- 50~400: 상대적으로 밝게 (lightness 증가)
- 600~900: 상대적으로 어둡게
- 채도 낮은 색도 최소 15% 보장
- `document.documentElement.style`에 실시간 반영

---

## 5. 데이터 모델

### 5.1 섹션 설정

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
  useBgColor: boolean
  bgColor: string
}
```

### 5.2 주요 콘텐츠 타입 (요약)

```typescript
// 히어로
interface HeroContent {
  title, subtitle, description
  textDark: boolean         // 제목 흰/검
  backgroundImage?: string
  dimEnabled: boolean       // 배경 딤
  dimOpacity: number        // 0~100
  buttonUseTheme, buttonTextDark
  buttonBgColor, buttonTextColor
  buttonBorderRadius, textAlign, height
}

// 게시판 (주보형 카드)
interface BoardContent {
  title, subtitle, showDivider
  items: { title, date, author?, link? }[]
  backgroundImage?, dimEnabled, dimOpacity
  textDark                  // 제목 흰/검
  iconUseTheme, iconBgColor, iconColor  // 따옴표 아이콘
  moreText?, moreLink?
}

// 새가족안내 (STEP 카드)
interface NewFamilyInfoContent {
  title, subtitle, showDivider, columns
  steps: {
    label, title, subtitle, description
    buttonText?, buttonLink?
    buttonUseTheme, buttonTextDark
    buttonBgColor, buttonTextColor
  }[]
}

// 교회학교 (좌 텍스트 + 우 이미지 카드)
interface YouthContent {
  title, subtitle, showDivider, columns
  departments: {
    name, description, image?
    buttonText?, buttonLink?
    buttonUseTheme, buttonTextDark
    buttonBgColor, buttonTextColor
  }[]
}

// 갤러리 (그리드 + 모달 뷰어)
interface GalleryContent {
  title, subtitle, showDivider, columns
  style: 'grid' | 'masonry' | 'slider'
  items: { image, title?, category?, link? }[]
}

// 지도
interface MapContent {
  title, subtitle, showDivider
  address, phone?, embedUrl?
  height: number
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
  iconUseTheme, iconBgColor, iconColor
  bgColor
}
```

---

## 6. 에디터 UI

### 6.1 3단 레이아웃

```
┌────────────────────────────────────────────────────────────┐
│ ← 템플릿선택                              [미리보기] [저장] │
├─────────────┬─────────────────────┬───────────────────────┤
│ 좌: 사이드바 │    실시간 미리보기   │   우: 편집 패널        │
│             │                     │                       │
│ 🎨 메인컬러  │  ┌───────────────┐  │  [선택된 섹션 편집]    │
│ ███████████ │  │               │  │                       │
│ ──────────  │  │   원페이지     │  │  배경/딤/텍스트/버튼   │
│ 섹션 구성   │  │   프리뷰      │  │  레이아웃/스타일       │
│ ☑ 헤더      │  │               │  │  아이콘/그림자/색상    │
│ ☑ 히어로    │  │               │  │                       │
│ ☑ 교회소개  │  │               │  │                       │
│   🟫 배경색  │  │               │  │                       │
│ ☑ 예배안내  │  │               │  │                       │
│   🟫 배경색  │  │               │  │                       │
│ ☑ 게시판    │  └───────────────┘  │                       │
│ ☑ 새가족안내 │                     │                       │
│ ☑ 교회학교  │                     │                       │
│ ☑ 갤러리    │                     │                       │
│ ☑ 지도      │                     │                       │
│ ☑ 푸터      │                     │                       │
└─────────────┴─────────────────────┴───────────────────────┘
```

### 6.2 섹션별 배경색 (사이드바)

- 좌측 사이드바에서 섹션 선택 시 배경색 옵션 펼침
- 헤더/히어로 제외
- 프리셋 3종(흰색, 밝은회색, 회색) + 커스텀 컬러피커
- 설정된 색은 섹션 아이템 우측 점으로 표시

### 6.3 공통 편집 패턴

- **색상 선택** — "테마 컬러 / 직접 선택" 토글 → 직접 선택 시 배경색·글자색 컬러피커 표시
- **텍스트 색 (흰/검)** — 2개 버튼으로 토글 (`textDark: boolean`)
- **배경 이미지** — 드롭존 클릭 → 파일 업로드(Base64) 또는 URL 직접 입력
- **딤 처리** — 토글 + 0~100% 슬라이더
- **구분선** — `showDivider` 토글로 제목 아래 구분선 on/off

### 6.4 IconPicker

- 100+개 MDI 아이콘
- 카테고리: 종교, 사람, 자연, 교육, 미디어, 비즈니스, UI
- 검색 지원, 외부 클릭 시 닫힘

---

## 7. 섹션 디자인 특징

| 섹션 | 특징 |
|------|------|
| 히어로 | 배경 이미지 + 딤 오버레이, 중앙/좌/우 정렬, 버튼 커스텀 |
| 교회소개 | 카드형 (아이콘 상단 배치 + 그림자 5종) / 아이콘형 / 미니멀형 3스타일 |
| 예배안내 | 아이콘 + 제목 + 다줄 설명, 가로 배치 |
| 게시판 | 주보 카드 3개 (따옴표 아이콘, 말풍선 꼬리, 작성자/날짜, 더보기) |
| 새가족안내 | STEP 카드 (라벨 → 제목 → 부제목 → 구분선 → 설명 → 버튼) |
| 교회학교 | 부서별 카드 (좌측 텍스트 + 우측 이미지, 2열 기본) |
| 갤러리 | 그리드 + 클릭 시 전체화면 모달 (좌/우 화살표, ESC 닫기) |
| 지도 | 주소/전화 + iframe embed |

---

## 8. 개발 단계

### Phase 1 (완료)

- [x] 프로젝트 설정, 순수 CSS 전환, 디자인 시스템
- [x] 메인 컬러 동적 팔레트
- [x] 에디터 3단 레이아웃 + 섹션 On/Off/순서/배경색
- [x] 섹션 10종 구현
- [x] 편집기 8종 (Header, Hero, ChurchIntro, WorshipInfo, Board, NewFamilyInfo, Youth, Gallery)
- [x] IconPicker 공통 컴포넌트

### Phase 2

- [ ] MapEditor, FooterEditor
- [ ] 저장/미리보기 버튼 연결
- [ ] 폰트 변경, GSAP 스크롤 애니메이션
- [ ] 반응형 미리보기 (모바일/태블릿)

### Phase 3 (백엔드)

- [ ] MongoDB, API, 이미지 업로드 서버
- [ ] 사용자 인증, 사이트 발행/배포
