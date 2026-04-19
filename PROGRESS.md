# 원페이지 빌더 개발 진행 상황

## 프로젝트 개요

원페이지(One-Page) 전용 템플릿 빌더. 교회 홈페이지용 원페이지를 섹션 단위로 구성하고, 텍스트/이미지/스타일을 편집하여 완성할 수 있는 도구.

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

### 1. 프로젝트 기반

| 항목 | 상태 |
|------|------|
| Nuxt 3 + TypeScript + Pinia 설정 | 완료 |
| GitHub 원격 저장소 연결 | 완료 |
| Tailwind CSS → 순수 CSS 전환 | 완료 |
| CSS Custom Properties 디자인 시스템 | 완료 |
| 공통 섹션 헤더 (`.section-header`, `.section-divider`) | 완료 |

### 2. 메인 컬러 시스템

| 항목 | 상태 |
|------|------|
| `useThemeColor` composable | 완료 |
| HSL 기반 팔레트 생성 (선택 색 = 500 기준) | 완료 |
| 어두운/채도 낮은 색 보정 | 완료 |
| CSS 변수 실시간 업데이트 | 완료 |
| 사이드바 컬러피커 + 팔레트 미리보기 | 완료 |

### 3. 에디터 레이아웃

| 항목 | 상태 |
|------|------|
| 3단 레이아웃 (사이드바 / 미리보기 / 편집패널) | 완료 |
| 템플릿 선택 화면 (Type 1~3) | 완료 |
| 섹션 On/Off 토글 | 완료 |
| 섹션 순서 변경 (vue-draggable-plus) | 완료 |
| 섹션 선택 시 하이라이트 | 완료 |
| 섹션별 배경색 설정 (프리셋 3종 + 커스텀, 헤더/히어로 제외) | 완료 |

### 4. 섹션 구성

| 섹션 | 파일 | 설명 | 상태 |
|------|------|------|------|
| 헤더 | HeaderSection.vue | 네비게이션, 모바일 메뉴, 로그인 | 완료 |
| 히어로 | HeroSection.vue | 배경 이미지/딤, 텍스트/버튼 커스텀 | 완료 |
| 교회소개 | ChurchIntroSection.vue | 카드/아이콘/미니멀 스타일, 그림자, 아이콘 색 | 완료 |
| 예배안내 | WorshipInfoSection.vue | 아이콘+텍스트 가로 배치 | 완료 |
| 게시판 | BoardSection.vue | 주보형 카드 3개, 배경 이미지/딤/아이콘색/더보기 버튼 | 완료 |
| 새가족안내 | NewFamilyInfoSection.vue | STEP 카드, 각 카드 버튼 색 커스텀 | 완료 |
| 교회학교 | YouthSection.vue | 좌측 텍스트+우측 이미지 카드, 부서별 버튼 | 완료 |
| 갤러리 | GallerySection.vue | 이미지 그리드, 클릭 시 모달 뷰어 (좌/우/ESC) | 완료 |
| 지도 | MapSection.vue | 주소/전화 + 지도 embed | 완료 |
| 푸터 | FooterSection.vue | 저작권, 링크, 소셜 | 완료 |

### 5. 편집기

| 편집기 | 편집 가능 항목 | 상태 |
|--------|---------------|------|
| HeaderEditor | 로고, 로그인, 상단 고정 | 완료 |
| HeroEditor | 배경(파일/URL), 딤, 텍스트(흰/검), 버튼(테마/커스텀+글자색), 정렬, 높이 | 완료 |
| ChurchIntroEditor | 제목/구분선, 레이아웃, 카드 배경/그림자(프리셋+방향+커스텀), 아이콘 색(테마/커스텀), 항목 관리 | 완료 |
| WorshipInfoEditor | 제목/구분선, 컬럼 수, 배경색, 아이콘 색(테마/커스텀), 항목 관리 | 완료 |
| BoardEditor | 배경(파일/URL), 딤, 제목 색(흰/검), 아이콘 색(테마/커스텀), 게시글, 더보기 버튼 | 완료 |
| NewFamilyInfoEditor | 제목/구분선, 컬럼 수, STEP 편집(라벨/제목/부제목/설명/버튼 테마·커스텀·글자색) | 완료 |
| YouthEditor | 제목/구분선, 컬럼 수, 부서 편집(이름/설명/이미지 업로드/버튼 테마·커스텀) | 완료 |
| GalleryEditor | 제목/구분선, 컬럼 수, 이미지 다중 업로드/URL 추가/삭제 | 완료 |

### 6. 공통 컴포넌트

| 컴포넌트 | 설명 | 상태 |
|----------|------|------|
| IconPicker | 아이콘 선택 UI (카테고리 7종, 100+개 아이콘, 검색) | 완료 |

### 7. 데이터 관리

| 항목 | 상태 |
|------|------|
| Pinia store | 완료 |
| localStorage 저장/불러오기 | 완료 |
| 데이터 마이그레이션 (기존 데이터 호환) | 완료 |

## 현재 파일 구조

```
onepage_builder/
├── assets/css/main.css           # 글로벌 CSS (변수, 공통 스타일)
│
├── components/
│   ├── sections/
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
│   └── editors/
│       ├── HeaderEditor.vue
│       ├── HeroEditor.vue
│       ├── ChurchIntroEditor.vue
│       ├── WorshipInfoEditor.vue
│       ├── BoardEditor.vue
│       ├── NewFamilyInfoEditor.vue
│       ├── YouthEditor.vue
│       ├── GalleryEditor.vue
│       └── IconPicker.vue
│
├── composables/
│   └── useThemeColor.ts
│
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

### Phase 1: 나머지 편집기

| 항목 | 상태 |
|------|------|
| MapEditor (지도 편집) | 미완료 |
| FooterEditor (푸터 편집) | 미완료 |
| 저장 버튼 기능 연결 | 미완료 |
| 미리보기 버튼 → `/preview` 연결 | 미완료 |

### Phase 2: 고급 기능

| 항목 | 상태 |
|------|------|
| 폰트 변경 | 미완료 |
| GSAP 스크롤 애니메이션 | 미완료 |
| 반응형 미리보기 (모바일/태블릿) | 미완료 |

### Phase 3: 백엔드 연동

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
| 2025-01-16 | 프로젝트 초기 설정, 에디터 페이지 |
| 2025-01-21 | HeaderEditor, HeroEditor 구현 |
| 2026-04-16 | Tailwind CSS → 순수 CSS 전환 |
| 2026-04-16 | 메인 컬러 시스템 (useThemeColor, 동적 팔레트) |
| 2026-04-16 | 히어로: 배경 업로드, 딤, 텍스트색, 버튼 테마/커스텀 + 글자색 |
| 2026-04-16 | ChurchIntroEditor (아이콘색, 카드배경, 그림자 프리셋+방향+커스텀) |
| 2026-04-16 | IconPicker 공통 컴포넌트 (카테고리별 100+개 아이콘) |
| 2026-04-16 | about → worshipInfo 리네이밍, 예배안내 디자인 구현 |
| 2026-04-16 | 공통 섹션 헤더/구분선 (section-header, section-divider) |
| 2026-04-16 | 섹션별 배경색 설정 (프리셋 + 커스텀, 헤더/히어로 제외) |
| 2026-04-17 | 섹션 구성 재편: board/newfamilyInfo/youth/gallery/map/footer |
| 2026-04-17 | 게시판(카드형, 배경/딤/아이콘색/더보기) 구현 |
| 2026-04-17 | 새가족안내 STEP 카드 (라벨/제목/부제목/설명/버튼 색 커스텀) |
| 2026-04-17 | 교회학교 (좌측 텍스트 + 우측 이미지, 버튼 커스텀) |
| 2026-04-17 | 갤러리 (그리드 + 모달 뷰어, 다중 이미지 업로드) |
| 2026-04-17 | 지도 (주소/전화 + embed URL) |
