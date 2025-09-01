/* eslint-disable react/prop-types */
import { useParams } from 'react-router';
import ChatBoxHeader from './ChatBoxHeader';
import ChatFooter from './ChatFooter';
import ChatMessages from './ChatMessages';
import { useUserInfoByUidQuery } from '../../redux/api/users/usersApi';
import { useSelector } from 'react-redux';

const ChatPanel = ({ selectedUserData }) => {
  //getting the uid from url
  const { uid } = useParams();
  const { activeConnections, myConnections } = useSelector(
    (state) => state.chat
  );

  //fetching the data of the user who was clicked to chat
  const { data: clickedUserData } = useUserInfoByUidQuery(uid, { skip: !uid });

  const clickedUser = clickedUserData?.user;

  return (
    <div className="h-[var(--chat-height)]   flex flex-col">
      <div className="h-20 bg-white  p-4">
        <ChatBoxHeader
          selectedUserData={selectedUserData || clickedUser}
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
