import BaseInput from '@/components/common/Input/BaseInput';

interface BookQuantityProps {
  quantity: number;
  editQuantity?: number;
  isEditing?: boolean;
  onEdit?: (value: number) => void;
}

const BookQuantity = ({
  quantity,
  editQuantity,
  isEditing = false,
  onEdit,
}: BookQuantityProps) => {
  if (isEditing) {
    return (
      <BaseInput
        type="number"
        value={editQuantity !== undefined ? editQuantity : quantity}
        onChange={(e) => onEdit?.(Number(e.target.value))}
        className="text-black p-2 rounded text-base font-medium w-full"
        label="Quantity : "
      />
    );
  }
  return (
    <p className="text-base font-medium text-white">quantity : {quantity}</p>
  );
};

export default BookQuantity;
