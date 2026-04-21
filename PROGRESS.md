# 원페이지 빌더 개발 진행 상황

## 프로젝트 개요

교회 홈페이지 전용 원페이지(One-Page) 빌더. 섹션 단위로 콘텐츠/이미지/색상/스타일을 편집하여 완성할 수 있는 도구.

## 기술 스택

| 영역 | 기술 | 버전 |
|------|------|------|
| 프레임워크 | Nuxt 3 | 3.20.2 |
| 언어 | TypeScript | 5.x |
| 상태관리 | Pinia | 2.x |
| 스타일링 | 순수 CSS (CSS Custom Properties) | - |
| 아이콘 | nuxt-icon (Iconify) | 0.6.10 |
| 드래그앤드롭 | vue-draggable-plus | 0.5.x |

## 완료된 작업

### 1. 프로젝트 기반

| 항목 | 상태 |
|------|------|
| Nuxt 3 + TypeScript + Pinia 설정 | 완료 |
| GitHub 원격 저장소 연결 | 완료 |
| Tailwind CSS → 순수 CSS 전환 | 완료 |
| CSS Custom Properties 디자인 시스템 | 완료 |
| 공통 섹션 헤더 (`.section-header`, `.section-divider`) | 완료 |

### 2. 전역 설정

| 항목 | 상태 |
|------|------|
| 메인 컬러 (HSL 팔레트 자동 생성) | 완료 |
| 교회 이름 입력 (사이드바 최상단, 푸터에 반영) | 완료 |
| 섹션별 배경색 (프리셋 + 커스텀) | 완료 |

### 3. 에디터 레이아웃

| 항목 | 상태 |
|------|------|
| 3단 레이아웃 (사이드바 / 미리보기 / 편집패널) | 완료 |
| 템플릿 선택 화면 | 완료 |
| 섹션 On/Off, 드래그 순서 변경 | 완료 |

### 4. 섹션 + 편집기 (10종)

| 섹션 | 주요 편집 항목 | 상태 |
|------|---------------|------|
| 헤더 | 로고, 로그인, 상단 고정 | 완료 |
| 히어로 | 배경(파일/URL), 딤, 텍스트(흰/검), 버튼(테마·커스텀+글자색), 정렬, 높이 | 완료 |
| 교회소개 | 카드/아이콘/미니멀 스타일, 그림자(프리셋+방향+커스텀), 아이콘 색, 항목 관리 | 완료 |
| 예배안내 | 아이콘+텍스트 가로 배치, 컬럼 수, 배경/아이콘 색 | 완료 |
| 게시판 | 주보 카드(배경/딤/제목색/아이콘색/더보기 버튼) | 완료 |
| 새가족안내 | STEP 카드(라벨/제목/부제목/설명/버튼 색 커스텀) | 완료 |
| 교회학교 | 좌 텍스트+우 이미지 카드, 이미지 업로드, 버튼 커스텀 | 완료 |
| 갤러리 | 이미지 다중 업로드, 그리드+모달 뷰어 | 완료 |
| 지도 | 주소 입력 → Google Maps embed 자동 표시 | 완료 |
| 푸터 | 주소, 교회이름 기반 copyright, 소셜 아이콘(테마·커스텀) | 완료 |

### 5. 공통 컴포넌트

| 컴포넌트 | 설명 | 상태 |
|----------|------|------|
| IconPicker | 100+개 MDI 아이콘, 카테고리 7종, 검색 | 완료 |

### 6. 데이터 관리

| 항목 | 상태 |
|------|------|
| Pinia store | 완료 |
| localStorage 저장/불러오기 | 완료 |
| 데이터 마이그레이션 (기존 데이터 호환) | 완료 |

## 현재 파일 구조

```
onepage_builder/
├── CLAUDE.md                     # Claude Code 가이드
├── DESIGN.md                     # 설계 문서
├── PROGRESS.md                   # 이 문서
├── README.md
│
├── assets/css/main.css           # 글로벌 CSS 변수 + 공통 스타일
│
├── components/
│   ├── sections/                 # 10개
│   │   ├── HeaderSection.vue
│   │   ├── HeroSection.vue
│   │   ├── ChurchIntroSection.vue
│   │   ├── WorshipInfoSection.vue
│   │   ├── BoardSection.vue
│   │   ├── NewFamilyInfoSection.vue
│   │   ├── YouthSection.vue
│   │   ├── GallerySection.vue
│   │   ├── MapSection.vue
│   │   └── FooterSection.vue
│   │
│   └── editors/                  # 10개 (IconPicker 포함)
│       ├── HeaderEditor.vue
│       ├── HeroEditor.vue
│       ├── ChurchIntroEditor.vue
│       ├── WorshipInfoEditor.vue
│       ├── BoardEditor.vue
│       ├── NewFamilyInfoEditor.vue
│       ├── YouthEditor.vue
│       ├── GalleryEditor.vue
│       ├── MapEditor.vue
│       ├── FooterEditor.vue
│       └── IconPicker.vue
│
├── composables/useThemeColor.ts
├── layouts/ (default, admin)
├── pages/ (index, preview)
├── stores/site.ts
└── types/site.ts
```

## 실행 방법

```bash
npm install
npm run dev   # http://localhost:3000
```

## 남은 작업 (TODO)

### Phase 1: 저장/발행

| 항목 | 상태 |
|------|------|
| 저장 버튼 기능 연결 | 미완료 |
| 미리보기 버튼 → `/preview` 연결 | 미완료 |

### Phase 2: 고급 기능

| 항목 | 상태 |
|------|------|
| 폰트 변경 | 미완료 |
| GSAP 스크롤 애니메이션 | 미완료 |
| 반응형 미리보기 (모바일/태블릿) | 미완료 |

### Phase 3: 백엔드

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
| 2025-01-16 | 프로젝트 초기 설정 |
| 2026-04-16 | Tailwind → 순수 CSS 전환 |
| 2026-04-16 | 메인 컬러 동적 팔레트 시스템 |
| 2026-04-16 | HeaderEditor, HeroEditor (배경/딤/텍스트/버튼) |
| 2026-04-16 | ChurchIntroEditor (카드배경/그림자/아이콘색) |
| 2026-04-16 | IconPicker 공통 컴포넌트 |
| 2026-04-16 | WorshipInfoSection + Editor (예배안내) |
| 2026-04-16 | 공통 섹션 헤더/구분선 |
| 2026-04-16 | 섹션별 배경색 설정 |
| 2026-04-17 | 섹션 구성 재편 (board/newfamilyInfo/youth/gallery/map/footer) |
| 2026-04-17 | BoardSection + Editor (주보 카드형, 배경/딤/아이콘색/더보기) |
| 2026-04-17 | NewFamilyInfoSection + Editor (STEP 카드, 버튼 색 커스텀) |
| 2026-04-17 | YouthSection + Editor (좌 텍스트+우 이미지 카드) |
| 2026-04-17 | GallerySection + Editor (그리드 + 모달 뷰어, 다중 업로드) |
| 2026-04-17 | MapSection + Editor (주소 → Google Maps embed 자동) |
| 2026-04-17 | FooterSection + Editor 재구성 |
| 2026-04-17 | 사이드바에 교회 이름 입력 영역 추가 (GlobalSettings.churchName) |
| 2026-04-17 | CLAUDE.md 작성 |
