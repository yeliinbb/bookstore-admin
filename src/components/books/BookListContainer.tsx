'use client';

import { useCallback, useState } from 'react';

import SearchForm from '../common/SearchForm';
import BookList from './BookList';
import Button from '../common/Button';
import { useRouter } from 'next/navigation';

const BookListContainer = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const router = useRouter();

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  return (
    <div className="container flex flex-col gap-4 px-4 mx-auto invisible-scroll">
      <Button
        onClick={() => router.push('/book-add')}
        className="max-w-fit bg-blue-700 hover:bg-blue-600"
      >
        책 추가하기
      </Button>
      <SearchForm onSearch={handleSearch} />
      <BookList searchQuery={searchQuery} />
    </div>
  );
};

export default BookListContainer;
