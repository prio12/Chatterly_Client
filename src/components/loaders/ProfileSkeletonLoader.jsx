const ProfileSkeletonLoader = () => {
  return (
    <div className="bg-white border animate-pulse">
      {/* Cover Photo */}
      <div className="w-full h-52 md:h-96 bg-gray-300" />

      {/* Profile Section */}
      <div className="flex items-center justify-between px-5 py-4">
        <div className="flex items-center gap-5">
          {/* Avatar */}
          <div className="w-24 h-24 md:w-36 md:h-36 bg-gray-300 rounded-full -mt-12 border-4 border-white" />

          <div>
            <div className="h-6 bg-gray-300 rounded w-40 mb-2" />
            <div className="h-4 bg-gray-200 rounded w-32" />
          </div>
        </div>

        {/* Button placeholder */}
        <div className="hidden md:block">
          <div className="h-9 w-24 bg-gray-300 rounded" />
        </div>
      </div>

      {/* Details row */}
      <div className="hidden md:flex items-center gap-6 px-5 py-3">
        <div className="h-4 w-28 bg-gray-300 rounded" />
        <div className="h-4 w-24 bg-gray-300 rounded" />
        <div className="h-4 w-32 bg-gray-300 rounded" />
      </div>
    </div>
  );
};

export default ProfileSkeletonLoader;
