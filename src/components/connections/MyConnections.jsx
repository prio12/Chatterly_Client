import { SiImessage } from 'react-icons/si';
import DefaultProfilePIcture from '../profile/DefaultProfilePIcture';
import {
  useAddConnectionRequestMutation,
  useIgnoreAConnectionRequestMutation,
} from '../../redux/api/connections/connectionsApi';
import toast from 'react-hot-toast';
import { Link, useLocation, useParams } from 'react-router';
import { useSelector } from 'react-redux';

/* eslint-disable react/prop-types */
const MyConnections = ({
  connection,
  loggedInUserConnections,
  currentUserData,
}) => {
  //hooks
  const [removeAConnection] = useIgnoreAConnectionRequestMutation();
  const [connect] = useAddConnectionRequestMutation();
  const { pathname } = useLocation();
  const { uid } = useParams();
  const { currentUser } = useSelector((state) => state.loggedInUser);

  //checking if own profile
  const ownProfile = currentUser === connection?.myConnection?.uid;

  //checking mutual connections
  const isInConnectionsList = loggedInUserConnections?.some(
    (conn) => conn?.myConnection?.uid === connection?.myConnection?.uid
  );

  //handle connection request
  const handleConnect = async (recipient) => {
    const connectionsInfo = {
      requester: currentUserData?._id,
      recipient: recipient?._id,
      requesterUid: currentUserData?.uid,
      recipientUid: recipient?.uid,
    };

    // sending to server
    try {
      const response = await connect({ data: connectionsInfo }).unwrap();
      if (response.success) {
        toast.success('Connection Request Sent!');
      }
    } catch (error) {
      toast.error(error?.data?.error);
    }
  };

  //delete A fried or connection from myConnections
  const handleRemoveConnection = async () => {
    try {
      //getting confirmation from the user
      const confirmation = window.confirm(
        `Are you sure to remove ${connection?.myConnection?.name} from your connections?`
      );
      if (!confirmation) {
        return;
      }
      const response = await removeAConnection(
        connection?.connectionId.toString()
      ).unwrap();

      if (response?.success) {
        console.log(response?.success);
        toast.success(
          ` ${connection?.myConnection?.name} removed from connection successfully!`
        );
      }
    } catch (error) {
      toast.error(`${error?.message}`);
    }
  };

  let buttons;

  if (pathname === '/connections' || uid === currentUser) {
    buttons = (
      <div className="flex items-center gap-5">
        <button
          className="btn px-3 md:px-8  btn-md rounded bg-blue-100 text-blue-500 hover:bg-blue-200
         hover:text-white"
        >
          <SiImessage className="text-xl font-semibold text-blue-600" />
        </button>
        <button
          onClick={handleRemoveConnection}
          className="btn  btn-md rounded bg-red-100 text-red-500 hover:bg-red-500 hover:text-white"
        >
          Disconnect
        </button>
      </div>
    );
  } else {
    if (ownProfile) {
      buttons = null;
    } else if (!isInConnectionsList) {
      buttons = (
        <button
          onClick={() => handleConnect(connection?.myConnection)}
          className="btn  rounded bg-blue-100 text-blue-500 hover:bg-blue-500 hover:text-white "
        >
          Connect
        </button>
      );
    } else if (isInConnectionsList) {
      buttons = (
        <div className="flex items-center gap-5">
          <button
            className="btn px-3 md:px-8  btn-md rounded bg-blue-100 text-blue-500 hover:bg-blue-200
       hover:text-white"
          >
            <SiImessage className="text-xl font-semibold text-blue-600" />
          </button>
          <button
            onClick={handleRemoveConnection}
            className="btn  btn-md rounded bg-red-100 text-red-500 hover:bg-red-500 hover:text-white"
          >
            Disconnect
          </button>
        </div>
      );
    }
  }

  return (
    <div className="max-h-[600px] overflow-y-scroll border-b-2  p-2 no-scrollbar">
      <div className="flex items-center justify-between ">
        <Link to={`/profile/${connection?.myConnection?.uid}`}>
          <div className="flex items-center gap-5">
            <div className="avatar">
              <div className="w-12 rounded-full">
                {connection?.myConnection?.profilePicture ? (
                  <img src={connection?.myConnection?.profilePicture} />
                ) : (
                  <DefaultProfilePIcture />
                )}
              </div>
            </div>
            <h5 className="font-semibold">{connection?.myConnection?.name}</h5>
          </div>
        </Link>
        {buttons}
      </div>
    </div>
  );
};

export default MyConnections;
