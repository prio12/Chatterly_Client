import { useSelector } from 'react-redux';
import DefaultProfilePIcture from '../profile/DefaultProfilePIcture';
import { useMarkConversationAsReadMutation } from '../../redux/api/messaging/messagingApi';
import { useNavigate } from 'react-router';
import { useContext, useEffect, useState } from 'react';
import SocketContext from '../../context/SocketContext';
import TypingIndicator from './TypingIndicator';

/* eslint-disable react/prop-types */
const ChatLists = ({ chatList: conversation, handleInitiateChat, isSmall }) => {
  //hooks
  const { userProfile } = useSelector((state) => state.chat);
  const [setMarkAsRead] = useMarkConversationAsReadMutation();
  const navigate = useNavigate();
  const socket = useContext(SocketContext);

  const [unreadCount, setUnreadCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  const otherParticipant = conversation?.participants.find(
    (participant) => participant?._id !== userProfile?.payload._id
  );

  useEffect(() => {
    setUnreadCount(conversation.unreadCounts[userProfile?.payload._id]);
  }, [conversation.unreadCounts, userProfile?.payload._id]);

  let lastMessageContent;

  if (unreadCount > 1) {
    // multiple new messages
    lastMessageContent = (
      <p className="text-xs font-medium text-blue-500">
        {unreadCount} New Messages
      </p>
    );
  } else {
    // check if the last message was sent by the logged-in user
    const isOwnMessage =
      conversation?.lastMessage?.sender?._id?.toString() ===
      userProfile?.payload?._id?.toString();

    lastMessageContent = (
      <p className="text-xs text-gray-600">
        {isOwnMessage ? (
          <>
            <span className="font-medium">You:</span>{' '}
            {conversation?.lastMessage?.text}
          </>
        ) : (
          conversation?.lastMessage?.text
        )}
      </p>
    );
  }

  const handleOpenConversation = async () => {
    if (isSmall) {
      navigate(`/chats/${otherParticipant?.uid}`);
    } else {
      handleInitiateChat(otherParticipant);
    }
    try {
      const response = await setMarkAsRead({
        conversationId: conversation._id,
        userId: userProfile?.payload?._id,
      }).unwrap();

      if (response?.success) {
        setUnreadCount(0);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    socket.on('userTyping', ({ userId }) => {
      const isInParticipants = conversation.participants.some(
        (user) => user._id === userId
      );
      if (isInParticipants) {
        setIsTyping(true);
      }
    });
    socket.on('userStopTyping', ({ userId }) => {
      const isInParticipants = conversation.participants.some(
        (user) => user._id === userId
      );
      if (isInParticipants) {
        setIsTyping(false);
      }
    });

    return () => {
      socket.off('userTyping');
      socket.off('userStopTyping');
    };
  }, [socket, conversation.participants]);

  return (
    <div>
      <div
        onClick={handleOpenConversation}
        className={`flex items-center gap-5 my-3 rounded-md  p-5 cursor-pointer ${
          unreadCount > 0 ? 'bg-slate-200' : 'bg-slate-50'
        }`}
      >
        <div className="avatar ">
          <div className="w-12 rounded-full">
            {otherParticipant?.profilePicture ? (
              <img src={otherParticipant?.profilePicture} />
            ) : (
              <DefaultProfilePIcture />
            )}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-bold">{otherParticipant?.name}</h3>
          {isTyping ? <TypingIndicator /> : lastMessageContent}
        </div>
      </div>
    </div>
  );
};

export default ChatLists;
