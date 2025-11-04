import PropTypes from 'prop-types'; // Import PropTypes
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import auth from '../firebase/firebase.cofig';
import Icon from '../assets/icon/letter-c (1).png';
import {
  setUser,
  toggleLoading,
} from '../redux/features/loggedInUser/userSlice';
import { Navigate } from 'react-router';
import AuthLoader from '../components/loaders/AuthLoader';

const PrivateRoute = ({ children }) => {
  //hooks
  const dispatch = useDispatch();
  const { currentUser, isLoading } = useSelector((state) => state.loggedInUser);
  // const [isDelayComplete, setIsDelayComplete] = useState(false);

  // Observing the logged-in user
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user.uid));
        dispatch(toggleLoading(false));
      } else {
        dispatch(toggleLoading(false));
      }
    });
  }, [dispatch]);

  // Delay rendering for a smooth experience
  // useEffect(() => {
  //   const delay = setTimeout(() => {
  //     setIsDelayComplete(true);
  //   }, 500); // 500ms delay
  //   return () => clearTimeout(delay); // Cleanup on unmount
  // }, []);

  // Ensure both loading is done and delay is complete
  // if (isLoading || !isDelayComplete) {
  //   return null;
  // }

  if (isLoading) {
    return <AuthLoader />;
  }

  return currentUser ? children : <Navigate to="/signUp" />;
};

// Add prop validation for children
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired, // Expect children to be a React node and required
};

export default PrivateRoute;
