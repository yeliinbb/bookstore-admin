'use client';

import { memo, useEffect } from 'react';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

import { getBookList } from '@/api/books/books';
import { type BookListResponse } from '@/types/books';
import BookListSkeleton from './BookListSkeleton';
import { queryKeys } from '@/constants/queryKeys';
import BookCard from './BookCard';
interface BookListProps {
  searchQuery: string;
}

const BookList = memo(({ searchQuery }: BookListProps) => {
  console.log('BookList 렌더링');

  const { ref, inView } = useInView({ threshold: 0.5 });

  const {
    data,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isPending,
  } = useSuspenseInfiniteQuery<BookListResponse>({
    queryKey: [queryKeys.books, searchQuery],
    queryFn: ({ pageParam = 1 }) =>
      getBookList({ page: pageParam as number, query: searchQuery }),
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.current_page + 1;
      return nextPage <= lastPage.total_pages ? nextPage : undefined;
    },
    initialPageParam: 1,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="container invisible-scroll">
      {isError ? <p className="text-red-500">에러: {error?.message}</p> : null}
      {isPending ? (
        <BookListSkeleton />
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {data?.pages.flatMap((page) => page.booklist).length > 0 ? (
            data?.pages.flatMap((page) =>
              page.booklist.map((book) => (
                <BookCard key={book.id} book={book} />
              )),
            )
          ) : (
            <p className="text-center col-span-2 text-white">
              검색 결과가 없습니다.
            </p>
          )}
        </div>
      )}

      {/* 무한 스크롤 감지 영역 */}
      <div ref={ref} className="h-10 mt-4">
        {isFetchingNextPage ? <BookListSkeleton /> : null}
      </div>
    </div>
  );
});

export default BookList;
