'use client';

import { useState, useEffect } from 'react';
import { useBookActions, useBookForm } from '@/hooks';
import BackButton from '../common/BackButton';
import BookFormLayout from './BookFormLayout';

interface BookDetailProps {
  bookId: number;
}

const BookDetail = ({ bookId }: BookDetailProps) => {
  const { book, handleEditBook, handleDeleteBook } = useBookActions({ bookId });

  const {
    isEditing,
    setIsEditing,
    router,
    formData,
    previewImage,
    setPreviewImage,
    setFormData,
    handleChange,
    handleCancel,
    handleEdit,
    handleImageChange,
  } = useBookForm({ mode: 'edit', initialData: book });

  useEffect(() => {
    if (book) {
      setFormData({
        id: book.id,
        title: book.title,
        author: book.author,
        quantity: book.quantity,
        description: book.description,
        image: book.image,
      });
      setPreviewImage(book.image);
    }
  }, [isEditing, book]);

  const handleSubmit = () => {
    handleEditBook(formData);
    alert('내용이 수정되었습니다.');
    setIsEditing(false);
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
    <div className="flex flex-col gap-4">
      <BackButton />
      <BookFormLayout
        mode="edit"
        formData={formData}
        previewImage={previewImage}
        isEditing={isEditing}
        onChange={handleChange}
        onImageChange={handleImageChange}
        onSubmit={handleSubmit}
        onEdit={handleEdit}
        onCancel={handleCancel}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default BookDetail;
