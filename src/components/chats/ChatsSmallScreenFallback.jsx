/* eslint-disable react/prop-types */
import { BsChatSquareDots } from 'react-icons/bs';
import SearchBox from './SearchBox';
import ChatConnectionsContent from './ChatConnectionsContent';
const ChatsSmallScreenFallback = ({
  myConnections,
  chatLists,
  activeConnections,
}) => {
  return (
    <div className="p-3">
      <div className="flex items-center gap-2 text-xl font-semibold border-b pb-2 border-blue-500">
        <BsChatSquareDots />
        <p>Chats</p>
      </div>
      <div className="my-3">
        <SearchBox />
      </div>
      {/* <div>{chatContentType}</div> */}
      <ChatConnectionsContent
        chatLists={chatLists}
        myConnections={myConnections}
        activeConnections={activeConnections}
      />
    </div>
  );
};

export default ChatsSmallScreenFallback;
