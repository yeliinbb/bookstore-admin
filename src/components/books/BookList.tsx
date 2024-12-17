'use client';

import { memo, useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getBookList } from '@/api/books/books';
import { type BookListResponse } from '@/types/books';
import BookListSkeleton from './BookListSkeleton';
import { queryKeys } from '@/constants/queryKeys';
import BookCard from './BookCard';
import Pagination from '../common/Pagination';
interface BookListProps {
  searchQuery: string;
}

const BookList = memo(({ searchQuery }: BookListProps) => {
  console.log('BookList 렌더링');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data, isError, error, isPending, isSuccess } =
    useQuery<BookListResponse>({
      queryKey: [queryKeys.books, searchQuery, currentPage],
      queryFn: () =>getBookList({ page: currentPage as number }),
      staleTime: 1000 * 60 * 5,
    });

  if (isSuccess) {
    console.log('data', data);
  }

  const filteredBooks = useMemo(() => {
    if (!searchQuery) return data?.booklist || [];
    return (data?.booklist || []).filter(
      (book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery, data]);

    const handlePageChange = (newPage: number) => {
      setCurrentPage((prev) =>
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
            filteredBooks.map((book) => <BookCard key={book.id} book={book} />)
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

export default BookList;
