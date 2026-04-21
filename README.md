# 원페이지 템플릿 빌더

교회 홈페이지 전용 원페이지(One-Page) 템플릿 빌더. 섹션 단위로 콘텐츠/이미지/색상/스타일을 편집해 랜딩페이지를 완성할 수 있습니다.

## 기술 스택

- **프레임워크**: Nuxt 3
- **언어**: TypeScript
- **상태관리**: Pinia
- **스타일링**: 순수 CSS + CSS Custom Properties
- **아이콘**: nuxt-icon (Iconify/MDI)
- **드래그앤드롭**: vue-draggable-plus

## 실행 방법

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # 프로덕션 빌드
```

- 에디터: `http://localhost:3000`
- 미리보기: `http://localhost:3000/preview`

## 주요 기능

### 전역 설정
- 교회 이름 입력 (푸터 copyright에 자동 반영)
- 메인 컬러 선택 (HSL 팔레트 자동 생성)
- 섹션별 배경색 설정 (프리셋 + 커스텀)

### 섹션별 편집

| 섹션 | 주요 편집 항목 |
|------|---------------|
| 헤더 | 로고, 로그인, 상단 고정 |
| 히어로 | 배경 이미지 업로드/딤/텍스트(흰·검)/버튼(테마·커스텀·글자색) |
| 교회소개 | 카드/아이콘/미니멀 스타일, 그림자(프리셋+방향+커스텀), 아이콘 색 |
| 예배안내 | 아이콘+텍스트 가로 배치, 컬럼/배경/아이콘 색 |
| 게시판 | 주보 카드(배경/딤/아이콘·제목 색/더보기 버튼) |
| 새가족안내 | STEP 카드(라벨/제목/부제목/설명/버튼 색) |
| 교회학교 | 좌 텍스트+우 이미지 카드(이미지 업로드/버튼 커스텀) |
| 갤러리 | 이미지 다중 업로드, 그리드+모달 뷰어 |
| 지도 | 주소 입력 → Google Maps embed 자동 |
| 푸터 | 주소, 소셜 아이콘(테마·커스텀) |

### 공통
- **IconPicker** — 100+개 MDI 아이콘, 7개 카테고리, 검색
- **이미지 업로드** — 파일 첨부(Base64) 또는 URL 직접 입력
- **딤 처리** — 토글 + 0~100% 불투명도
- **색상 선택** — 테마 컬러 / 직접 선택 2모드

## 프로젝트 구조

```
onepage_builder/
├── CLAUDE.md                     # Claude Code 가이드 (상세)
├── DESIGN.md                     # 설계 문서
├── PROGRESS.md                   # 개발 진행 상황
│
├── assets/css/main.css           # 글로벌 CSS 변수 + 공통 스타일
├── components/
│   ├── sections/                 # 섹션 10종 (Header~Footer)
│   └── editors/                  # 편집기 10종 + IconPicker
├── composables/useThemeColor.ts  # 테마 팔레트 생성
├── layouts/                      # default, admin
├── pages/                        # index (에디터), preview
├── stores/site.ts                # Pinia 상태관리
└── types/site.ts                 # TypeScript 타입
```

## 라이선스

Private
