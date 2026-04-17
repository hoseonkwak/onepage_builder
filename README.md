# 원페이지 템플릿 빌더

원페이지(One-Page) 전용 템플릿 빌더입니다. 미리 정의된 템플릿에서 섹션 순서를 변경하고, 텍스트와 이미지를 교체하여 랜딩페이지를 완성할 수 있습니다.

## 기술 스택

- **프레임워크**: Nuxt 3
- **언어**: TypeScript
- **상태관리**: Pinia
- **스타일링**: 순수 CSS (CSS Custom Properties 기반 디자인 시스템)
- **아이콘**: nuxt-icon (Iconify)
- **드래그앤드롭**: vue-draggable-plus

## 실행 방법

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build
```

- 에디터: http://localhost:3000
- 미리보기: http://localhost:3000/preview

## 프로젝트 구조

```
onepage_builder/
├── assets/css/main.css           # 글로벌 CSS 변수 + 공통 스타일
├── components/
│   ├── sections/                 # 섹션 컴포넌트 (Header, Hero, ChurchIntro, WorshipInfo, Contact, Footer)
│   └── editors/                  # 편집기 (Header, Hero, ChurchIntro, WorshipInfo, IconPicker)
├── composables/useThemeColor.ts  # 테마 컬러 팔레트 생성
├── layouts/                      # default, admin 레이아웃
├── pages/                        # index (에디터), preview (미리보기)
├── stores/site.ts                # Pinia 상태관리
└── types/site.ts                 # TypeScript 타입
```

## 주요 기능

- 메인 컬러 설정 (HSL 기반 팔레트 자동 생성)
- 섹션 On/Off 토글 + 드래그앤드롭 순서 변경
- 섹션별 배경색 설정 (프리셋 + 커스텀)
- 히어로: 배경 이미지 업로드, 딤 처리, 텍스트/버튼 커스텀
- 교회소개: 카드/아이콘/미니멀 스타일, 그림자 설정
- 예배안내: 아이콘+텍스트 가로 배치
- IconPicker: 100+개 아이콘 카테고리별 선택

## 라이선스

Private
