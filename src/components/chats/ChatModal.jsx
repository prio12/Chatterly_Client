import { IoCloseSharp } from 'react-icons/io5';

/* eslint-disable react/prop-types */
const ChatModal = ({ chatHandler }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="h-full  w-full md:h-3/4 md:w-1/2 lg:w-1/2 bg-base-100 shadow-2xl md:rounded-2xl mt-5 overflow-hidden p-5">
        {/* Your content goes here */}
        <div className="flex justify-end">
          <IoCloseSharp className="cursor-pointer" onClick={chatHandler} />
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
