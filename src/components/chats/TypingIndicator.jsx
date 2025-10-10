import DefaultProfilePIcture from '../profile/DefaultProfilePIcture';

/* eslint-disable react/prop-types */
const TypingIndicator = ({ selectedUserData, isChatPanel }) => {
  if (!isChatPanel) {
    return (
      <div className="flex items-start gap-2">
        <div className="bg-gray-200 rounded-xl rounded-tl-sm px-3 py-1.5 flex items-center gap-1">
          <div
            className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"
            style={{ animationDelay: '0ms', animationDuration: '0.8s' }}
          ></div>

          <div
            className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"
            style={{ animationDelay: '200ms', animationDuration: '0.8s' }}
          ></div>

          <div
            className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"
            style={{ animationDelay: '400ms', animationDuration: '0.8s' }}
          ></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="chat chat-start mt-2">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            {selectedUserData?.profilePicture ? (
              <img
                alt="Tailwind CSS chat bubble component"
                src={selectedUserData?.profilePicture}
              />
            ) : (
              <DefaultProfilePIcture />
            )}
          </div>
        </div>
        <div className="chat-bubble bg-gray-200">
          <div className=" rounded-xl rounded-tl-sm px-3 py-2 flex items-center gap-1">
            <div
              className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
              style={{ animationDelay: '0ms', animationDuration: '0.8s' }}
            ></div>

            <div
              className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
              style={{ animationDelay: '200ms', animationDuration: '0.8s' }}
            ></div>

            <div
              className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
              style={{ animationDelay: '400ms', animationDuration: '0.8s' }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
