/* eslint-disable react/prop-types */
import { Link } from 'react-router';
import DefaultProfilePIcture from '../profile/DefaultProfilePIcture';
import { useAcceptConnectionRequestMutation } from '../../redux/api/connections/connectionsApi';
import toast, { Toaster } from 'react-hot-toast';

const ConnectionRequests = ({ request, currentlyLoggedInUserData }) => {
  console.log(request._id);

  //hooks
  const [acceptRequest] = useAcceptConnectionRequestMutation();

  const handleAcceptRequest = async () => {
    const notificationInfo = {
      requesterUid: request?.requester?.uid,
      currentlyLoggedInUserData,
    };

    try {
      const response = await acceptRequest({
        id: request._id,
        data: notificationInfo,
      });

      console.log(response);
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="max-h-[600px] overflow-y-scroll no-scrollbar">
      <div className="flex items-center flex-wrap gap-8 border border-gray-200 p-2 my-5">
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
          {/* showing mutual connections */}
          <div className="flex items-center gap-8">
            <div className="avatar-group -space-x-3">
              <div className="avatar">
                <div className="w-6">
                  <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
              </div>
              <div className="avatar">
                <div className="w-6">
                  <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-800">
                4 mutual connections
              </p>
              <p className="text-xs text-gray-600">7 days</p>
            </div>
          </div>
        </div>
        <div>
          <button
            onClick={handleAcceptRequest}
            className="btn  rounded bg-blue-100 text-blue-500 hover:bg-blue-500 hover:text-white "
          >
            Accept Connection
          </button>{' '}
          <Toaster position="bottom-center" />
          <button className="btn  rounded bg-red-100 text-red-500 hover:bg-red-500 hover:text-white ">
            Ignore Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConnectionRequests;
