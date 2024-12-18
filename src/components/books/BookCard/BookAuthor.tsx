import BaseInput from '@/components/common/Input/BaseInput';

interface BookAuthorProps {
  author: string;
  editAuthor?: string;
  isEditing?: boolean;
  onEdit?: (value: string) => void;
}

const BookAuthor = ({
  author,
  editAuthor,
  isEditing = false,
  onEdit,
}: BookAuthorProps) => {
  if (isEditing) {
    return (
      <BaseInput
        value={editAuthor !== undefined ? editAuthor : author}
        onChange={(e) => onEdit?.(e.target.value)}
        className="text-black p-2 rounded text-xl font-medium w-full"
        label="Author : "
      />
    );
  }
  return <h3 className="text-xl font-medium text-white">{author}</h3>;
};

export default BookAuthor;
