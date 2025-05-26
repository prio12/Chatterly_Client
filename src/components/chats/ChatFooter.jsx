import { IoIosSend, IoMdAttach } from 'react-icons/io';
import { MdEmojiEmotions } from 'react-icons/md';

const ChatFooter = () => {
  return (
    <div className="w-full bg-slate-100 p-5 rounded-lg">
      <textarea
        // onChange={handleOnchange}
        // value={commentText}
        className="w-full h-10 p-2 pr-10 resize-none  rounded-md focus:outline-none   overflow-y-scroll no-scrollbar"
        placeholder="Type a message..."
        style={{
          scrollbarWidth: 'none', // For Firefox
          msOverflowStyle: 'none', // For IE and Edge
        }}
      ></textarea>
      <div className=" flex items-center justify-between my-3">
        <div className="flex items-center gap-5 text-xl">
          {' '}
          <MdEmojiEmotions />
          <IoMdAttach />
        </div>
        <div className="text-2xl text-blue-600">
          <IoIosSend />
        </div>
      </div>
    </div>
  );
};

export default ChatFooter;
