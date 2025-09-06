import { useSelector } from 'react-redux';
import DefaultProfilePIcture from '../profile/DefaultProfilePIcture';

/* eslint-disable react/prop-types */
const ChatLists = ({ chatList }) => {
  //hooks
  const { currentUser } = useSelector((state) => state.loggedInUser);
  const participant = chatList?.participants.find(
    (participant) => participant?.uid !== currentUser
  );

  console.log(chatList);

  return (
    <div>
      <div className="flex items-center gap-5 my-3 rounded-md  p-5 bg-slate-50">
        <div className="avatar ">
          <div className="w-12 rounded-full">
            {participant?.profilePicture ? (
              <img src={participant?.profilePicture} />
            ) : (
              <DefaultProfilePIcture />
            )}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-bold">{participant?.name}</h3>
          <p className="text-xs">{chatList?.lastMessage?.text}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatLists;
