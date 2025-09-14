import { useSelector } from 'react-redux';
import DefaultProfilePIcture from '../profile/DefaultProfilePIcture';

/* eslint-disable react/prop-types */
const ChatMessages = ({ message }) => {
  console.log(message);
  const { currentUser } = useSelector((state) => state.loggedInUser);
  return (
    <div>
      {message?.sender?.uid !== currentUser ? (
        <div className="chat chat-start">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              {message?.sender?.profilePicture ? (
                <img
                  alt="Tailwind CSS chat bubble component"
                  src={message?.sender?.profilePicture}
                />
              ) : (
                <DefaultProfilePIcture />
              )}
            </div>
          </div>
          <div className="chat-header">
            {message?.sender?.name}
            <time className="text-xs opacity-50">12:45</time>
          </div>
          <div className="chat-bubble">{message?.text}</div>
          <div className="chat-footer opacity-50">Delivered</div>
        </div>
      ) : (
        <div className="chat chat-end">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              {message?.sender?.profilePicture ? (
                <img
                  alt="Tailwind CSS chat bubble component"
                  src={message?.sender?.profilePicture}
                />
              ) : (
                <DefaultProfilePIcture />
              )}
            </div>
          </div>
          <div className="chat-header">
            {message?.sender?.name}
            <time className="text-xs opacity-50">12:46</time>
          </div>
          <div className="chat-bubble">{message?.text}</div>
          <div className="chat-footer opacity-50">Seen at 12:46</div>
        </div>
      )}
    </div>
  );
};

export default ChatMessages;
