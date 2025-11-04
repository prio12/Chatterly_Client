const ChatFooterSkeletonLoader = () => {
  return (
    <div className="relative w-full bg-slate-100 p-5 rounded-lg">
      {/* Input Field Skeleton */}
      <div className="w-full h-10 bg-gray-200 rounded-md animate-pulse"></div>

      {/* Icons Row Skeleton */}
      <div className="flex items-center justify-between my-3">
        {/* Left Icons - Emoji and Attach */}
        <div className="flex items-center gap-5">
          <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
          <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
        </div>

        {/* Right Icon - Send Button */}
        <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
      </div>
    </div>
  );
};

export default ChatFooterSkeletonLoader;
