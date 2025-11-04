const CreatePostSkeletonLoader = () => {
  return (
    <div className="my-5 border p-5 bg-white rounded-lg shadow-sm">
      {/* Avatar and Textarea Skeleton */}
      <div className="flex items-center gap-3">
        {/* Avatar Skeleton */}
        <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse mt-[-24px]"></div>

        {/* Textarea Skeleton */}
        <div className="w-full h-12 bg-gray-200 rounded-lg animate-pulse"></div>
      </div>

      {/* Buttons Section */}
      <div className="flex flex-wrap items-center justify-between mt-4">
        {/* Left Side Buttons */}
        <div className="flex items-center gap-5">
          {/* Photo Button Skeleton */}
          <div className="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>

          {/* Video Button Skeleton */}
          <div className="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>

          {/* Thought Button Skeleton */}
          <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
        </div>

        {/* Post Button Skeleton */}
        <div className="my-5 md:my-0">
          <div className="h-8 w-16 bg-gray-200 rounded-md animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default CreatePostSkeletonLoader;
