import TextArea from '@/components/common/Input/TextArea';

interface BookDescriptionProps {
  description: string;
  editDescription?: string;
  isEditing?: boolean;
  onEdit?: (value: string) => void;
}

const BookDescription = ({
  description,
  editDescription,
  isEditing = false,
  onEdit,
}: BookDescriptionProps) => {
  if (isEditing) {
    return (
      <TextArea
        value={editDescription !== undefined ? editDescription : description}
        onChange={(e) => onEdit?.(e.target.value)}
        className="text-black p-2 rounded text-base font-medium w-full min-h-[100px]"
        label="Description : "
      />
    );
  }
  return <p className="text-base font-medium text-white">{description}</p>;
};

export default BookDescription;
