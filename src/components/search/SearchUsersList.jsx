import { Link } from 'react-router';
import DefaultProfilePIcture from '../profile/DefaultProfilePIcture';

/* eslint-disable react/prop-types */
const SearchUsersList = ({ user }) => {
  return (
    <div className="mb-5">
      <Link to={`/profile/${user?.uid}`}>
        <div className="flex items-center gap-5">
          <div className="avatar">
            <div className="w-12 rounded-full">
              {user?.profilePicture ? (
                <img src={user?.profilePicture} />
              ) : (
                <DefaultProfilePIcture />
              )}
            </div>
          </div>
          <h5 className="font-semibold">{user?.name}</h5>
        </div>
      </Link>
    </div>
  );
};

export default SearchUsersList;
