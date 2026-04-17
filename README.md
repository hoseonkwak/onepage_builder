# 원페이지 템플릿 빌더

원페이지(One-Page) 전용 템플릿 빌더입니다. 미리 정의된 템플릿에서 섹션 순서를 변경하고, 텍스트와 이미지를 교체하여 랜딩페이지를 완성할 수 있습니다.

## 기술 스택

- **프레임워크**: Nuxt 3
- **언어**: TypeScript
- **상태관리**: Pinia
- **스타일링**: 순수 CSS (CSS Custom Properties 기반 디자인 시스템)
- **아이콘**: nuxt-icon (Iconify)
- **드래그앤드롭**: vue-draggable-plus
- **애니메이션**: GSAP
- **슬라이더**: Swiper

## 요구 사항

- Node.js 18.x 이상
- npm

## 실행 방법

### 1. 의존성 설치

```bash
npm install
```

### 2. 개발 서버 실행

```bash
npm run dev
```

개발 서버가 실행되면 브라우저에서 `http://localhost:3000`으로 접속합니다.

- 에디터 페이지: `http://localhost:3000`
- 미리보기 페이지: `http://localhost:3000/preview`

### 3. 프로덕션 빌드

```bash
npm run build
```

### 4. 정적 사이트 생성

```bash
npm run generate
```

## 기타 명령어

```bash
# 타입 체크
npm run type-check

# 린트 실행
npm run lint
```

## 프로젝트 구조

```
onepage_builder/
├── assets/
│   └── css/
│       └── main.css            # 글로벌 스타일 (CSS 변수, 공통 컴포넌트)
├── components/
│   ├── sections/               # 원페이지 섹션 컴포넌트
│   │   ├── HeaderSection.vue
│   │   ├── HeroSection.vue
│   │   ├── ChurchIntroSection.vue
│   │   ├── AboutSection.vue
│   │   ├── ContactSection.vue
│   │   └── FooterSection.vue
│   └── editors/                # 섹션별 편집기
│       ├── HeaderEditor.vue
│       ├── HeroEditor.vue
│       └── ChurchIntroEditor.vue
├── composables/
│   └── useThemeColor.ts        # 테마 컬러 팔레트 생성 및 CSS 변수 적용
├── layouts/
│   ├── default.vue
│   └── admin.vue
├── pages/
│   ├── index.vue               # 에디터 페이지 (메인)
│   └── preview.vue             # 미리보기 페이지
├── stores/
│   └── site.ts                 # Pinia 상태관리
└── types/
    └── site.ts                 # TypeScript 타입 정의
```

## 라이선스

Private
