'use client';

import ResponsiveImage from '@/components/common/ResponsiveImage';
import { useState } from 'react';

interface BookImageProps {
  src: string;
  alt: string;
  isEditing?: boolean;
  onImageUpload?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const BookImage = ({
  src,
  alt,
  isEditing,
  onImageUpload,
  className,
}: BookImageProps) => {
  const [previewImage, setPreviewImage] = useState<string | null>(src);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.result) {
          setPreviewImage(reader.result as string);
        }
      };

      reader.readAsDataURL(file);
    }

    if (onImageUpload) {
      onImageUpload(e);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="relative w-[300px] h-[380px] min-w-[250px] rounded-md overflow-hidden">
        <ResponsiveImage
          src={previewImage || src}
          alt={alt}
          className={className}
        />
      </div>
      <div className="mt-2 flex flex-col justify-center">
        {isEditing ? (
          <label className="px-4 py-2 bg-blue-500 text-white text-sm rounded cursor-pointer hover:bg-blue-600 flex items-center justify-center">
            <span>이미지 업로드</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        ) : null}
      </div>
    </div>
  );
};

export default BookImage;
