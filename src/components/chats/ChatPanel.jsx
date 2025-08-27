/* eslint-disable react/prop-types */
import { useParams } from 'react-router';
import ChatBoxHeader from './ChatBoxHeader';
import ChatFooter from './ChatFooter';
import ChatMessages from './ChatMessages';

const ChatPanel = ({ selectedUserData, activeConnections, myConnections }) => {
  //getting the uid from url
  const { uid } = useParams();

  return (
    <div className="h-[var(--chat-height)]   flex flex-col">
      <div className="h-20 bg-white  p-4">
        <ChatBoxHeader
          selectedUserData={selectedUserData}
          activeConnections={activeConnections}
        />
      </div>
      <div className="flex-1 overflow-y-auto bg-white p-4">
        <ChatMessages
          selectedUserData={selectedUserData}
          myConnections={myConnections}
        />
      </div>
      <div className="h-20 bg-white  p-4">
        <ChatFooter />
      </div>
    </div>
  );
};

export default ChatPanel;
