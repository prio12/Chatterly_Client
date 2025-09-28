import { BsChatDots } from 'react-icons/bs';

/* eslint-disable react/prop-types */
const FloatingChatButton = ({ user, chatHandler }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={chatHandler}
        className="group relative btn btn-circle btn-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 border-none shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95"
        title={`Send message to ${user?.name}`}
      >
        <BsChatDots className="text-white text-xl" />

        {/* Modern subtle glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full opacity-30 group-hover:opacity-50 transition-opacity duration-300 blur-sm"></div>

        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap shadow-lg">
          Message {user?.name}
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
      </button>
    </div>
  );
};

export default FloatingChatButton;
