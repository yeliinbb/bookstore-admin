'use client';

import { memo, useEffect, useMemo, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getBookList } from '@/api/books/books';
import { type BookListResponse } from '@/types/books';
import Pagination from '../common/Pagination';
import { queryKeys } from '@/constants';
import BookListSkeleton from './BookListSkeleton';
import BookCard from './BookCard/BookCard';
interface BookListProps {
  searchQuery: string;
}

const BookList = memo(({ searchQuery }: BookListProps) => {
  const queryClient = useQueryClient();

  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data, isError, error, isPending } = useQuery<BookListResponse>({
    queryKey: [queryKeys.books, searchQuery, currentPage],
    queryFn: () => getBookList({ page: currentPage as number }),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: [queryKeys.books] }); // 메인 페이지 데이터 강제 새로고침
  }, [queryClient]);

  const filteredBooks = useMemo(() => {
    if (!searchQuery) return data?.booklist || [];
    return (data?.booklist || []).filter(
      (book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery, data]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage((_prev) =>
      Math.max(1, Math.min(newPage, data?.total_pages || 1)),
    );
  };

  return (
    <div className="container invisible-scroll">
      {isError ? <p className="text-red-500">에러: {error?.message}</p> : null}
      {isPending ? (
        <BookListSkeleton />
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book, index) => (
              <BookCard key={book.id} book={book} isPriority={index < 4} />
            ))
          ) : (
            <p className="text-center col-span-2 text-white">
              검색 결과가 없습니다.
            </p>
          )}
        </div>
      )}
      <Pagination
        totalPages={data?.total_pages}
        page={currentPage}
        handlePageChange={handlePageChange}
      />
    </div>
  );
});

BookList.displayName = 'BookList';

export default BookList;
