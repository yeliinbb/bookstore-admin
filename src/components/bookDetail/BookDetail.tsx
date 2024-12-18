'use client';

import Button from '../common/Button';
import { useRouter } from 'next/navigation';
import useBookDetail from '@/hooks/useBookDetail';
import { useState, useEffect } from 'react';
import {
  BookAuthor,
  BookQuantity,
  BookDescription,
  BookTitle,
  BookImage,
} from '../books';
import { BUTTON_CONFIG, BUTTON_TYPES, queryKeys } from '@/constants';
import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';

interface BookDetailProps {
  bookId: number;
}

const BookDetail = ({ bookId }: BookDetailProps) => {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: '',
    author: '',
    quantity: 0,
    description: '',
    image: '',
  });

  const { book, handleEditBook, handleDeleteBook } = useBookDetail({ bookId });

  useEffect(() => {
    if (isEditing && book) {
      setEditData({
        title: book.title,
        author: book.author,
        quantity: book.quantity,
        description: book.description,
        image: book.image,
      });
    }
  }, [isEditing, book]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setEditData((prev) => ({ ...prev, image: reader.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSubmit = () => {
    handleEditBook(editData);
    alert('내용이 수정되었습니다.');
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // 원래 데이터로 복구
    if (book) {
      setEditData({
        title: book.title,
        author: book.author,
        quantity: book.quantity,
        description: book.description,
        image: book.image,
      });
    }
  };

  const handleDelete = () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      handleDeleteBook();
      router.push('/');
    }
  };

  if (!book) {
    return <p className="text-center text-white">책 정보를 불러오는 중...</p>;
  }

  return (
    <div className="container mx-auto p-8 text-white">
      {/* 뒤로 가기 버튼 */}
      <div className="mb-4">
        <Link href="/">
          <Button className="bg-gray-600 hover:bg-gray-400">뒤로가기</Button>
        </Link>
      </div>

      <div className="w-full flex flex-col md:flex-row gap-8">
        {/* 이미지 */}
        <BookImage
          src={book.image}
          alt={book.title}
          isEditing={isEditing}
          onImageUpload={handleImageUpload}
          className="object-cover"
        />

        {/* 상세 정보 */}
        <div className="flex flex-col gap-4 justify-between">
          <div className="flex flex-col gap-4">
            <BookTitle
              id={book.id}
              title={book.title}
              editTitle={editData.title}
              isEditing={isEditing}
              onEdit={(value) => setEditData({ ...editData, title: value })}
            />
            <BookAuthor
              author={book.author}
              editAuthor={editData.author}
              isEditing={isEditing}
              onEdit={(value) => setEditData({ ...editData, author: value })}
            />
            <BookQuantity
              quantity={book.quantity}
              editQuantity={editData.quantity}
              isEditing={isEditing}
              onEdit={(value) => setEditData({ ...editData, quantity: value })}
            />
            <BookDescription
              description={book.description}
              editDescription={editData.description}
              isEditing={isEditing}
              onEdit={(value) =>
                setEditData({ ...editData, description: value })
              }
            />
          </div>

          {/* 수정, 삭제 버튼 */}
          <div className="flex gap-2 mt-4">
            {BUTTON_TYPES.map((type) => (
              <Button
                key={type}
                className={
                  BUTTON_CONFIG[type][isEditing ? 'editing' : 'default']
                    .className
                }
                onClick={
                  type === 'primary'
                    ? isEditing
                      ? handleSubmit
                      : handleEdit
                    : isEditing
                    ? handleCancel
                    : handleDelete
                }
              >
                {BUTTON_CONFIG[type][isEditing ? 'editing' : 'default'].text}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
