/* eslint-disable react/prop-types */
import { Link } from 'react-router';
import ChatLists from './ChatLists';
import { FaHandPointRight } from 'react-icons/fa6';
import FriendsList from './FriendsList';

const ChatConnectionsContent = ({
  chatLists,
  myConnections,
  activeConnections,
  handleInitiateChat,
  isSmall,
}) => {
  if (chatLists?.length === 0 && myConnections?.length === 0) {
    return (
      <div className="my-8">
        <div className="my-5 text-gray-600 font-semibold">
          <p className="mb-5 ">
            Looks like you haven’t made any friends yet make some friends to
            initiate chats{' '}
          </p>
        </div>
        <div className="flex items-center gap-5">
          <p className="text-blue-600 font-semibold">Connect with People</p>
          <Link to="/connections">
            <FaHandPointRight className="text-2xl text-blue-600" />{' '}
          </Link>
        </div>
      </div>
    );
  } else if (chatLists?.length === 0 && myConnections?.length > 0) {
    return (
      <div>
        <div className="flex flex-col items-center justify-center text-center p-5">
          <p className="text-gray-600  mb-2 text-sm font-semibold">
            Looks like you haven’t started a chat yet.
          </p>
          <p className="text-gray-500">
            Select a friend from your list to say hello and start a
            conversation.
          </p>
        </div>
        <FriendsList
          isSmall={isSmall}
          myConnections={myConnections}
          activeConnections={activeConnections}
          handleInitiateChat={handleInitiateChat}
        />
      </div>
    );
  } else {
    return (
      <div>
        <FriendsList
          isSmall={isSmall}
          myConnections={myConnections}
          activeConnections={activeConnections}
          handleInitiateChat={handleInitiateChat}
        />
        <ChatLists />
      </div>
    );
  }
};

export default ChatConnectionsContent;
