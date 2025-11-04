/* eslint-disable react/prop-types */

const ChatListSkeletonLoader = ({ count = 5 }) => {
  return (
    <div>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="flex items-center gap-5 my-3 rounded-md shadow-sm p-5 bg-slate-50"
        >
          {/* Avatar Skeleton */}
          <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse flex-shrink-0"></div>

          {/* Text Content Skeleton */}
          <div className="flex-1 space-y-2">
            {/* Name Skeleton */}
            <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>

            {/* Last Message Skeleton */}
            <div className="h-3 bg-gray-200 rounded animate-pulse w-48"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatListSkeletonLoader;
