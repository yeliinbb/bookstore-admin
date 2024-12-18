# Bookstore admin

온라인 서점 어드민 웹 애플리케이션입니다.
책을 검색하고, 상세 정보를 보고 편집하며, 각 책의 판매수량을 확인할 수 있습니다.

## 🔧 기술 스택

#### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- clsx (Tailwind 클래스 병합)

#### Backend

- JSON Server (Mock 데이터베이스)
- RESTful API

#### State Management

- TanStack Query (React Query)

## 🌟 주요 기능

### 1. 프론트엔드

#### 책 목록 페이지 (/)

기능:

- 페이지네이션: 한 페이지당 10개 항목 표시
- 검색 기능: 제목과 저자로 필터링

기술:

- React Query를 사용한 데이터 비동기 조회
- Pagination과 검색 기능 로직 구현

#### 책 상세 정보 페이지 (/books/[id])

기능:

- 책의 상세 정보를 조회
- 책 수정/삭제 기능 제공

상세:

- 수정 모드: 입력 폼과 이미지 업로드 기능 제공
- 삭제 기능: 삭제 시 메인 페이지로 이동

#### 책 추가 페이지 (/books/add)

기능:

- 새 책 등록 기능 제공
- 이미지 업로드 및 미리보기 기능

#### 공통 컴포넌트

- BookImage: 이미지 렌더링 및 업로드 기능 (디폴트 이미지 지원)
- BookTitle, BookAuthor, BookQuantity, BookDescription: 조건부 렌더링 적용
- Button: 재사용 가능한 버튼 컴포넌트
- BookFormLayout: Add와 Edit 모드를 지원하는 공통 레이아웃

### 2. 백엔드

#### RESTful API 설계 및 구현

- GET /api/books: 책 목록 조회 (페이지네이션 적용)
- GET /api/books/:id: 특정 책 상세 조회
- POST /api/books: 새 책 추가
- PUT /api/books/:id: 책 정보 수정
- DELETE /api/books/:id: 책 삭제

#### Mock 데이터베이스

JSON Server를 사용한 데이터 저장 및 조회

## 🛠️ 구조 및 리팩토링 요약

- useBookForm 훅:
  책 추가 및 수정 모드에서 상태 관리를 통합
  formData, previewImage 상태 관리 및 handleChange, handleImageChange 함수 제공

- BookFormLayoutButtons:
  버튼 로직 분리 및 add와 edit 모드 조건부 처리
  Tailwind 클래스 병합을 위해 clsx 도입
- 디폴트 이미지 지원:
  이미지가 없을 경우 기본 이미지 (/images/default-book.webp) 제공
- 컴포넌트 재사용성 강화:
  중복된 렌더링 로직 제거
  Add와 Edit 모드에서 동일한 컴포넌트를 사용하도록 리팩토링

## 📂 디렉토리 구조

```bash
📦 src
 ┣ 📂 api                 # API 호출 함수
 ┃ ┗ 📜 books.ts          # 책 관련 API
 ┃ ┣ 📜 client.ts         # API 요청을 위한 공통 클라이언트
 ┣ 📂 components          # UI 컴포넌트
 ┃ ┣ 📂 books             # 책 관련 컴포넌트
 ┃ ┃ ┣ 📜 BookForm.tsx       # 책 추가/수정 폼
 ┃ ┃ ┣ 📜 BookDetail.tsx     # 책 상세 정보
 ┃ ┃ ┣ 📜 BookList.tsx       # 책 목록 리스트
 ┃ ┃ ┗ 📜 BookCard.tsx       # 책 개별 카드
 ┃ ┣ 📂 common            # 공통 컴포넌트
 ┃ ┃ ┣ 📜 Button.tsx         # 버튼
 ┃ ┃ ┣ 📜 BackButton.tsx     # 뒤로가기 버튼
 ┃ ┃ ┗ 📂 Input             # 입력 관련 컴포넌트
 ┃ ┃   ┣ 📜 BaseInput.tsx    # 기본 인풋
 ┃ ┃   ┗ 📜 TextArea.tsx     # 텍스트 에어리어
 ┃ ┗ 📂 layout            # 레이아웃 관련 컴포넌트
 ┃   ┗ 📜 Layout.tsx
 ┣ 📂 hooks               # 커스텀 훅
 ┃ ┣ 📜 useBookActions.ts   # 책 CRUD 관련 훅
 ┃ ┣ 📜 useBookForm.ts      # 책 폼 관리 훅
 ┃ ┗ 📜 useSearch.ts        # 검색 기능 훅
 ┣ 📂 constants           # 상수 관리
 ┃ ┣ 📜 queryKeys.ts        # 쿼리 키 관리
 ┃ ┗ 📜 apiConfig.ts        # API 설정
 ┣ 📂 styles              # 전역 스타일
 ┃ ┗ 📜 globals.css
 ┣ 📂 types               # 타입 정의
 ┃ ┗ 📜 books.d.ts          # 책 관련 타입
 ┣ 📂 app                 # 페이지 라우팅
 ┃ ┣ 📂 books
 ┃ ┃ ┣ 📜 page.tsx          # 책 목록 페이지
 ┃ ┃ ┗ 📂 [id]             # 책 상세 페이지
 ┃ ┃   ┗ 📜 page.tsx
 ┃ ┗ 📂 book-add
 ┃   ┗ 📜 page.tsx          # 책 추가 페이지
 ┗ 📜 .eslintrc.json      # ESLint 설정
 ┗ 📜 .gitignore          # Git 무시 설정
 ┗ 📜 env.local           # 환경변수 설정

```

## 💡 추가 고려사항

- 상태 관리 : React Query를 통해 서버 데이터와 클라이언트 데이터를 동기화.

- 에러 핸들링 : API 호출 실패 시 알림창을 통해 사용자에게 오류 표시.

- 확장성 : 공통 컴포넌트 및 훅을 사용해 추가적인 기능 구현이 용이하도록 설계.

## 📌 주요 업데이트 요약

- 프론트엔드: 코드 리팩토링, 컴포넌트 재사용성 강화.
- 백엔드: RESTful API 설계 및 JSON Server 연동.
- UI/UX: Tailwind CSS 적용 및 조건부 렌더링 최적화.

## 🚀 실행 방법

### 사전 요구사항

- Node.js 18.0.0 이상
- npm

### 설치 방법

1. 저장소를 클론합니다.
2. 의존성 설치 : npm install
3. 개발 서버 실행 : npm run dev
4. 개발 서버 접속
