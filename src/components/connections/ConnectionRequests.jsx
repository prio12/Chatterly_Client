/* eslint-disable react/prop-types */
import { Link } from 'react-router';
import DefaultProfilePIcture from '../profile/DefaultProfilePIcture';
import {
  useAcceptConnectionRequestMutation,
  useIgnoreAConnectionRequestMutation,
} from '../../redux/api/connections/connectionsApi';
import toast from 'react-hot-toast';
import { formatDistanceToNow } from 'date-fns';

const ConnectionRequests = ({ request, currentlyLoggedInUserData }) => {
  console.log('printing request', request);
  //hooks
  const [acceptRequest] = useAcceptConnectionRequestMutation();
  const [ignoreRequest] = useIgnoreAConnectionRequestMutation();

  const handleAcceptRequest = async () => {
    const notificationInfo = {
      // notificationSender: request?.requester?.uid,
      notificationSender: currentlyLoggedInUserData,
      notificationRecipient: request?.requester,
    };

    try {
      await acceptRequest({
        id: request._id,
        data: notificationInfo,
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Converts createdAt timestamp into a human-readable relative time format.
  const timeAgo = (timestamp) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  };

  //handle ignore/delete a connection request
  const handleIgnoreARequest = async () => {
    await ignoreRequest(request._id);
  };
  return (
    <div className="max-h-[600px] overflow-y-scroll no-scrollbar">
      <div className="flex items-center flex-wrap gap-5 justify-between border border-gray-200 shadow-sm hover:shadow-md p-5 my-5">
        <div className="flex items-center gap-5">
          <Link to={`/profile/${request?.requester?.uid}`}>
            <div className="avatar">
              <div className="rounded-full w-16">
                {request?.requester?.profilePicture ? (
                  <img src={request?.requester?.profilePicture} />
                ) : (
                  <DefaultProfilePIcture />
                )}
              </div>
            </div>
          </Link>
          <div>
            <Link to={`/profile/${request?.requester?.uid}`}>
              {' '}
              <h6 className="font-bold text-sm">{request?.requester?.name}</h6>
            </Link>
            <p className="text-sm text-slate-500">
              {timeAgo(request.createdAt)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-5 ">
          <button
            onClick={handleAcceptRequest}
            className="btn  rounded bg-blue-100 text-blue-500 hover:bg-blue-500 hover:text-white "
          >
            Accept Connection
          </button>{' '}
          <button
            onClick={handleIgnoreARequest}
            className="btn  rounded bg-red-100 text-red-500 hover:bg-red-500 hover:text-white "
          >
            Ignore Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConnectionRequests;
