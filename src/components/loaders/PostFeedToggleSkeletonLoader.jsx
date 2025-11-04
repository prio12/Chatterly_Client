const PostFeedToggleSkeletonLoader = () => {
  return (
    <div className="w-full my-5 bg-white border p-5 rounded-lg shadow-sm">
      {/* Tab Switcher Skeleton */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-1 flex gap-1">
        {/* My Feed Button Skeleton */}
        <div className="flex-1 h-11 bg-gray-200 rounded-md animate-pulse"></div>

        {/* Community Button Skeleton */}
        <div className="flex-1 h-11 bg-gray-200 rounded-md animate-pulse"></div>
      </div>

      {/* Demo Content Skeleton */}
      <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
      </div>
    </div>
  );
};

export default PostFeedToggleSkeletonLoader;
