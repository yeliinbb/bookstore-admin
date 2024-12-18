import { deleteBook, getBookDetail, updateBook } from '@/api/books/books';
import { queryKeys } from '@/constants';
import { Book } from '@/types/books';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

interface useBookDetailProps {
  bookId: Book['id'];
}

interface MutationContext {
  previousBook: Partial<Book> | undefined;
}

const useBookDetail = ({ bookId }: useBookDetailProps) => {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: [queryKeys.books, bookId],
    queryFn: () => getBookDetail(bookId),
  });

  // 책 내용 수정 옵티미스틱 업데이트 적용
  const editMutation = useMutation<Book, Error, Partial<Book>, MutationContext>(
    {
      mutationFn: (updatedData: Partial<Book>) =>
        updateBook(bookId, updatedData),
      onMutate: async (updatedData) => {
        await queryClient.cancelQueries({
          queryKey: [queryKeys.books, bookId],
        });

        const previousBook = queryClient.getQueryData<Partial<Book>>([
          queryKeys.books,
          bookId,
        ]);

        queryClient.setQueryData([queryKeys.books, bookId], {
          ...previousBook,
          ...updatedData,
        });

        return { previousBook };
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [queryKeys.books, bookId] });
      },
      onError: (_err, _updatedData, context) => {
        if (context?.previousBook) {
          queryClient.setQueryData(
            [queryKeys.books, bookId],
            context.previousBook,
          );
        }
      },
    },
  );

  const deleteMutation = useMutation({
    mutationFn: () => deleteBook(bookId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.books] });
    },
  });

  return {
    book: data,
    handleEditBook: editMutation.mutate,
    handleDeleteBook: deleteMutation.mutate,
  };
};

export default useBookDetail;
