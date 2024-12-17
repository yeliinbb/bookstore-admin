import { Suspense, lazy } from 'react';

// 동적 임포트를 통한 지연 로딩
const BookList = lazy(() => import('@/components/books/BookList'));
const BookListSkeleton = lazy(() => import('@/components/books/BookListSkeleton'));

const MainBookListPage = () => {
  return (
    <Suspense fallback={<BookListSkeleton />}>
      <BookList />
    </Suspense>
  );
};

export default MainBookListPage;
