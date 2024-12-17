import Link from 'next/link';

import { Book } from '@/types/books';
import ResponsiveImage from '@/components/common/ResponsiveImage';

interface MovieCardProps {
  book: Book;
}
const BookCard = ({ book }: MovieCardProps) => {
  if (!book) return null;

  return (
    <Link href={`/${book.id}`} className="flex gap-2 p-4 rounded-xl bg-gray-800 hover:bg-gray-700 transition-colors">
      <div className="relative w-[300px] h-[300px] min-w-[200px] rounded-md overflow-hidden">
        <ResponsiveImage src={book.image} alt={book.title} />
      </div>
      <div className="flex flex-col justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">
            {book.id}. {book.title}
          </h1>
          <h5 className="text-base font-medium text-white">quantity : {book.quantity}</h5>
        </div>
        <div className="flex-0">
          <h3 className="text-xl font-medium text-white">{book.author}</h3>
          <p className="text-base font-medium text-white">{book.description}</p>
        </div>
      </div>
    </Link>
  );
};

export default BookCard;
