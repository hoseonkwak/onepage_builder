# 원페이지 빌더 개발 진행 상황

## 프로젝트 개요

원페이지(One-Page) 전용 템플릿 빌더. 사용자가 미리 정의된 템플릿에서 섹션 순서를 변경하고, 텍스트와 이미지를 교체하여 랜딩페이지를 완성할 수 있는 도구.

## 기술 스택

| 영역 | 기술 | 버전 |
|------|------|------|
| 프레임워크 | Nuxt 3 | 3.20.2 |
| 언어 | TypeScript | 5.x |
| 상태관리 | Pinia | 2.x |
| 스타일링 | 순수 CSS (CSS Custom Properties) | - |
| 아이콘 | nuxt-icon (Iconify) | 0.6.10 |
| 드래그앤드롭 | vue-draggable-plus | 0.5.x |
| 애니메이션 | GSAP | 3.x |
| 슬라이더 | Swiper | 12.x |

## 완료된 작업

### 1. 프로젝트 초기 설정

| 항목 | 상태 |
|------|------|
| Nuxt 3 프로젝트 구조 설정 | 완료 |
| TypeScript 설정 | 완료 |
| Pinia 상태관리 설정 | 완료 |
| nuxt-icon 모듈 설치 및 설정 | 완료 |
| GitHub 원격 저장소 연결 | 완료 |

### 2. 스타일링 시스템

| 항목 | 상태 |
|------|------|
| Tailwind CSS → 순수 CSS 전환 | 완료 |
| CSS Custom Properties 디자인 시스템 | 완료 |
| 공통 컴포넌트 스타일 (버튼, 에디터, 토글 등) | 완료 |
| 공통 섹션 헤더 (`.section-header`, `.section-divider`) | 완료 |
| 모든 .vue 파일 scoped CSS로 전환 | 완료 |

### 3. 메인 컬러 시스템

| 항목 | 상태 |
|------|------|
| `useThemeColor` composable 구현 | 완료 |
| HSL 기반 팔레트 자동 생성 (선택 색 = 500 기준) | 완료 |
| 어두운/채도 낮은 색 보정 | 완료 |
| CSS 변수 실시간 업데이트 | 완료 |
| 좌측 사이드바 컬러피커 + 팔레트 미리보기 | 완료 |

### 4. 에디터 UI

| 항목 | 상태 |
|------|------|
| 3단 레이아웃 (사이드바 / 미리보기 / 편집패널) | 완료 |
| 템플릿 선택 화면 (Type 1~3) | 완료 |
| 섹션 On/Off 토글 | 완료 |
| 섹션 순서 변경 (vue-draggable-plus) | 완료 |
| 섹션 선택 시 하이라이트 표시 | 완료 |
| 섹션별 배경색 설정 (프리셋 3종 + 커스텀, 헤더/히어로 제외) | 완료 |

### 5. 섹션 컴포넌트

| 섹션 | 파일명 | 설명 | 상태 |
|------|--------|------|------|
| 헤더 | HeaderSection.vue | 네비게이션, 모바일 메뉴, 로그인 | 완료 |
| 히어로 | HeroSection.vue | 배경 이미지/딤, 텍스트/버튼 커스텀 | 완료 |
| 교회소개 | ChurchIntroSection.vue | 카드/아이콘/미니멀 스타일, 그림자, 아이콘 색상 | 완료 |
| 예배안내 | WorshipInfoSection.vue | 아이콘+텍스트 가로 배치, 구분선 | 완료 |
| 연락처 | ContactSection.vue | 연락처 정보 + 문의 폼 | 완료 |
| 푸터 | FooterSection.vue | 저작권, 링크, 소셜 | 완료 |

### 6. 섹션 편집기

| 편집기 | 편집 가능 항목 | 상태 |
|--------|---------------|------|
| HeaderEditor | 로고, 로그인, 상단 고정 | 완료 |
| HeroEditor | 배경(파일/URL), 딤(토글/불투명도), 텍스트(흰/검), 버튼(테마/커스텀 + 글자색), 정렬, 높이 | 완료 |
| ChurchIntroEditor | 제목/부제목/구분선, 레이아웃(컬럼/스타일), 카드 배경색, 카드 그림자(프리셋+방향+커스텀), 아이콘 색상(테마/커스텀), 항목 관리(IconPicker) | 완료 |
| WorshipInfoEditor | 제목/부제목/구분선, 컬럼 수, 배경색, 아이콘 색상(테마/커스텀), 항목 관리(IconPicker) | 완료 |

### 7. 공통 컴포넌트

| 컴포넌트 | 설명 | 상태 |
|----------|------|------|
| IconPicker | 아이콘 선택 UI (카테고리별 분류, 검색, 100+개 아이콘) | 완료 |

### 8. 데이터 관리

| 항목 | 상태 |
|------|------|
| Pinia store (`stores/site.ts`) | 완료 |
| localStorage 저장/불러오기 | 완료 |
| 기본 콘텐츠 데이터 설정 | 완료 |
| 데이터 마이그레이션 (기존 데이터 호환) | 완료 |

## 현재 파일 구조

```
onepage_builder/
├── nuxt.config.ts
├── package.json
├── tsconfig.json
├── DESIGN.md
├── PROGRESS.md
├── README.md
│
├── assets/
│   └── css/
│       └── main.css              # 글로벌 스타일 (CSS 변수, 공통 컴포넌트)
│
├── components/
│   ├── sections/
│   │   ├── HeaderSection.vue
│   │   ├── HeroSection.vue
│   │   ├── ChurchIntroSection.vue
│   │   ├── WorshipInfoSection.vue
│   │   ├── ContactSection.vue
│   │   └── FooterSection.vue
│   │
│   └── editors/
│       ├── HeaderEditor.vue
│       ├── HeroEditor.vue
│       ├── ChurchIntroEditor.vue
│       ├── WorshipInfoEditor.vue
│       └── IconPicker.vue        # 아이콘 선택 공통 컴포넌트
│
├── composables/
│   └── useThemeColor.ts          # 테마 컬러 팔레트 생성
│
├── layouts/
│   ├── default.vue
│   └── admin.vue
│
├── pages/
│   ├── index.vue                 # 에디터 (메인)
│   └── preview.vue               # 미리보기
│
├── stores/
│   └── site.ts
│
└── types/
    └── site.ts
```

## 실행 방법

| 단계 | 명령어 |
|------|--------|
| 의존성 설치 | `npm install` |
| 개발 서버 실행 | `npm run dev` |
| 브라우저 접속 | http://localhost:3000 |

## 남은 작업 (TODO)

### Phase 1: 나머지 편집기

| 항목 | 상태 |
|------|------|
| ContactSection 편집기 | 미완료 |
| FooterSection 편집기 | 미완료 |
| 저장 버튼 기능 연결 | 미완료 |
| 미리보기 버튼 → `/preview` 연결 | 미완료 |

### Phase 2: 추가 섹션

| 섹션 | 상태 |
|------|------|
| GallerySection + 편집기 | 미완료 |
| TestimonialSection + 편집기 | 미완료 |
| PricingSection + 편집기 | 미완료 |
| TeamSection + 편집기 | 미완료 |
| FAQSection + 편집기 | 미완료 |
| CTASection + 편집기 | 미완료 |

### Phase 3: 고급 기능

| 항목 | 상태 |
|------|------|
| 폰트 변경 | 미완료 |
| GSAP 스크롤 애니메이션 | 미완료 |
| 반응형 미리보기 (모바일/태블릿) | 미완료 |

### Phase 4: 백엔드 연동

| 항목 | 상태 |
|------|------|
| MongoDB 연결 | 미완료 |
| API 구현 | 미완료 |
| 이미지 업로드 서버 저장 | 미완료 |
| 사용자 인증 | 미완료 |
| 사이트 발행/배포 | 미완료 |

## 변경 이력

| 날짜 | 내용 |
|------|------|
| 2025-01-16 | 프로젝트 초기 설정, 에디터 페이지 구현 |
| 2025-01-21 | HeaderEditor, HeroEditor 구현 |
| 2026-04-16 | Tailwind CSS → 순수 CSS 전환 |
| 2026-04-16 | 메인 컬러 시스템 (useThemeColor, 동적 팔레트) |
| 2026-04-16 | 히어로: 배경 업로드, 딤, 텍스트색, 버튼 테마/커스텀 + 글자색 |
| 2026-04-16 | ChurchIntroEditor (아이콘색, 카드배경, 그림자 프리셋+방향+커스텀) |
| 2026-04-16 | IconPicker 공통 컴포넌트 (카테고리별 100+개 아이콘) |
| 2026-04-16 | about → worshipInfo 리네이밍 |
| 2026-04-16 | WorshipInfoSection + WorshipInfoEditor 구현 (예배안내) |
| 2026-04-16 | 공통 섹션 헤더/구분선 (section-header, section-divider) |
| 2026-04-16 | 섹션별 배경색 설정 (프리셋 3종 + 커스텀, 헤더/히어로 제외) |
