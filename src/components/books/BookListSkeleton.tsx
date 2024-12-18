const BookListSkeleton = () => {
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-2 gap-4">
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className="flex gap-2 p-4 rounded-xl bg-gray-800 animate-pulse"
          >
            {/* 이미지 스켈레톤 */}
            <div className="relative w-[250px] h-[380px] min-w-[250px] rounded-md bg-gray-700 overflow-hidden" />

            {/* 텍스트 스켈레톤 */}
            <div className="flex flex-col justify-between flex-1">
              <div>
                <div className="bg-gray-700 h-8 w-3/4 rounded mb-4" />{' '}
                {/* 제목 */}
                <div className="bg-gray-700 h-4 w-1/4 rounded mb-4" />{' '}
                {/* quantity */}
              </div>
              <div>
                <div className="bg-gray-700 h-6 w-1/2 rounded mb-2" />{' '}
                {/* 저자 */}
                <div className="bg-gray-700 h-4 w-full rounded mb-2" />{' '}
                {/* 설명 줄 1 */}
                <div className="bg-gray-700 h-4 w-3/4 rounded" />{' '}
                {/* 설명 줄 2 */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookListSkeleton;
