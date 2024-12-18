import BaseInput from '@/components/common/Input/BaseInput';

interface BookTitleProps {
  id?: number;
  title: string;
  editTitle?: string;
  isEditing?: boolean;
  onChange?: (value: string) => void;
}

const BookTitle = ({
  id,
  title,
  editTitle,
  isEditing = false,
  onChange,
}: BookTitleProps) => {
  const displayTitle = editTitle ?? title;

  const titleContent = isEditing ? (
    <BaseInput
      value={displayTitle}
      onChange={(e) => onChange?.(e.target.value)}
      className="text-black p-2 rounded text-4xl font-bold"
      label="Title : "
    />
  ) : (
    <h1 className="text-3xl font-bold text-white">
      {id}. {title}
    </h1>
  );

  return titleContent;
};

export default BookTitle;
