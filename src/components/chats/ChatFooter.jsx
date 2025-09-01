/* eslint-disable react/prop-types */
import { useState } from 'react';
import { IoIosSend, IoMdAttach } from 'react-icons/io';
import { MdEmojiEmotions } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useSendMessageMutation } from '../../redux/api/messaging/messagingApi';
import toast from 'react-hot-toast';

const ChatFooter = ({ selectedUserData }) => {
  //hooks
  const { userProfile } = useSelector((state) => state.chat);
  const [text, setText] = useState('');
  const [sendText] = useSendMessageMutation();
  //needs : sender, receiver, text

  const handleOnChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async () => {
    if (!text.trim()) return;

    //preparing message data to send to the server
    const messageData = {
      participants: [selectedUserData?._id, userProfile?.payload?._id],
      sender: userProfile?.payload?._id,
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
    <div className="w-full bg-slate-100 p-5 rounded-lg">
      <textarea
        onChange={handleOnChange}
        value={text}
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
        <div>
          <IoIosSend
            onClick={text ? handleSubmit : undefined}
            className={`text-2xl ${
              text ? 'text-blue-600 cursor-pointer' : 'text-gray-400'
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatFooter;
