export const BUTTON_TYPES = ['primary', 'secondary'] as const;

export const BUTTON_CONFIG = {
  primary: {
    default: {
      className: 'bg-yellow-500 hover:bg-yellow-600',
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
