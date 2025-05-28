import ChatBoxHeader from '../components/chats/ChatBoxHeader';
import ChatFooter from '../components/chats/ChatFooter';
import ChatLists from '../components/chats/ChatLists';
import ChatMessages from '../components/chats/ChatMessages';
import SearchBox from '../components/chats/SearchBox';
import useBreakpoint from '../hooks/useBreakpoint';

const Chats = () => {
  //checking screen size with manual hook
  const isSmall = useBreakpoint();
  console.log('checking size in chat', isSmall);

  return (
    <div className="grid grid-cols-3 gap-5">
      <div className="col-span-1 bg-white p-5 hidden md:block">
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
      <div
        style={{ height: 'var(--chat-height)' }}
        className="md:col-span-2 col-span-3 bg-white flex flex-col"
      >
        {/* Chat Header */}
        <div className="h-20 mb-5">
          {' '}
          {/* Adjust height as needed */}
          <ChatBoxHeader />
        </div>

        {/* Chat Messages - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          <ChatMessages />
        </div>

        {/* Chat Footer */}
        <div className="h-20 border-t mt-5">
          {' '}
          {/* Adjust height as needed */}
          <ChatFooter />
        </div>
      </div>
    </div>
  );
};

export default Chats;
