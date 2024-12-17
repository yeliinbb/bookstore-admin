'use client';

import { useCallback, useState } from 'react';

import SearchForm from '../common/SearchForm';
import BookList from './BookList';

const BookListContainer = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  return (
    <div className="container flex flex-col gap-4 px-4 mx-auto invisible-scroll">
      <SearchForm onSearch={handleSearch} />
      <BookList searchQuery={searchQuery} />
    </div>
  );
};

export default BookListContainer;
