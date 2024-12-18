import TextArea from '@/components/common/Input/TextArea';

interface BookDescriptionProps {
  description: string;
  editDescription?: string;
  isEditing?: boolean;
  onChange?: (value: string) => void;
}

const BookDescription = ({
  description,
  editDescription,
  isEditing = false,
  onChange,
}: BookDescriptionProps) => {
  const value = editDescription ?? description;

  const descriptionContent = isEditing ? (
    <TextArea
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      className="text-black p-2 rounded text-base font-medium w-full min-h-[100px]"
      label="Description : "
    />
  ) : (
    <p className="text-base font-medium text-white">{description}</p>
  );

  return descriptionContent;
};

export default BookDescription;
