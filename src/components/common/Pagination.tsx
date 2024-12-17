'use client';

import Button from './Button';
import { useEffect, useState } from 'react';
interface PaginationProps {
  totalPages: number | undefined;
  page: number;
  handlePageChange: (newPage: number) => void;
}

const Pagination = ({
  totalPages,
  page,
  handlePageChange,
}: PaginationProps) => {
  const [localTotalPages, setLocalTotalPages] = useState<number>(0);

  useEffect(() => {
    // totalPages 값이 업데이트될 때 상태를 동기화
    if (totalPages) {
      setLocalTotalPages(totalPages);
    }
  }, [totalPages]);

  return (
    <div className="flex justify-center mt-5 text-white gap-1">
      <Button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
        prev
      </Button>
      {[...Array(localTotalPages)].map((_, index) => (
        <Button
          key={index + 1}
          onClick={() => handlePageChange(index + 1)}
          className={`${page === index + 1 ? 'font-bold' : 'font-normal'}`}
        >
          {index + 1}
        </Button>
      ))}
      <Button
        onClick={() => handlePageChange(page + 1)}
        disabled={page === localTotalPages}
      >
        next
      </Button>
    </div>
  );
};

export default Pagination;
