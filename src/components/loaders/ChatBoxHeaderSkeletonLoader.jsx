const ChatBoxHeaderSkeletonLoader = () => {
  return (
    <div className="flex items-center justify-between border-b pb-5">
      {/* Left Side - Avatar and User Info */}
      <div className="flex items-center gap-3">
        {/* Avatar Skeleton */}
        <div className="w-14 h-14 rounded-full bg-gray-200 animate-pulse"></div>

        {/* Name and Status Skeleton */}
        <div className="space-y-2">
          {/* Name */}
          <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>

          {/* Status */}
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="h-3 w-16 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Right Side - Action Buttons */}
      <div className="flex items-center gap-2">
        {/* Call Button Skeleton */}
        <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>

        {/* Video Call Button Skeleton */}
        <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>

        {/* More Options Button Skeleton */}
        <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
      </div>
    </div>
  );
};

export default ChatBoxHeaderSkeletonLoader;
