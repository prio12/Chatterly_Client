const PostSkeletonLoader = () => {
  return (
    <div className="my-5 bg-white border p-5 rounded-lg shadow-sm">
      {/* Header Section */}
      <div className="flex items-center justify-between border-b border-gray-100 p-5">
        <div className="flex items-center gap-5">
          {/* Avatar Skeleton */}
          <div className="w-11 h-11 rounded-full bg-gray-200 animate-pulse"></div>

          {/* Name and Time Skeleton */}
          <div className="space-y-2">
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-3 w-20 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Three Dots Skeleton */}
        <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
      </div>

      {/* Content Section */}
      <div className="px-5 py-4">
        {/* Text Content Lines */}
        <div className="space-y-3 my-5">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-4/6"></div>
        </div>

        {/* Image Placeholder */}
        <div className="rounded-lg overflow-hidden bg-gray-200 my-4 h-64 animate-pulse"></div>
      </div>

      {/* Like and Comment Section */}
      <div className="flex items-center my-5 gap-5 px-5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="h-4 w-8 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="h-4 w-8 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>

      {/* Liked By Section */}
      <div className="my-5 px-5 flex items-center gap-2">
        <div className="w-4 h-4 bg-gray-200 rounded-full animate-pulse"></div>
        <div className="h-3 w-40 bg-gray-200 rounded animate-pulse"></div>
      </div>

      {/* Comment Input Section */}
      <div className="px-5 py-4 border-t border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
          <div className="flex-1 h-10 bg-gray-200 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default PostSkeletonLoader;
