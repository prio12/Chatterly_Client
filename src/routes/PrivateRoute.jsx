import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import auth from '../firebase/firebase.cofig';
import {
  setUser,
  toggleLoading,
} from '../redux/features/loggedInUser/userSlice';
import { Navigate, Outlet } from 'react-router';

const PrivateRoute = () => {
  //hooks
  const dispatch = useDispatch();
  const { currentUser, isLoading } = useSelector((state) => state.loggedInUser);
  const [isDelayComplete, setIsDelayComplete] = useState(false);

  //observing the loggedInUser
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
  useEffect(() => {
    const delay = setTimeout(() => {
      setIsDelayComplete(true);
    }, 500); // 500ms delay
    return () => clearTimeout(delay); // Cleanup on unmount
  }, []);

  // Ensure both loading is done and delay is complete
  if (isLoading || !isDelayComplete) {
    return null; // Render nothing
  }

  if (isLoading) {
    return <div>Loading.....</div>;
  }
  return currentUser ? <Outlet /> : <Navigate to="/signUp" />;
};

export default PrivateRoute;
