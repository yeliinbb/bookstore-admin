'use client';

import ResponsiveImage from '@/components/common/ResponsiveImage';
import React, { ChangeEvent } from 'react';

interface BookImageProps {
  src: string;
  alt: string;
  previewImage?: string;
  isEditing?: boolean;
  handleImageChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  priority?: boolean;
}

const DEFAULT_IMAGE = '/images/default-book.webp';

const BookImage = ({
  src,
  alt,
  previewImage,
  isEditing,
  handleImageChange,
  className,
  priority = false,
}: BookImageProps) => {
  const imageSrc =
    previewImage && previewImage.trim() !== ''
      ? previewImage
      : src && src.trim() !== ''
      ? src
      : DEFAULT_IMAGE;

  return (
    <div className="flex flex-col">
      <div className="relative w-[250px] h-[380px] min-w-[250px] rounded-md overflow-hidden">
        <ResponsiveImage
          src={imageSrc}
          alt={alt ?? '기본 이미지'}
          className={className}
          priority={priority} // 첫 화면에 보이는 이미지만 priority true로 설정
          loading={priority ? 'eager' : 'lazy'}
        />
      </div>
      <div className="mt-2 flex flex-col justify-center">
        {isEditing ? (
          <label className="px-4 py-2 bg-blue-500 hover:bg-blue-400 text-white text-sm rounded cursor-pointer flex items-center justify-center">
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
