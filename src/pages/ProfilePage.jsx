import { MdOutlineEmail } from 'react-icons/md';
import Profile from '../components/profile/Profile';
import ProfileContent from '../components/profile/ProfileContent';
import { CiHeart } from 'react-icons/ci';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { useUserInfoByUidQuery } from '../redux/api/users/usersApi';

import { Link, useParams } from 'react-router';
import { useContext, useEffect, useState } from 'react';
import SocketContext from '../context/SocketContext';
import { useSelector } from 'react-redux';
import {
  useAddConnectionRequestMutation,
  useFetchConnectionSuggestionsQuery,
} from '../redux/api/connections/connectionsApi';
import DefaultProfilePIcture from '../components/profile/DefaultProfilePIcture';
import toast from 'react-hot-toast';
import FloatingChatButton from '../components/common/FloatingChatButton';
import ChatModal from '../components/chats/ChatModal';
import ProfileSkeletonLoader from '../components/loaders/ProfileSkeletonLoader';
import ProfileContentSkeletonLoader from '../components/loaders/ProfileContentSkeletonLoader';
import ProfilePageRightSideContentSkeleton from '../components/loaders/ProfilePageRightSideContentSkeleton';
import ConnectionsSkeletonLoader from '../components/loaders/ConnectionsSkeletonLoader';

const ProfilePage = () => {
  //hooks
  const { uid } = useParams();
  const socket = useContext(SocketContext);

  //getting currently loggedInUser Uid
  const { currentUser: currentUserUid } = useSelector(
    (state) => state.loggedInUser
  );

  //rtk hooks
  const { data: currentUser } = useUserInfoByUidQuery(currentUserUid);

  const [connect] = useAddConnectionRequestMutation();

  const { data: suggestedConnectionsData, isLoading } =
    useFetchConnectionSuggestionsQuery(currentUser?.user?._id);

  const {
    data,
    refetch,
    isLoading: isUserDataLoading,
  } = useUserInfoByUidQuery(uid, {
    refetchOnMountOrArgChange: true,
  });

  //state to maintain chatModal
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);

  const user = data?.user;

  //handle connection request
  const handleConnect = async (recipient) => {
    const connectionsInfo = {
      requester: currentUser?.user?._id,
      recipient: recipient?._id,
      requesterUid: currentUser?.user?.uid,
      recipientUid: recipient?.uid,
    };

    //sending to server
    try {
      const response = await connect({ data: connectionsInfo }).unwrap();
      if (response.success) {
        toast.success('Connection Request Sent!');
      }
    } catch (error) {
      toast.error(error?.data?.error);
    }
  };

  const limitedSuggestions =
    suggestedConnectionsData?.suggestedConnections.slice(0, 3);

  useEffect(() => {
    socket.on('postInteraction', ({ success }) => {
      if (success) {
        setTimeout(() => {
          refetch();
        }, 1000);
      }
    });
  }, [socket, refetch]);

  //handler to open and close floating chat panel
  const chatHandler = () => {
    setIsChatModalOpen(!isChatModalOpen);
  };

  let suggestedConnections;

  if (isLoading) {
    suggestedConnections = (
      <div>
        {[...Array(3)].map((_, i) => (
          <ConnectionsSkeletonLoader key={i} />
        ))}
      </div>
    );
  }

  if (!isLoading && limitedSuggestions?.length === 0) {
    suggestedConnections = (
      <div>
        <p>Oops! Seems like you have no suggested connections!!</p>
      </div>
    );
  }

  if (!isLoading && limitedSuggestions?.length > 0) {
    suggestedConnections = limitedSuggestions?.map((connection) => (
      <Link to={`/profile/${connection?.uid}`} key={connection?._id}>
        {' '}
        <div className="flex justify-between my-5 items-center">
          <div className="flex items-center gap-5">
            <div className="avatar cursor-pointer">
              <div className="w-8 rounded-full">
                {connection?.profilePicture ? (
                  <img src={connection?.profilePicture} />
                ) : (
                  <DefaultProfilePIcture />
                )}
              </div>
            </div>
            <div className="cursor-pointer">
              <h5 className="font-bold">{connection?.name}</h5>
              {connection?.bio && (
                <p className="text-sm ">
                  {connection?.bio.slice(0, 20) + '...'}
                </p>
              )}
            </div>
          </div>

          <button
            onClick={() => handleConnect(connection)}
            className="btn btn-sm rounded bg-blue-100 text-blue-500 hover:bg-blue-500 hover:text-white"
          >
            Connect
          </button>
        </div>
      </Link>
    ));
  }

  if (!user || isUserDataLoading) {
    return (
      <div className="grid md:grid-cols-3 bg-gray-100 gap-8">
        <div className="col-span-2 space-y-5">
          <ProfileSkeletonLoader />
          <ProfileContentSkeletonLoader />
        </div>
        <ProfilePageRightSideContentSkeleton />
      </div>
    );
  }

  const { bio, birthDate, relationshipStatus, email } = user;

  return (
    <div className="grid  md:grid-cols-3   bg-gray-100 gap-8 ">
      <div className="col-span-2 ">
        <Profile
          user={user}
          currentUserId={currentUser?.user?._id}
          currentUserData={currentUser?.user}
        />
        <ProfileContent
          currentUserId={currentUser?.user?._id}
          currentUserData={currentUser?.user}
          user={user}
        />
      </div>
      <div className="col-span-1 hidden md:block relative bg-white">
        <div className="p-5 border sticky top-[6.5rem]  ">
          <div>
            <h3 className="text-xl font-bold">About</h3>

            {bio ? (
              <p className="text-sm my-2">{bio}</p>
            ) : (
              <p className="text-gray-500 italic">No bio added yet.</p>
            )}
          </div>
          <div className="grid grid-cols-[auto,1fr] gap-x-3 my-5 items-center">
            {/* Row 1 */}
            <FaRegCalendarAlt className="text-lg" />
            {birthDate ? (
              <span className="font-semibold text-sm">{birthDate}</span>
            ) : (
              <p className="text-gray-500 italic">Not added yet.</p>
            )}

            {/* Row 2 */}
            <CiHeart className="text-lg" />
            {relationshipStatus ? (
              <span className="font-semibold text-sm">
                {relationshipStatus}
              </span>
            ) : (
              <p className="text-gray-500 italic">Not added yet.</p>
            )}

            {/* Row 3 */}
            <MdOutlineEmail className="text-lg" />
            {email ? (
              <span className="font-semibold text-sm">{email}</span>
            ) : (
              <p className="text-gray-500 italic">Not added yet.</p>
            )}
          </div>
        </div>
        <div className="p-5 border my-5 sticky top-[20.85rem]">
          <h4 className="font-bold my-5">Suggested Connections</h4>
          {suggestedConnections}
          <div className="text-sm font-semibold text-blue-600 mt-5">
            <Link to="/connections">See more</Link>
          </div>
        </div>
      </div>

      {/* Modern Floating Message Icon - Only show when viewing someone else's profile */}
      {currentUser?.user?._id !== user?._id && (
        <FloatingChatButton user={user} chatHandler={chatHandler} />
      )}

      {/* chat modal  */}
      {isChatModalOpen && (
        <ChatModal selectedUser={user} chatHandler={chatHandler} />
      )}
    </div>
  );
};

export default ProfilePage;
