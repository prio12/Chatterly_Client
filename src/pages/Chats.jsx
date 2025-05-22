import ChatBoxHeader from '../components/chats/ChatBoxHeader';
import ChatLists from '../components/chats/ChatLists';
import SearchBox from '../components/chats/SearchBox';

const Chats = () => {
  return (
    <div className="grid grid-cols-3 gap-5  bg-gray-100">
      <div className="col-span-1 bg-white p-5">
        {/* active chats for md and lg screen */}
        <div className="border-b hidden md:block ">
          <h3 className="text-xl font-bold mb-5">
            Active Chats{' '}
            <span className="bg-blue-100 rounded-full text-blue-600 px-2">
              6
            </span>
          </h3>
        </div>
        <SearchBox />
        <ChatLists />
      </div>
      <div className="col-span-2 bg-white">
        <ChatBoxHeader />
      </div>
    </div>
  );
};

export default Chats;
