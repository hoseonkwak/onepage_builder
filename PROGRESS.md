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

### 2. 스타일링 시스템 전환

| 항목 | 상태 |
|------|------|
| Tailwind CSS 제거 | 완료 |
| 순수 CSS + CSS Custom Properties 전환 | 완료 |
| 글로벌 CSS 변수 정의 (컬러, 반경, 그림자, 간격) | 완료 |
| 공통 컴포넌트 스타일 (버튼, 에디터, 토글 등) | 완료 |
| 모든 .vue 파일 scoped CSS로 전환 | 완료 |

### 3. 메인 컬러 시스템

| 항목 | 상태 |
|------|------|
| `useThemeColor` composable 구현 | 완료 |
| HSL 기반 팔레트 자동 생성 (50~900, 10단계) | 완료 |
| 선택한 색 = primary-500 기준으로 상대적 밝기 생성 | 완료 |
| 어두운/채도 낮은 색 보정 (최소 채도 보장) | 완료 |
| CSS 변수 실시간 업데이트 | 완료 |
| 좌측 사이드바 컬러피커 + 팔레트 미리보기 | 완료 |
| 에디터/프리뷰 페이지 모두 적용 | 완료 |

### 4. 페이지 구조

| 구분 | 경로 | 설명 |
|------|------|------|
| 에디터 (메인) | `/` | 템플릿 선택 → 3단 편집 레이아웃 |
| 미리보기 | `/preview` | 완성된 원페이지 렌더링 |

### 5. 에디터 UI

| 항목 | 상태 |
|------|------|
| 3단 레이아웃 (사이드바 / 미리보기 / 편집패널) | 완료 |
| 템플릿 선택 화면 (Type 1~3) | 완료 |
| 섹션 On/Off 토글 | 완료 |
| 섹션 순서 변경 (vue-draggable-plus) | 완료 |
| 섹션 선택 시 하이라이트 표시 | 완료 |
| 미리보기 영역 헤더 sticky 고정 | 완료 |

### 6. 섹션 컴포넌트

| 섹션 | 설명 | 상태 |
|------|------|------|
| HeaderSection | 헤더/네비게이션 (앵커 스크롤, 모바일 메뉴) | 완료 |
| HeroSection | 히어로 (배경 이미지, 딤, 텍스트/버튼 커스텀) | 완료 |
| ChurchIntroSection | 교회소개 (카드/아이콘/미니멀 스타일, 동적 그리드) | 완료 |
| AboutSection | 소개 (이미지 레이아웃, 통계) | 완료 |
| ContactSection | 연락처 (정보 + 문의 폼) | 완료 |
| FooterSection | 푸터 (저작권, 링크, 소셜) | 완료 |

### 7. 섹션 편집기

| 편집기 | 편집 가능 항목 | 상태 |
|--------|---------------|------|
| HeaderEditor | 로고(텍스트/이미지), 로그인(토글/텍스트/링크), 상단 고정 | 완료 |
| HeroEditor | 배경(파일 업로드/URL), 딤(토글/불투명도), 텍스트(제목/부제목/설명 + 흰검 선택), 버튼(테마/커스텀 색상 + 글자색 흰검), 정렬, 높이 | 완료 |
| ChurchIntroEditor | 제목/부제목, 항목 추가/삭제/편집(아이콘/제목/설명), 컬럼 수, 스타일 | 완료 |

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
│   │   ├── AboutSection.vue
│   │   ├── ContactSection.vue
│   │   └── FooterSection.vue
│   │
│   └── editors/
│       ├── HeaderEditor.vue
│       ├── HeroEditor.vue
│       └── ChurchIntroEditor.vue
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

### Phase 1: 나머지 편집기 완성

| 항목 | 상태 |
|------|------|
| AboutSection 편집기 | 미완료 |
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
| 2025-01-16 | 미리보기 기능, 헤더 미리보기 모드 |
| 2025-01-21 | HeaderEditor, HeroEditor 구현 |
| 2025-01-21 | 미리보기 헤더 sticky, localStorage 마이그레이션 |
| 2026-04-16 | Tailwind CSS → 순수 CSS 전환 |
| 2026-04-16 | 메인 컬러 시스템 (useThemeColor, 동적 팔레트) |
| 2026-04-16 | 히어로 배경 이미지 파일 업로드 |
| 2026-04-16 | 히어로 딤 처리 (토글 + 불투명도) |
| 2026-04-16 | 히어로 텍스트 색상 (흰/검 선택) |
| 2026-04-16 | 히어로 버튼 테마컬러/직접선택 모드 |
| 2026-04-16 | 히어로 버튼 글자색 흰/검 선택 |
| 2026-04-16 | ChurchIntroEditor 구현 |
| 2026-04-16 | preview.vue FeaturesSection → ChurchIntroSection 수정 |
| 2026-04-16 | GitHub 원격 저장소 연결 |
