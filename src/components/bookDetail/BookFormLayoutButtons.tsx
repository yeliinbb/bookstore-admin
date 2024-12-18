import React from 'react';
import Button from '../common/Button';

interface BookFormLayoutProps {
  mode: 'add' | 'edit';
  isEditing: boolean;
  onSubmit: () => void;
  onEdit?: () => void;
  onCancel: () => void;
  onDelete?: () => void;
}

const BUTTON_TYPES = ['primary', 'secondary'] as const;

const BUTTON_CONFIG = {
  primary: {
    default: {
      className: 'bg-yellow-500 hover:bg-yellow-600 ',
      text: '수정',
    },
    editing: {
      className: 'bg-blue-500 hover:bg-blue-600',
      text: '저장',
    },
  },
  secondary: {
    default: {
      className: 'bg-red-600 hover:bg-red-700',
      text: '삭제',
    },
    editing: {
      className: 'bg-gray-500 hover:bg-gray-600',
      text: '취소',
    },
  },
} as const;

const BookFormLayoutButtons = ({
  mode,
  isEditing,
  onSubmit,
  onEdit,
  onCancel,
  onDelete,
}: BookFormLayoutProps) => {
  // 버튼 배열 생성
  const getButtons = () => {
    if (mode === 'add') {
      // AddBookForm: 저장, 취소만 표시
      return (
        <>
          <Button
            className={BUTTON_CONFIG['primary']['editing'].className}
            onClick={onSubmit}
          >
            {BUTTON_CONFIG['primary']['editing'].text}
          </Button>
          <Button
            className={BUTTON_CONFIG['secondary']['editing'].className}
            onClick={onCancel}
          >
            {BUTTON_CONFIG['secondary']['editing'].text}
          </Button>
        </>
      );
    }

    // BookDetail: 수정, 삭제, 저장, 취소
    return BUTTON_TYPES.map((type) => {
      const buttonTypeConfig =
        BUTTON_CONFIG[type][isEditing ? 'editing' : 'default'];

      return (
        <Button
          key={type}
          className={buttonTypeConfig.className}
          onClick={
            type === 'primary'
              ? isEditing
                ? onSubmit
                : onEdit
              : isEditing
              ? onCancel
              : onDelete
          }
        >
          {buttonTypeConfig.text}
        </Button>
      );
    });
  };

  return <div className="flex gap-2 mt-4">{getButtons()}</div>;
};

export default BookFormLayoutButtons;
