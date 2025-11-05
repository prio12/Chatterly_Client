/* eslint-disable react/prop-types */
import { useLocation } from 'react-router';

const MyVideosSkeletonLoader = ({ count = 4, showAddButton = false }) => {
  const { pathname } = useLocation();
  return (
    <div className="p-5 bg-white border my-5">
      {/* Header Skeleton */}
      <div className="flex items-center mb-5 justify-between">
        {/* Title Skeleton */}
        <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>

        {/* Add Button Skeleton (conditional) */}
        {showAddButton && (
          <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
        )}
      </div>

      {/* Video Grid Skeleton */}
      <div
        className={`grid grid-cols-1 gap-5 ${
          pathname === '/myVideos' ? 'md:grid-cols-2' : 'md:grid-cols-3'
        }`}
      >
        {Array.from({ length: count }).map((_, index) => (
          <div key={index}>
            {/* Video Thumbnail Skeleton */}
            <div className="relative overflow-hidden rounded shadow">
              <div className="w-full h-36 bg-gray-200 rounded-lg animate-pulse"></div>

              {/* Play Icon Overlay Skeleton */}
              <div className="absolute inset-0 bg-black bg-opacity-10 flex items-center justify-center">
                <div className="w-16 h-16 bg-gray-300 rounded-full animate-pulse opacity-50"></div>
              </div>
            </div>

            {/* Likes and Comments Skeleton */}
            <div className="flex items-center gap-5 my-2">
              {/* Likes */}
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-6 bg-gray-200 rounded animate-pulse"></div>
              </div>

              {/* Comments */}
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-6 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyVideosSkeletonLoader;
