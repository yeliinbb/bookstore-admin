import Image from 'next/image';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  blurColor?: string;
  loading?: 'lazy' | 'eager';
}

const ResponsiveImage = ({
  src,
  alt,
  priority,
  className = '',
  blurColor = '#F3F4F6',
  loading = 'lazy',
}: ResponsiveImageProps) => {
  const blurSvg = `
    <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${blurColor}"/>
    </svg>
  `;

  return (
    <div className="relative w-full h-full">
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        className={`object-cover ${className}`}
        sizes="100%"
        placeholder="blur" // 블러 처리된 이미지를 먼저 보여줌
        blurDataURL={`data:image/svg+xml;base64,${Buffer.from(blurSvg).toString(
          'base64',
        )}`}
        quality={75} // 품질을 약간 낮춰서 로딩 속도 향상
        loading={loading}
      />
    </div>
  );
};

export default ResponsiveImage;
