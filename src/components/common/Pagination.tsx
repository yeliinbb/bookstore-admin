import Button from './Button';

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
  return (
    <div className="flex justify-center mt-5 text-white gap-1">
      <Button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
        prev
      </Button>
      {[...Array(totalPages)].map((_, index) => (
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
        disabled={page === totalPages}
      >
        next
      </Button>
    </div>
  );
};

export default Pagination;
