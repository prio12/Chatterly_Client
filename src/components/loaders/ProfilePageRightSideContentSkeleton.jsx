import ConnectionsSkeletonLoader from './ConnectionsSkeletonLoader';

const ProfilePageRightSideContentSkeleton = () => {
  return (
    <div className="hidden md:block bg-white border animate-pulse">
      {/* About */}
      <div className="p-5 border-b">
        <div className="h-5 w-20 bg-gray-300 mb-4 rounded" />
        <div className="space-y-2">
          <div className="h-3 bg-gray-300 rounded w-full" />
          <div className="h-3 bg-gray-300 rounded w-5/6" />
          <div className="h-3 bg-gray-300 rounded w-4/6" />
        </div>

        <div className="mt-5 space-y-3">
          {Array(3)
            .fill()
            .map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-5 h-5 bg-gray-300 rounded-full" />
                <div className="h-3 w-32 bg-gray-300 rounded" />
              </div>
            ))}
        </div>
      </div>

      {/* Suggested Connections */}
      <div>
        {[...Array(3)].map((_, i) => (
          <ConnectionsSkeletonLoader key={i} />
        ))}
      </div>
    </div>
  );
};

export default ProfilePageRightSideContentSkeleton;
