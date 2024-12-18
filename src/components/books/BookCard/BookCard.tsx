import Link from 'next/link';

import { Book } from '@/types/books';
import BookImage from './BookImage';
import BookTitle from './BookTitle';
import BookQuantity from './BookQuantity';
import BookAuthor from './BookAuthor';
import BookDescription from './BookDescription';

interface MovieCardProps {
  book: Book;
}
const BookCard = ({ book }: MovieCardProps) => {
  if (!book) return null;

  return (
    <Link
      href={`/${book.id}`}
      className="flex gap-2 p-4 rounded-xl bg-gray-800 hover:bg-gray-700 transition-colors"
    >
      <BookImage src={book.image} alt={book.title} isEditing={false} />
      <div className="flex flex-col justify-between">
        <div>
          <BookTitle id={book.id} title={book.title} />
          <BookQuantity quantity={book.quantity} />
        </div>
        <div className="flex-0">
          <BookAuthor author={book.author} />
          <BookDescription description={book.description} />
        </div>
      </div>
    </Link>
  );
};

export default BookCard;
