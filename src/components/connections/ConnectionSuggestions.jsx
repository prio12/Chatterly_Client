/* eslint-disable react/prop-types */
import toast, { Toaster } from 'react-hot-toast';
import { useAddConnectionRequestMutation } from '../../redux/api/connections/connectionsApi';
import DefaultProfilePIcture from '../profile/DefaultProfilePIcture';

const ConnectionSuggestions = ({ user, currentlyLoggedInUserData }) => {
  //mutation hook
  const [connect] = useAddConnectionRequestMutation();

  //handle connection request
  const handleConnect = async () => {
    const connectionsInfo = {
      requester: currentlyLoggedInUserData?._id,
      recipient: user?._id,
      requesterUid: currentlyLoggedInUserData?.uid,
      recipientUid: user?.uid,
    };

    //sending to server
    try {
      const response = await connect({ data: connectionsInfo }).unwrap();
      console.log(response);
    } catch (error) {
      toast.error(error?.data?.error);
    }
  };
  return (
    <div className="max-h-[600px] overflow-y-scroll no-scrollbar">
      <div className="flex items-center flex-wrap gap-8 border border-gray-200 p-2 my-5">
        <div className="avatar">
          <div className="rounded-full w-16">
            {user?.profilePicture ? (
              <img src={user?.profilePicture} />
            ) : (
              <DefaultProfilePIcture />
            )}
          </div>
        </div>
        <div>
          <h6 className="font-bold text-sm">{user?.name}</h6>
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
            onClick={handleConnect}
            className="btn  rounded bg-blue-100 text-blue-500 hover:bg-blue-500 hover:text-white "
          >
            Connect
          </button>{' '}
          <Toaster position="bottom-center" />
          <button className="btn  rounded bg-red-100 text-red-500 hover:bg-red-500 hover:text-white ">
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConnectionSuggestions;
