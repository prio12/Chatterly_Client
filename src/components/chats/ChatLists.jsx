import { useSelector } from 'react-redux';
import DefaultProfilePIcture from '../profile/DefaultProfilePIcture';
import {
  useCreateEmptyConversationMutation,
  useMarkConversationAsReadMutation,
} from '../../redux/api/messaging/messagingApi';
import { useNavigate } from 'react-router';
import { useContext, useEffect, useState } from 'react';
import SocketContext from '../../context/SocketContext';
import getOrCreateConversation from '../../utilities/conversation/conversationUtils';

/* eslint-disable react/prop-types */
const ChatLists = ({ chatList: conversation, handleInitiateChat, isSmall }) => {
  //hooks
  const { userProfile } = useSelector((state) => state.chat);
  const [setMarkAsRead] = useMarkConversationAsReadMutation();
  const [createConversation] = useCreateEmptyConversationMutation();
  const navigate = useNavigate();
  const socket = useContext(SocketContext);

  const [unreadCount, setUnreadCount] = useState(0);

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
    //passing necessary arguments to the getOrCreateConversation function
    await getOrCreateConversation({
      socket,
      createConversation,
      conversationId: conversation?._id,
    });
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
          {lastMessageContent}
        </div>
      </div>
    </div>
  );
};

export default ChatLists;
