'use client';

import useBookForm from '@/hooks/useBookForm';
import BookFormLayout from './BookFormLayout';
import BackButton from '../common/BackButton';

const AddBookForm = () => {
  const {
    formData,
    previewImage,
    handleChange,
    handleImageChange,
    handleSubmit,
    handleCancel,
  } = useBookForm({ mode: 'add' });

  return (
    <div className="flex flex-col gap-4">
      <BackButton />
      <BookFormLayout
        mode="add"
        formData={formData}
        previewImage={previewImage}
        isEditing={true}
        onChange={handleChange}
        onImageChange={handleImageChange}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default AddBookForm;
