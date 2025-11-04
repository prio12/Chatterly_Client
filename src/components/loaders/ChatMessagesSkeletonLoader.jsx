/* eslint-disable react/prop-types */

const ChatMessagesSkeletonLoader = ({ count = 5 }) => {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => {
        // Alternate between sender and receiver messages
        const isSender = index % 2 === 0;

        return (
          <div
            key={index}
            className={`flex ${isSender ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`flex gap-2 max-w-xs ${
                isSender ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              {/* Avatar Skeleton */}
              {!isSender && (
                <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse flex-shrink-0"></div>
              )}

              {/* Message Bubble Skeleton */}
              <div
                className={`space-y-2 ${
                  isSender ? 'items-end' : 'items-start'
                } flex flex-col`}
              >
                {/* Message Text Lines */}
                <div
                  className={`${
                    isSender ? 'bg-blue-100' : 'bg-gray-100'
                  } rounded-2xl p-3 space-y-2`}
                >
                  <div
                    className={`h-3 ${
                      index % 3 === 0
                        ? 'w-40'
                        : index % 3 === 1
                        ? 'w-32'
                        : 'w-48'
                    } bg-gray-200 rounded animate-pulse`}
                  ></div>
                  {/* Some messages have 2 lines */}
                  {index % 2 === 0 && (
                    <div className="h-3 w-24 bg-gray-200 rounded animate-pulse"></div>
                  )}
                </div>

                {/* Timestamp Skeleton */}
                <div className="h-2 w-16 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChatMessagesSkeletonLoader;
