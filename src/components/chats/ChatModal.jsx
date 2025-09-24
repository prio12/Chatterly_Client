import { IoCloseSharp } from 'react-icons/io5';
import ChatPanel from './ChatPanel';
import { useSelector } from 'react-redux';
import { useUserInfoByUidQuery } from '../../redux/api/users/usersApi';

/* eslint-disable react/prop-types */
const ChatModal = ({ chatHandler, selectedUser }) => {
  const { currentUser: currentUserUid } = useSelector(
    (state) => state.loggedInUser
  );

  //rtk hooks
  const { data: currentUser } = useUserInfoByUidQuery(currentUserUid);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="h-3/4  w-full   md:w-1/2 lg:w-1/2 bg-base-100 shadow-2xl md:rounded-2xl mt-12 overflow-hidden p-5">
        {/* Your content goes here */}
        <div className="flex justify-end">
          <IoCloseSharp className="cursor-pointer" onClick={chatHandler} />
        </div>
        <ChatPanel
          selectedUserData={selectedUser}
          loggedInUserId={currentUser?.user?._id}
        />
      </div>
    </div>
  );
};

export default ChatModal;
