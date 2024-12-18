import BookDetail from '@/components/bookDetail/BookDetail';

const BookPage = ({ params }: { params: { id: string } }) => {
  return <BookDetail bookId={Number(params.id)} />;
};

export default BookPage;
