import { useSelector } from 'react-redux';
import DefaultProfilePIcture from '../profile/DefaultProfilePIcture';
import { Link } from 'react-router';

/* eslint-disable react/prop-types */
const ChatLists = ({ chatList, handleInitiateChat, isSmall }) => {
  //hooks
  const { userProfile } = useSelector((state) => state.chat);
  const otherParticipant = chatList?.participants.find(
    (participant) => participant?._id !== userProfile?.payload._id
  );

  const unreadCount = chatList.unreadCounts[userProfile?.payload._id];

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
      chatList?.lastMessage?.sender === userProfile?.payload._id;

    lastMessageContent = (
      <p className="text-xs text-gray-600">
        {isOwnMessage ? (
          <>
            <span className="font-medium">You:</span>{' '}
            {chatList?.lastMessage?.text}
          </>
        ) : (
          chatList?.lastMessage?.text
        )}
      </p>
    );
  }

  return (
    <div>
      {isSmall ? (
        <Link to={`/chats/${otherParticipant?.uid}`}>
          <div
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
        </Link>
      ) : (
        <div
          onClick={() => handleInitiateChat(otherParticipant)}
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
      )}
    </div>
  );
};

export default ChatLists;
