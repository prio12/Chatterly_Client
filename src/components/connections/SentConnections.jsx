/* eslint-disable react/prop-types */
import { Link } from 'react-router';
import DefaultProfilePIcture from '../profile/DefaultProfilePIcture';
import { formatDistanceToNow } from 'date-fns';
import { useIgnoreAConnectionRequestMutation } from '../../redux/api/connections/connectionsApi';

const SentConnections = ({ request }) => {
  //hooks
  const [ignoreRequest] = useIgnoreAConnectionRequestMutation();

  // Converts createdAt timestamp into a human-readable relative time format.
  const timeAgo = (timestamp) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  };

  //handle cancel sent Request
  const handleCancelRequest = async () => {
    const confirmation = window.confirm('Are you sure to cancel the request?');
    if (!confirmation) {
      return;
    }

    //cancel request
    await ignoreRequest(request._id);
  };

  return (
    <div className="max-h-[600px] overflow-y-scroll no-scrollbar">
      <div className="flex items-center justify-between border border-gray-200 p-2 my-5">
        <div className="flex items-center gap-5">
          <Link to={`/profile/${request?.recipient?.uid}`}>
            <div className="avatar">
              <div className="rounded-full w-16">
                {request?.recipient?.profilePicture ? (
                  <img src={request?.recipient?.profilePicture} />
                ) : (
                  <DefaultProfilePIcture />
                )}
              </div>
            </div>
          </Link>
          <div>
            <Link to={`/profile/${request?.requester?.uid}`}>
              {' '}
              <h6 className="font-bold text-sm">{request?.recipient?.name}</h6>
            </Link>
            <p className="text-sm text-slate-500">
              {timeAgo(request.createdAt)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <button
            onClick={handleCancelRequest}
            className="btn  rounded bg-red-100 text-red-500 hover:bg-red-500 hover:text-white "
          >
            Cancel Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default SentConnections;
