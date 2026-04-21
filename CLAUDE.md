# CLAUDE.md

이 파일은 Claude Code가 이 저장소에서 작업할 때 참고하는 가이드입니다.

## 프로젝트 개요

**교회 홈페이지 전용 원페이지(One-Page) 빌더**. 섹션 단위로 콘텐츠/이미지/색상/스타일을 편집해 랜딩페이지를 완성할 수 있는 도구.

- 에디터: `http://localhost:3000` (3단 레이아웃: 사이드바 / 미리보기 / 편집 패널)
- 미리보기: `http://localhost:3000/preview`

## 개발 명령어

```bash
npm install       # 의존성 설치
npm run dev       # 개발 서버 (Nuxt)
npm run build     # 프로덕션 빌드
npm run generate  # 정적 사이트 생성
npm run type-check
npm run lint
```

빌드 검증: 변경 후 반드시 `npx nuxt build`로 최종 확인.

## 기술 스택

| 영역 | 기술 |
|------|------|
| 프레임워크 | Nuxt 3 (3.20.2) |
| 언어 | TypeScript |
| 상태관리 | Pinia (`stores/site.ts`) |
| 스타일링 | 순수 CSS + CSS Custom Properties (`assets/css/main.css`) — **Tailwind 사용 금지** |
| 아이콘 | nuxt-icon (Iconify, MDI) |
| 드래그앤드롭 | vue-draggable-plus |

## 아키텍처

### 데이터 흐름

```
사용자 편집 → Editor.vue (local state)
            → emit('update', content)
            → pages/index.vue handler
            → siteStore.updateXxx(content)
            → siteStore.content.xxx 갱신
            → Section.vue re-render (미리보기)
```

### 핵심 원칙

1. **Pinia store가 단일 source of truth** — 모든 콘텐츠는 `siteStore.content`에 저장
2. **섹션 ↔ 편집기 짝을 이룸** — `XxxSection.vue` ↔ `XxxEditor.vue`
3. **로컬 상태 + emit 패턴** — 에디터는 로컬 복사본을 편집 후 `emit('update', ...)`로 전파
4. **localStorage 자동 저장/복구** — `siteStore.loadFromLocal()` on mount

### 섹션 구성

| 섹션 | 타입 | 편집기 |
|------|------|--------|
| 헤더 | `header` | `HeaderEditor.vue` |
| 히어로 | `hero` | `HeroEditor.vue` |
| 교회소개 | `churchIntro` | `ChurchIntroEditor.vue` |
| 예배안내 | `worshipInfo` | `WorshipInfoEditor.vue` |
| 게시판 | `board` | `BoardEditor.vue` |
| 새가족안내 | `newfamilyInfo` | `NewFamilyInfoEditor.vue` |
| 교회학교 | `youth` | `YouthEditor.vue` |
| 갤러리 | `gallery` | `GalleryEditor.vue` |
| 지도 | `map` | `MapEditor.vue` |
| 푸터 | `footer` | `FooterEditor.vue` |

## 디렉토리 구조

```
onepage_builder/
├── assets/css/main.css           # 글로벌 CSS 변수 + 공통 스타일
├── components/
│   ├── sections/                 # 섹션 렌더링 (10종)
│   └── editors/                  # 섹션 편집기 + IconPicker
├── composables/
│   └── useThemeColor.ts          # HSL 기반 테마 팔레트 생성
├── layouts/
│   ├── default.vue
│   └── admin.vue                 # 에디터 페이지 레이아웃
├── pages/
│   ├── index.vue                 # 에디터 (메인)
│   └── preview.vue               # 완성 페이지 렌더링
├── stores/
│   └── site.ts                   # Pinia 단일 store
├── types/
│   └── site.ts                   # 모든 콘텐츠 타입 정의
└── docs/                         # (agents, skills 하위)
```

## 스타일링 규칙

### CSS Custom Properties (`main.css`)

| 변수 | 예시 값 |
|------|---------|
| `--primary-50` ~ `--primary-900` | **동적** — 사용자 선택 색에 따라 `useThemeColor`가 실시간 업데이트 |
| `--gray-50` ~ `--gray-900` | 고정 Tailwind 팔레트 호환 |
| `--radius-sm/md/lg/xl/full` | 0.25 / 0.375 / 0.5 / 0.75rem / 9999px |
| `--shadow-sm/md/lg/xl` | Tailwind 기본 shadow 값 |
| `--transition-fast` / `--transition-normal` | 200ms / 300ms |
| `--sidebar-width` / `--editor-width` / `--container-max` | 16rem / 24rem / 80rem |

### 공통 클래스 (main.css에 정의됨, 새 컴포넌트에서 재사용할 것)

| 클래스 | 용도 |
|--------|------|
| `.section` | 섹션 기본 패딩 (4~6rem) |
| `.section-header` / `.section-title` / `.section-divider` / `.section-subtitle` | 섹션 헤더 블록 (중앙 정렬 + 제목 + 구분선 + 부제목) |
| `.container-custom` | 반응형 컨테이너 |
| `.btn-primary` / `.btn-secondary` | 버튼 |
| `.editor-section` / `.editor-label` / `.editor-input` | 에디터 폼 공통 |
| `.toggle` / `.toggle-slider` | 토글 스위치 |
| `.option-btn` | 프리셋 선택 버튼 |
| `.color-picker` | 컬러 피커 |
| `.stack-2~6` | 수직 간격 유틸 (`> * + *` 셀렉터) |

### 중요: Tailwind 사용 금지

- 이 프로젝트는 **Tailwind CSS를 제거**하고 순수 CSS로 전환됨
- 모든 스타일은 scoped `<style>` 또는 main.css의 공통 클래스로 작성
- 새 컴포넌트 작성 시 CSS 변수를 사용할 것

## 편집 패턴 (공통)

모든 편집기는 다음 패턴을 따름:

```typescript
// 1. 로컬 복사본 생성
const localContent = ref<XxxContent>({
  ...props.content,
  items: props.content.items.map(i => ({ ...i })) // 배열은 깊은 복사
})

// 2. 변경 후 emit
const emitUpdate = () => {
  emit('update', { ...localContent.value, items: [...] })
}

// 3. props 변경 시 로컬 동기화
watch(() => props.content, (newVal) => {
  localContent.value = { ...newVal, items: newVal.items.map(i => ({ ...i })) }
}, { deep: true })
```

## 공통 UX 패턴

### 테마 / 직접 선택 토글
아이콘 색상, 버튼 색상 등에서 사용:
- **테마 컬러** — `--primary-500` 등 CSS 변수 사용
- **직접 선택** — 컬러피커 표시, 직접 hex 입력

관련 필드: `xxxUseTheme: boolean` + `xxxBgColor: string` + `xxxColor: string`

### 텍스트 색 (흰/검)
배경 이미지 위에 텍스트 표시할 때:
- **흰색 / 검정** 2개 버튼으로 토글
- 필드: `textDark: boolean` (true=검정)
- CSS: 부모에 `.xxx--light` 또는 `.xxx--dark` 클래스로 일괄 적용

### 이미지 업로드
- 드롭존 클릭 → 파일 선택 → `FileReader`로 Base64 Data URL로 변환
- URL 직접 입력도 지원

### 딤 처리
- `dimEnabled: boolean` + `dimOpacity: number (0~100)`
- 절대 위치 `div`로 배경 위에 검은 오버레이

### 구분선
- `showDivider: boolean` — 제목 아래 짧은 구분선 표시 여부
- 공통 `.section-divider` 클래스 사용

### 섹션별 배경색
- `SectionConfig.useBgColor` + `bgColor`
- 좌측 사이드바에서 섹션 선택 시 펼쳐지는 UI
- 헤더/히어로 제외
- 프리셋 3종 (흰/밝은회색/회색) + 커스텀 컬러피커

## 핵심 컴포넌트

### IconPicker (`editors/IconPicker.vue`)

- 100+개 MDI 아이콘
- 7개 카테고리: 종교 / 사람 / 자연 / 교육 / 미디어 / 비즈니스 / UI
- 검색 지원 (한글/영문)
- 외부 클릭 시 닫힘

### useThemeColor (`composables/useThemeColor.ts`)

- 사용자가 메인 컬러 선택 → `--primary-500` 기준으로 50~900 팔레트 자동 생성
- HSL 기반: 밝기만 조정, 채도가 낮은 색도 최소 15% 보장
- `document.documentElement.style`에 실시간 CSS 변수 반영

## 전역 설정 (`GlobalSettings`)

```typescript
{
  primaryColor: string    // 메인 컬러 (hex)
  fontFamily: string      // 'Pretendard'
  logoText: string        // 헤더 로고 텍스트
  churchName: string      // 교회 이름 (푸터 copyright에 반영)
  logoImage?: string
  faviconImage?: string
}
```

**churchName**은 좌측 사이드바 최상단 "교회 이름" 입력에서 관리. 푸터에 `© {year} {churchName}. All Rights Reserved.`로 표시.

## 개발 가이드라인

### IDE 진단 무시

- `.vue` 파일의 `"Module has no default export"` — Vue SFC 관련 **false positive**, 무시
- `"Cannot find name 'defineProps'"` — `<script setup>` 매크로 관련 false positive, 무시
- 최종 검증은 `npx nuxt build`로 수행

### 섹션 추가 절차

1. `types/site.ts`에 `XxxContent` 인터페이스 추가 → `SectionType` 유니온에 추가 → `SiteContent`에 필드 추가
2. `stores/site.ts`:
   - `sectionLabels`에 한글명 추가
   - `navSections`에 추가 (헤더 네비에 노출할 경우)
   - `getDefaultContent()`에 기본값 추가 + `sections` 배열에 등록
   - `loadFromLocal` 병합에 추가
   - `updateXxx(content)` 액션 추가
3. `components/sections/XxxSection.vue` 작성
4. `components/editors/XxxEditor.vue` 작성
5. `pages/index.vue`:
   - Section + Editor import 추가
   - `sectionComponents` 매핑 추가
   - 편집 패널에 `<XxxEditor v-else-if="selectedSection === 'xxx'">` 추가
   - `updateXxxContent` 핸들러 추가
6. `pages/preview.vue`에도 Section import + 매핑 추가
7. 공통 섹션 헤더 사용 시 `.section-header` + `.section-divider` + `.section-subtitle` 사용

### Git 워크플로우

- 원격: https://github.com/hoseonkwak/onepage_builder.git
- 사용자 정보는 로컬 설정: `hoseon kwak` / `hoseon@ohjic.com`
- 메인 브랜치: `main`

## 주요 파일 빠른 참조

| 파일 | 역할 |
|------|------|
| [stores/site.ts](stores/site.ts) | 모든 콘텐츠의 single source of truth, 액션 정의 |
| [types/site.ts](types/site.ts) | TypeScript 타입 정의 |
| [pages/index.vue](pages/index.vue) | 에디터 메인 — 3단 레이아웃, 교회이름/메인컬러/섹션구성 UI |
| [pages/preview.vue](pages/preview.vue) | 완성된 원페이지 렌더링 |
| [assets/css/main.css](assets/css/main.css) | CSS 변수 + 공통 컴포넌트 스타일 |
| [composables/useThemeColor.ts](composables/useThemeColor.ts) | 테마 팔레트 생성 |
| [components/editors/IconPicker.vue](components/editors/IconPicker.vue) | 아이콘 선택 공통 컴포넌트 |
