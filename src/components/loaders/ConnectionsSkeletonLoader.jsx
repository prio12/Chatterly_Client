const ConnectionsSkeletonLoader = () => {
  return (
    <div className="flex items-center gap-4 p-3 border-b animate-pulse">
      <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
      <div className="flex-1">
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
      </div>
      <div className="w-20 h-8 bg-gray-300 rounded"></div>
    </div>
  );
};

export default ConnectionsSkeletonLoader;
