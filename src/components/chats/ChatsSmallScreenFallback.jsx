/* eslint-disable react/prop-types */
import { BsChatSquareDots } from 'react-icons/bs';
import SearchBox from './SearchBox';
import { Link } from 'react-router';
import { FaHandPointRight } from 'react-icons/fa';
const ChatsSmallScreenFallback = ({ myConnections, chatLists }) => {
  console.log(myConnections);
  console.log(chatLists, 'chatLists');

  let chatContentType;

  if (chatLists?.length === 0 && myConnections?.length === 0) {
    chatContentType = (
      <div className="my-8">
        <div className="my-5 text-gray-600 font-semibold">
          <p className="mb-5">
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
  }
  return (
    <div className="p-3">
      <div className="flex items-center gap-2 text-xl font-semibold border-b pb-2 border-blue-500">
        <BsChatSquareDots />
        <p>Chats</p>
      </div>
      <div className="my-3">
        <SearchBox />
      </div>
      <div>{chatContentType}</div>
    </div>
  );
};

export default ChatsSmallScreenFallback;
