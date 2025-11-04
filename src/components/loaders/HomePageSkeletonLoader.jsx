import CreatePostSkeletonLoader from './CreatePostSkeletonLoader';
import PostFeedToggleSkeletonLoader from './PostFeedToggleSkeletonLoader';
import PostListSkeletonLoader from './PostListSkeletonLoader';
import StoriesSkeletonLoader from './StoriesSkeletonLoader';

const HomePageSkeletonLoader = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 bg-gray-100 min-h-screen">
      {/* Left Sidebar Skeleton */}
      <div className="hidden md:block col-span-3 bg-white dark:bg-slate-900">
        <div className="w-16 fixed left-0 h-full">
          <div className="text-2xl flex flex-col ps-5 justify-evenly gap-12 pt-5">
            {/* Menu Toggle Icon Skeleton */}
            <div className="w-6 h-6 bg-gray-200 rounded animate-pulse ms-2"></div>

            {/* Navigation Icons Skeleton */}
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gray-200 rounded-md animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Middle Section */}
      <div className="col-span-1 md:col-span-7 bg-white flex justify-center md:py-2 md:px-5 dark:bg-slate-900">
        <div className="w-full max-w-5xl md:px-5 px-0 py-2">
          {/* Stories Skeleton */}
          <StoriesSkeletonLoader />

          {/* Create Post Skeleton */}
          <CreatePostSkeletonLoader />

          {/* Post Feed Toggle Skeleton */}
          <PostFeedToggleSkeletonLoader />

          {/* Post List Skeleton */}
          <PostListSkeletonLoader count={3} />
        </div>
      </div>

      {/* Right Sidebar Skeleton */}
      <div className="hidden md:block col-span-2 bg-white dark:bg-slate-900">
        <div className="w-16 fixed right-0 h-full bg-white shadow-lg">
          <div className="flex flex-col justify-start gap-5 p-3 pt-5">
            {/* Menu Toggle Icon Skeleton */}
            <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>

            {/* Suggested Users Skeleton */}
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePageSkeletonLoader;
