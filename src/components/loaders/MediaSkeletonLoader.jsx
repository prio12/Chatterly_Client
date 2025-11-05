/* eslint-disable react/prop-types */
import { useLocation } from 'react-router';

const MediaSkeletonLoader = ({ count = 4, showAddButton = false }) => {
  const { pathname } = useLocation();
  return (
    <div className="p-5 bg-white border rounded-md shadow-sm my-5">
      {/* Header Skeleton */}
      <div className="flex items-center mb-5 justify-between">
        {/* Title with Count Badge Skeleton */}
        <div className="flex items-center gap-2">
          <div className="h-6 w-20 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-5 w-8 bg-gray-200 rounded-full animate-pulse"></div>
        </div>

        {/* Add Button Skeleton (conditional) */}
        {showAddButton && (
          <div className="h-8 w-36 bg-gray-200 rounded animate-pulse"></div>
        )}
      </div>

      {/* Photo Grid Skeleton */}
      <div
        className={`grid grid-cols-1 gap-5 ${
          pathname === '/myAlbums' ? 'md:grid-cols-2' : 'md:grid-cols-3'
        }`}
      >
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className="relative group">
            {/* Image Placeholder Skeleton */}
            <div className="w-full h-48 bg-gray-200 rounded-lg animate-pulse overflow-hidden">
              {/* Shimmer effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-100 to-transparent animate-pulse"></div>
            </div>

            {/* Optional hover overlay effect skeleton */}
            <div className="absolute inset-0 bg-gray-300 opacity-0 group-hover:opacity-10 transition rounded-lg"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediaSkeletonLoader;
