import BaseInput from '@/components/common/Input/BaseInput';

interface BookAuthorProps {
  author: string;
  editAuthor?: string;
  isEditing?: boolean;
  onChange?: (value: string) => void;
}

const BookAuthor = ({
  author,
  editAuthor,
  isEditing = false,
  onChange,
}: BookAuthorProps) => {
  const value = editAuthor ?? author;

  const authorContent = isEditing ? (
    <BaseInput
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      className="text-black p-2 rounded text-xl font-medium w-full"
      label="Author : "
    />
  ) : (
    <h3 className="text-xl font-medium text-white">{author}</h3>
  );

  return authorContent;
};

export default BookAuthor;
