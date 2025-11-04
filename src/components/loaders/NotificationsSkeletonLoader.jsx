/* eslint-disable react/prop-types */

const NotificationsSkeletonLoader = ({ count = 10 }) => {
  return (
    <div className="sticky top-24 md:top-28 lg:top-28">
      {/* Header Skeleton */}
      <div className="w-full mb-5">
        <div className="h-10 w-48 bg-gray-200 rounded animate-pulse border-b-2 border-gray-200 pb-2 p-2"></div>
      </div>

      {/* Notification Items Skeleton */}
      <div className="fixed top-44 max-h-[600px] overflow-y-scroll no-scrollbar w-full md:w-2/4 ">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className="flex items-center gap-5 shadow-sm p-5 rounded-lg bg-slate-100 mb-5 "
          >
            {/* Avatar with Badge Skeleton */}
            <div className="relative inline-block flex-shrink-0">
              {/* Avatar Circle */}
              <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse"></div>

              {/* Badge Icon Skeleton */}
              <div className="absolute bottom-[-6px] right-[-6px] w-5 h-5 rounded-full bg-gray-300 animate-pulse"></div>
            </div>

            {/* Text Content Skeleton */}
            <div className="flex-1 space-y-2 ">
              {/* Name and Action Text */}
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
              </div>

              {/* Time and Delete Icon */}
              <div className="flex items-center gap-5 mt-2">
                <div className="h-3 w-20 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsSkeletonLoader;
