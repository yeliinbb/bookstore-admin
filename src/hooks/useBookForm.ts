import { addBook } from '@/api/books/books';
import { queryKeys } from '@/constants';
import { Book } from '@/types/books';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface UseBookFormProps {
  initialData?: Book;
  mode: 'add' | 'edit';
}

const defaultFormData: Book = {
  id: 0,
  title: '',
  author: '',
  quantity: 0,
  description: '',
  image: '',
};

const useBookForm = ({ initialData, mode }: UseBookFormProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Book>(
    initialData || defaultFormData,
  );
  const [previewImage, setPreviewImage] = useState<string | null>(
    initialData?.image || null,
  );

  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setFormData(initialData);
      setPreviewImage(initialData.image);
    }
  }, [mode, initialData]);

  const resetForm = () => {
    if (mode === 'edit' && initialData) {
      setFormData(initialData);
      setPreviewImage(initialData.image);
    } else {
      setFormData(defaultFormData);
      setPreviewImage(null);
    }
  };

  // 커링(curry) 함수로 field를 먼저 받고 value를 처리
  const handleChange = (field: string) => (value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setPreviewImage(reader.result as string);
          setFormData((prev) => ({ ...prev, image: reader.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    if (mode === 'edit') {
      setIsEditing(false);
    }
    resetForm();
  };

  const addBookMutation = useMutation({
    mutationFn: addBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.books] });
    },
    onError: () => {
      alert('책 추가에 실패했습니다.');
    },
  });

  const handleSubmit = () => {
    addBookMutation.mutate(formData);
    alert('책이 성공적으로 추가되었습니다.');
    router.push('/');
  };

  return {
    isEditing,
    setIsEditing,
    router,
    formData,
    setFormData,
    previewImage,
    setPreviewImage,
    handleEdit,
    handleSubmit,
    handleCancel,
    handleChange,
    handleImageChange,
  };
};

export default useBookForm;
