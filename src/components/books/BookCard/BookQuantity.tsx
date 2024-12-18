import BaseInput from '@/components/common/Input/BaseInput';

interface BookQuantityProps {
  quantity: number;
  editQuantity?: number;
  isEditing?: boolean;
  onChange?: (value: number) => void;
}

const BookQuantity = ({
  quantity,
  editQuantity,
  isEditing = false,
  onChange,
}: BookQuantityProps) => {
  const value = editQuantity ?? quantity;

  const quantityContent = isEditing ? (
    <BaseInput
      type="number"
      value={value}
      onChange={(e) => onChange?.(Number(e.target.value))}
      className="text-black p-2 rounded text-base font-medium w-full"
      label="Quantity : "
    />
  ) : (
    <p className="text-base font-medium text-white">quantity : {quantity}</p>
  );

  return quantityContent;
};

export default BookQuantity;
