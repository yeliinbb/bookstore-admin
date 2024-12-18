import { Book } from '@/types/books';
import {
  BookTitle,
  BookAuthor,
  BookQuantity,
  BookDescription,
  BookImage,
} from '../books';
import BookFormLayoutButtons from './BookFormLayoutButtons';

interface BookFormLayoutProps {
  mode: 'add' | 'edit';
  formData: Book;
  previewImage: string | null;
  isEditing: boolean;
  onChange: (field: string) => (value: string | number) => void;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  onEdit?: () => void;
  onCancel: () => void;
  onDelete?: () => void;
}

const BookFormLayout = ({
  mode,
  formData,
  previewImage,
  isEditing,
  onChange,
  onImageChange,
  onSubmit,
  onEdit,
  onCancel,
  onDelete,
}: BookFormLayoutProps) => (
  <div className="w-full flex flex-col md:flex-row gap-8">
    <BookImage
      src={previewImage || formData.image}
      alt={formData.title}
      isEditing={isEditing}
      handleImageChange={onImageChange}
    />

    <div className="flex flex-col gap-4 justify-between">
      <div className="flex flex-col gap-4">
        <BookTitle
          id={formData.id}
          title={formData.title}
          isEditing={isEditing}
          onChange={onChange('title')}
        />
        <BookAuthor
          author={formData.author}
          isEditing={isEditing}
          onChange={onChange('author')}
        />
        <BookQuantity
          quantity={formData.quantity}
          isEditing={isEditing}
          onChange={onChange('quantity')}
        />
        <BookDescription
          description={formData.description}
          isEditing={isEditing}
          onChange={onChange('description')}
        />
      </div>

      <BookFormLayoutButtons
        mode={mode}
        isEditing={isEditing}
        onSubmit={onSubmit}
        onCancel={onCancel}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </div>
  </div>
);

export default BookFormLayout;
