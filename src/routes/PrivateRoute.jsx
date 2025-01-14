import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
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

  //observing the loggedInUser
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user.uid);
        dispatch(setUser(user.uid));
        dispatch(toggleLoading(false));
      } else {
        dispatch(toggleLoading(false));
      }
    });
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading.....</div>;
  }
  return currentUser ? <Outlet /> : <Navigate to="/signUp" />;
};

export default PrivateRoute;
