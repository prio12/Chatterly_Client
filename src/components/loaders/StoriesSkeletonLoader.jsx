/* eslint-disable react/prop-types */
const StoriesSkeletonLoader = ({ isChatConnections }) => {
  return (
    <div className="flex items-center gap-5">
      {/* Fixed "Post A Story" Skeleton */}
      <div
        className={`fixed_div mb-4 md:mb-0 ${isChatConnections && 'hidden'}`}
      >
        <div className="w-[55px] h-[55px] md:w-[80px] md:h-[80px] rounded-full bg-gray-200 animate-pulse"></div>
        <div className="h-3 w-16 bg-gray-200 rounded mt-2 animate-pulse hidden md:block"></div>
      </div>

      {/* Scrollable Stories Skeleton */}
      <div className="flex gap-3 md:gap-5 overflow-x-auto md:pt-1 pt-2 ps-1 w-full md:ps-1 no-scrollbar">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="flex-shrink-0">
            {/* Story Circle */}
            <div className="w-12 h-12 md:w-[70px] md:h-[70px] rounded-full bg-gray-200 animate-pulse ring ring-gray-200 ring-offset-2"></div>
            {/* Name Skeleton */}
            <div className="h-3 w-12 md:w-16 bg-gray-200 rounded mt-2 animate-pulse"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoriesSkeletonLoader;
