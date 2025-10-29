/* eslint-disable react/prop-types */
import { useContext, useRef, useState } from 'react';
import { IoIosSend, IoMdAttach } from 'react-icons/io';
import { MdEmojiEmotions } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useSendMessageMutation } from '../../redux/api/messaging/messagingApi';
import toast from 'react-hot-toast';
import SocketContext from '../../context/SocketContext';
import EmojiPicker from 'emoji-picker-react';

const ChatFooter = ({ selectedUserData, loggedInUserId }) => {
  const { userProfile } = useSelector((state) => state.chat);
  const [text, setText] = useState('');
  const [sendText] = useSendMessageMutation();
  const socket = useContext(SocketContext);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef(null);

  let typingTimeout = useRef(null);

  const handleOnChange = (e) => {
    setText(e.target.value);

    if (!socket) return;

    socket.emit('typing', {
      receiver: selectedUserData,
      sender: loggedInUserId,
    });

    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }
    typingTimeout.current = setTimeout(() => {
      socket.emit('stopTyping', {
        receiver: selectedUserData,
        sender: loggedInUserId,
      });
    }, 2000);
  };

  const handleEmojiClick = (emojiData) => {
    setText((prev) => prev + emojiData.emoji);
  };

  const handleSubmit = async () => {
    if (!text.trim()) return;

    const messageData = {
      participants: [
        selectedUserData?._id,
        userProfile?.payload?._id || loggedInUserId,
      ],
      sender: userProfile?.payload?._id || loggedInUserId,
      senderUid: userProfile?.payload?.uid,
      receiverUid: selectedUserData?.uid,
      text,
    };

    try {
      const result = await sendText(messageData).unwrap();
      if (result.success) {
        setText('');
      }
    } catch (error) {
      toast.error(error.data.error);
      setText('');
    }
  };

  return (
    <div className="relative w-full bg-slate-100 p-5 rounded-lg">
      {/* Emoji Picker - Positioned absolutely above the footer */}
      {showEmojiPicker && (
        <div
          ref={emojiPickerRef}
          className="absolute bottom-full left-0 mb-2 z-50"
        >
          <EmojiPicker
            onEmojiClick={handleEmojiClick}
            width={300}
            height={400}
          />
        </div>
      )}

      <textarea
        onChange={handleOnChange}
        value={text}
        className="w-full h-10 p-2 pr-10 resize-none rounded-md focus:outline-none overflow-y-scroll no-scrollbar"
        placeholder="Type a message..."
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      ></textarea>

      <div className="flex items-center justify-between my-3">
        <div className="flex items-center gap-5 text-xl">
          <MdEmojiEmotions
            className="cursor-pointer hover:text-blue-500 transition-colors"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          />
          <IoMdAttach className="cursor-pointer hover:text-blue-500 transition-colors" />
        </div>
        <div>
          <IoIosSend
            onClick={text ? handleSubmit : undefined}
            className={`text-2xl ${
              text
                ? 'text-blue-600 cursor-pointer hover:text-blue-700'
                : 'text-gray-400'
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatFooter;
