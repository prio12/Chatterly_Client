const ProfileContentSkeletonLoader = () => {
  return (
    <div className="bg-white border border-t-0 animate-pulse">
      {/* Tabs */}
      <div className="flex items-center gap-6 p-5 border-b">
        {Array(5)
          .fill()
          .map((_, idx) => (
            <div key={idx} className="h-5 w-16 bg-gray-300 rounded-md"></div>
          ))}
      </div>

      {/* Feed posts placeholder */}
      <div className="p-5 space-y-6">
        {Array(2)
          .fill()
          .map((_, idx) => (
            <div key={idx} className="border rounded-lg p-4 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full" />
                <div>
                  <div className="h-4 w-32 bg-gray-300 rounded" />
                  <div className="h-3 w-20 bg-gray-200 rounded mt-1" />
                </div>
              </div>
              <div className="h-3 bg-gray-300 rounded w-full" />
              <div className="h-3 bg-gray-300 rounded w-3/4" />
              <div className="h-56 bg-gray-300 rounded" />
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProfileContentSkeletonLoader;
