import { Route, Routes } from 'react-router';
import SignUp from '../pages/authentications/SignUp';
import Home from '../pages/Home';
import UserLayout from '../outlet/UserLayout';
import SignIn from '../pages/authentications/SignIn';
import PrivateRoute from './PrivateRoute';
import ProfilePage from '../pages/ProfilePage';
import Notifications from '../pages/Notifications';
import PostDetails from '../components/common/posts/PostDetails';
import Connections from '../pages/Connections';

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <UserLayout />
          </PrivateRoute>
        }
      >
        <Route path="/" index element={<Home />}></Route>
        <Route path="/profile/:uid" element={<ProfilePage />}></Route>
        <Route path="/notifications/:id" element={<Notifications />}></Route>
        <Route path="/connections" element={<Connections />}></Route>
        <Route path="/posts/:id" element={<PostDetails />}></Route>
      </Route>
      <Route path="/signUp" element={<SignUp />}></Route>
      <Route path="/signIn" element={<SignIn />}></Route>
    </Routes>
  );
};

export default AppRoutes;
