/* eslint-disable react/prop-types */
import toast from 'react-hot-toast';
import DefaultProfilePIcture from '../profile/DefaultProfilePIcture';
import { Link } from 'react-router';
import { useAddConnectionRequestMutation } from '../../redux/api/connections/connectionsApi';

const ConnectionSuggestions = ({
  user,
  currentlyLoggedInUserData,
  setSuggestedConnection,
  suggestedConnections,
}) => {
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
      if (response.success) {
        toast.success('Connection Request Sent!');
      }
    } catch (error) {
      toast.error(error?.data?.error);
    }
  };

  const handleRemoveFromSuggestions = () => {
    const filteredSuggestions = suggestedConnections.filter(
      (suggestedUser) => suggestedUser._id !== user?._id
    );

    setSuggestedConnection(filteredSuggestions);
  };
  return (
    <div className="max-h-[600px] overflow-y-scroll no-scrollbar">
      <div className="flex items-center flex-wrap gap-5 justify-between border shadow-sm hover:shadow-md p-5 my-5">
        <div className="flex items-center gap-5 ">
          <Link to={`/profile/${user?.uid}`}>
            <div className="avatar">
              <div className="rounded-full w-16">
                {user?.profilePicture ? (
                  <img src={user?.profilePicture} />
                ) : (
                  <DefaultProfilePIcture />
                )}
              </div>
            </div>
          </Link>
          <div>
            <Link to={`/profile/${user?.uid}`}>
              <h6 className="font-bold text-sm">{user?.name}</h6>
            </Link>
            {/* showing mutual connections */}
          </div>
        </div>
        <div className="flex items-center  gap-5">
          <button
            onClick={handleConnect}
            className="btn  rounded bg-blue-100 text-blue-500 hover:bg-blue-500 hover:text-white "
          >
            Connect
          </button>{' '}
          <button
            onClick={handleRemoveFromSuggestions}
            className="btn  rounded bg-red-100 text-red-500 hover:bg-red-500 hover:text-white "
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConnectionSuggestions;
