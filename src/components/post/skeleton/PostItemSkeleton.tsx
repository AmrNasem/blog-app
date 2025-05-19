export function PostItemSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={`${className} min-h-[300px] flex flex-col border rounded-lg py-4 shadow-md bg-white animate-pulse`}
    >
      {/* Author Info Skeleton */}
      <div className="flex items-center mb-4 gap-1 px-4">
        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        <div>
          <div className="w-24 h-3 bg-gray-300 rounded mb-1"></div>
          <div className="w-16 h-3 bg-gray-300 rounded"></div>
        </div>
      </div>

      {/* Post Body Skeleton */}
      <div className="mb-4 flex-1 px-4">
        <div className="w-full h-4 bg-gray-300 rounded mb-2"></div>
        <div className="w-3/4 h-4 bg-gray-300 rounded mb-3"></div>
        <div className="w-full h-48 bg-gray-300 rounded"></div>
      </div>

      {/* Viewing Stats Skeleton */}
      <div className="px-6.5 flex justify-between items-center text-sm text-gray-600 mb-4">
        <div className="w-20 h-4 bg-gray-300 rounded"></div>
        <div className="w-20 h-4 bg-gray-300 rounded"></div>
      </div>

      {/* Actions Skeleton */}
      <div className="flex justify-around space-x-4 px-4">
        <div className="w-16 h-6 bg-gray-300 rounded"></div>
        <div className="w-16 h-6 bg-gray-300 rounded"></div>
      </div>

      {/* Comment Form Skeleton */}
      <div className="mt-4 flex gap-1 px-4">
        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        <div className="flex-1 flex items-center space-x-2">
          <div className="flex-1 h-10 bg-gray-300 rounded"></div>
          <div className="w-12 h-10 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );
}
