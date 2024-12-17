'use client';

import { useEffect } from 'react';

import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

import { getBookList } from '@/api/books/books';
import { type BookListResponse } from '@/types/books';
import BookListSkeleton from './BookListSkeleton';
import BookCard from './BookCard/BookCard';
import { queryKeys } from '@/constants/queryKeys';

const BookList = () => {
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  const { data, isError, hasNextPage, fetchNextPage, isFetchingNextPage, isSuccess } =
    useSuspenseInfiniteQuery<BookListResponse>({
      queryKey: [queryKeys.books],
      queryFn: ({ pageParam = 1 }) => getBookList(pageParam as number),
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

  if (isError) return <p className="text-center">책 목록을 불러오지 못했습니다.</p>;

  return (
    <div className="container mx-auto px-4 invisible-scroll">
      <div className="grid grid-cols-2 gap-4">
        {isSuccess
          ? data?.pages.map((page) => page.booklist.map((book) => <BookCard key={book.id} book={book} />))
          : null}
      </div>

      {/* 무한 스크롤 감지 영역 */}
      <div ref={ref} className="h-10 mt-4">
        {isFetchingNextPage ? <BookListSkeleton /> : null}
      </div>
    </div>
  );
};

export default BookList;
