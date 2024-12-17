import { useEffect, useState, useRef } from 'react';
import { useDebounce } from 'use-debounce';

const useSearch = (onSearch: (query: string) => void, delay = 300) => {
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebounce(query, delay);
  const [isLoading, setIsLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null); // 포커스 유지용 ref

  // 디바운싱된 값으로 자동 검색
  useEffect(() => {
    const search = async () => {
      setIsLoading(true);
      try {
        if (debouncedQuery.trim() !== '') {
           onSearch(debouncedQuery.trim());
        } else {
           onSearch('');
        }
      } finally {
        setIsLoading(false);
      }
    };

    search();
  }, [debouncedQuery, onSearch]);

  // 버튼 클릭 시 즉시 검색 실행
  const executeSearch = async () => {
    if (query.trim() !== '') {
      setIsLoading(true);
       onSearch(query.trim());
      setIsLoading(false);
    } else {
       onSearch(''); // 비어있을 때 전체 데이터 요청
    }
  };

  return {
    query,
    setQuery,
    isLoading,
    executeSearch,
    inputRef,
  };
};

export default useSearch;
