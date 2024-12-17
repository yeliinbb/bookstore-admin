'use client';

import { getBookDetail } from '@/api/books/books';
import { useQuery } from '@tanstack/react-query';
import ResponsiveImage from '../common/ResponsiveImage';
import Button from '../common/Button';
import { useRouter } from 'next/navigation';

interface BookDetailProps {
  bookId: string;
}

const BookDetail = ({ bookId }: BookDetailProps) => {
  const router = useRouter();
  const { data: book } = useQuery({
    queryKey: ['movieDetail', bookId],
    queryFn: () => getBookDetail(bookId),
  });

  if (!book) {
    return <p className="text-center text-white">책 정보를 불러오는 중...</p>;
  }

  return (
    <div className="container mx-auto p-8 text-white">
      {/* 뒤로 가기 버튼 */}
      <div className="mb-4">
        <Button
          onClick={() => router.push('/')}
          className="bg-gray-600 hover:bg-gray-400"
        >
          뒤로가기
        </Button>
      </div>

      <div className="w-full flex flex-col md:flex-row gap-8">
        {/* 이미지 */}
        <div className="relative w-[300px] h-[380px] min-w-[250px] rounded-md overflow-hidden">
          <ResponsiveImage
            src={book.image}
            alt={book.title}
            className="object-cover"
          />
        </div>

        {/* 상세 정보 */}
        <div className="flex flex-col gap-4 justify-between">
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl font-bold">
              {book.id}. {book.title}
            </h1>
            <h3 className="text-2xl font-semibold">{book.author}</h3>
            <p className="text-lg">quantity : {book.quantity}</p>
            <p className="text-base leading-relaxed">{book.description}</p>
          </div>

          {/* 수정, 삭제 버튼 */}
          <div className="flex gap-2 mt-4">
            <Button className="bg-yellow-500 hover:bg-yellow-600">수정</Button>
            <Button className="bg-red-600 hover:bg-red-700">삭제</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
