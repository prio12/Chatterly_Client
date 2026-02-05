/* eslint-disable react/prop-types */
import { useState } from 'react';
import { CiLocationOn } from 'react-icons/ci';
import { FaRegCalendar } from 'react-icons/fa6';
import { MdOutlineEdit } from 'react-icons/md';
import { PiSuitcaseSimple } from 'react-icons/pi';
import DefaultCoverPhoto from './DefaultCoverPhoto';
import DefaultProfilePIcture from './DefaultProfilePIcture';
import UpdateNameModal from './modals/UpdateNameModal';
import ProfileMediaModal from './modals/ProfileMediaModal';
import { useParams } from 'react-router';

import toast from 'react-hot-toast';
import { formatDistanceToNow } from 'date-fns';
import { UserWithPosts } from '../../types';
import { useAppSelector } from '../../hooks/hooks';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import {
  useAcceptConnectionRequestMutation,
  useAddConnectionRequestMutation,
  useGetConnectionStatusQuery,
  useIgnoreAConnectionRequestMutation,
} from '../../redux/api/connections/connectionsApi';

interface ProfileProps {
  user: UserWithPosts;
  currentUserId?: string;
  currentUserData?: UserWithPosts;
}

const Profile = ({ user, currentUserId, currentUserData }: ProfileProps) => {
  const { name, profilePicture, coverPhoto, location, profession, createdAt } =
    user;

  //hooks
  const [acceptRequest] = useAcceptConnectionRequestMutation();
  const [ignoreRequest] = useIgnoreAConnectionRequestMutation();
  const [connect] = useAddConnectionRequestMutation();

  //using rtk to get connection status between two users
  const { data, isLoading } = useGetConnectionStatusQuery(
    {
      userId: currentUserId,
      targetId: user?._id,
    },
    { refetchOnMountOrArgChange: true }
  );
  const { currentUser } = useAppSelector((state) => state.loggedInUser);
  const { uid } = useParams();

  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState('');
  const [error, setError] = useState(null);
  const [isUpdateNameOpen, setIsUpdateNameOpen] = useState(false);

  // Converts createdAt timestamp into a human-readable relative time format.
  const timeAgo = (timestamp: string) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  };

  //handle ignore/delete a connection request
  const handleIgnoreARequest = async () => {
    await ignoreRequest(data?.connectionId);
  };

  //handle connection request
  const handleConnect = async () => {
    const connectionsInfo = {
      requester: currentUserId,
      recipient: user?._id,
      requesterUid: currentUser,
      recipientUid: user?.uid,
    };

    //sending to server
    try {
      const response = await connect({ data: connectionsInfo }).unwrap();
      if (response.success) {
        toast.success('Connection Request Sent!');
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'data' in err) {
        const error = err as FetchBaseQueryError;
        const message =
          (error.data as { error?: string })?.error || 'Something went wrong';
        toast.error(message);
      } else if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error('Something went wrong');
      }
    }
  };

  const handleAcceptRequest = async () => {
    const notificationInfo = {
      // notificationSender: request?.requester?.uid,
      notificationSender: currentUserData,
      notificationRecipient: user,
    };

    try {
      await acceptRequest({
        id: data?.connectionId,
        data: notificationInfo,
      });
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  let connectionLabel;

  if (isLoading) {
    connectionLabel = <div>Loading...</div>;
  } else if (!isLoading && !data?.connection) {
    connectionLabel = (
      <button
        onClick={handleConnect}
        className="btn  rounded bg-blue-100 text-blue-500 hover:bg-blue-500 hover:text-white "
      >
        Connect
      </button>
    );
  } else if (
    !isLoading &&
    data?.connection &&
    data?.status === 'pending' &&
    data?.action === 'accept'
  ) {
    connectionLabel = (
      <button
        onClick={handleAcceptRequest}
        className="btn  rounded bg-blue-100 text-blue-500 hover:bg-blue-500 hover:text-white "
      >
        Accept
      </button>
    );
  } else if (
    !isLoading &&
    data?.connection &&
    data?.status === 'pending' &&
    data?.action === 'cancel'
  ) {
    connectionLabel = (
      <button
        onClick={handleIgnoreARequest}
        className="btn  rounded bg-red-100 text-red-500 hover:bg-red-500 hover:text-white "
      >
        Cancel
      </button>
    );
  } else if (
    !isLoading &&
    data?.connection &&
    data?.status === 'accepted' &&
    data?.action === 'disconnect'
  ) {
    connectionLabel = (
      <button
        onClick={handleIgnoreARequest}
        className="btn  rounded bg-red-100 text-red-500 hover:bg-red-500 hover:text-white "
      >
        Disconnect
      </button>
    );
  }
  return (
    <div className="bg-white border">
      <div
        onClick={() => {
          if (user?.uid !== currentUser) {
            return;
          }
          setType('Cover_Photo');
          setIsOpen(true);
        }}
        className="w-full cursor-pointer md:h-[400px]"
      >
        {coverPhoto ? (
          <img
            src={user.coverPhoto}
            alt="cover photo"
            className="rounded-md max-w-full max-h-full object-cover "
          />
        ) : (
          <DefaultCoverPhoto />
        )}
      </div>

      <div className="flex items-center px-5   justify-between">
        <div className="flex items-center gap-5">
          <div
            onClick={() => {
              if (user?.uid !== currentUser) {
                return;
              }
              setType('Profile_Pic');
              setIsOpen(true);
            }}
            className="avatar cursor-pointer mt-[-48px]"
          >
            <div className="w-36 rounded-full bg-gray-100">
              {profilePicture ? (
                <img
                  className="w-full object-cover"
                  src={user.profilePicture}
                />
              ) : (
                <DefaultProfilePIcture />
              )}
            </div>
          </div>
          <ProfileMediaModal
            user={user}
            error={error}
            setError={setError}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            type={type}
          />
          <div>
            <h5 className="text-xl font-bold">{name}</h5>
            {user?._id !== currentUserId && (
              <div className="block md:hidden mt-3">{connectionLabel} </div>
            )}
          </div>
        </div>
        {currentUser === uid && (
          <div className="hidden md:block ">
            <button
              onClick={() => setIsUpdateNameOpen(true)}
              className="btn  rounded bg-blue-100 text-blue-500 hover:bg-blue-500 hover:text-white "
            >
              <span>
                <MdOutlineEdit className="inline mr-2" />
              </span>
              Edit Profile
            </button>
          </div>
        )}
        {user?._id !== currentUserId && (
          <div className="hidden md:block">{connectionLabel}</div>
        )}

        {currentUser === uid && (
          <div
            onClick={() => setIsUpdateNameOpen(true)}
            className="block md:hidden "
          >
            <MdOutlineEdit className="text-xl" />
          </div>
        )}
        <UpdateNameModal
          user={user}
          isUpdateNameOpen={isUpdateNameOpen}
          setIsUpdateNameOpen={setIsUpdateNameOpen}
        />
      </div>
      <div className="md:flex hidden items-center px-5 gap-5 my-3">
        {profession && (
          <div className="flex items-center gap-3">
            <PiSuitcaseSimple />
            <p>{profession}</p>
          </div>
        )}
        {location && (
          <div className="flex items-center gap-3">
            <CiLocationOn />
            <p>{location}</p>
          </div>
        )}
        {createdAt && (
          <div className="flex items-center gap-3">
            <FaRegCalendar />
            <p> Joined {timeAgo(createdAt)}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
