import BaseInput from '@/components/common/Input/BaseInput';

interface BookTitleProps {
  id: number;
  title: string;
  editTitle: string;
  isEditing?: boolean;
  onEdit?: (value: string) => void;
}

const BookTitle = ({
  id,
  title,
  editTitle,
  isEditing = false,
  onEdit,
}: BookTitleProps) => {
  if (isEditing) {
    return (
      <BaseInput
        value={editTitle !== undefined ? editTitle : title}
        onChange={(e) => onEdit?.(e.target.value)}
        className="text-black p-2 rounded text-4xl font-bold"
        label="Title : "
      />
    );
  }

  return (
    <h1 className="text-3xl font-bold text-white">
      {id}. {title}
    </h1>
  );
};

export default BookTitle;
