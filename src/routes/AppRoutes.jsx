import { Route, Routes } from 'react-router';
import SignUp from '../pages/authentications/SignUp';
import Home from '../pages/Home';
import About from '../pages/About';
import UserLayout from '../outlet/UserLayout';
import SignIn from '../pages/authentications/SignIn';
import PrivateRoute from './PrivateRoute';
import ProfilePage from '../pages/ProfilePage';

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
        <Route path="/about" element={<About />}></Route>
        <Route path="/profile" element={<ProfilePage />}></Route>
      </Route>
      <Route path="/signUp" element={<SignUp />}></Route>
      <Route path="/signIn" element={<SignIn />}></Route>
    </Routes>
  );
};

export default AppRoutes;
