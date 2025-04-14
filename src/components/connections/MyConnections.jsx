import { SiImessage } from 'react-icons/si';
import DefaultProfilePIcture from '../profile/DefaultProfilePIcture';
import { useIgnoreAConnectionRequestMutation } from '../../redux/api/connections/connectionsApi';
import toast from 'react-hot-toast';
import { Link } from 'react-router';

/* eslint-disable react/prop-types */
const MyConnections = ({ connection }) => {
  //hooks
  const [removeAConnection] = useIgnoreAConnectionRequestMutation();

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
      </div>
    </div>
  );
};

export default MyConnections;
