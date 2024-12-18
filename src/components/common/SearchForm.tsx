'use client';

import SearchInput from './Input/SearchInput';
import Button from './Button';
import { useSearch } from '@/hooks';
import { useEffect, memo } from 'react';

interface SearchHeaderProps {
  onSearch: (query: string) => void;
}

const SearchForm = memo(({ onSearch }: SearchHeaderProps) => {
  const { query, setQuery, executeSearch, inputRef, isLoading } =
    useSearch(onSearch);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus(); // 페이지 렌더링 시 포커스 설정
    }
  }, [inputRef]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 기본 동작 방지
    executeSearch();
  };

  return (
    <form
      onSubmit={handleOnSubmit}
      className="flex gap-4 p-4 bg-gray-800 items-center rounded-xl"
    >
      <SearchInput
        type="text"
        ref={inputRef}
        placeholder="제목 또는 저자로 검색"
        value={query}
        onChange={handleOnChange}
      />
      {isLoading ? <span className="text-blue-500">로딩 중...</span> : null}
      <Button
        onClick={executeSearch}
        disabled={isLoading}
        className="bg-slate-500 hover:bg-slate-400"
      >
        검색
      </Button>
    </form>
  );
});

SearchForm.displayName = 'SearchForm';

export default SearchForm;
