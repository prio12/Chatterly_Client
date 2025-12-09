import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import auth from '../firebase/firebase.cofig';
import {
  setUser,
  toggleLoading,
} from '../redux/features/loggedInUser/userSlice';
import { Navigate } from 'react-router';
import AuthLoader from '../components/loaders/AuthLoader';
import * as React from 'react';
import { useAppSelector } from '../hooks/hooks';

type PrivateRouteProps = {
  children: React.ReactNode;
};

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  //hooks
  const dispatch = useDispatch();
  const { currentUser, isLoading } = useAppSelector(
    (state) => state.loggedInUser
  );

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

  if (isLoading) {
    return <AuthLoader />;
  }

  return currentUser ? children : <Navigate to="/signUp" />;
};

export default PrivateRoute;
