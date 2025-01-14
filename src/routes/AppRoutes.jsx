import { Route, Routes } from 'react-router';
import SignUp from '../pages/authentications/SignUp';
import Home from '../pages/Home';
import About from '../pages/About';
import UserLayout from '../outlet/UserLayout';
import SignIn from '../pages/authentications/SignIn';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<UserLayout />}>
        <Route path="/" index element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
      </Route>
      <Route path="/signUp" element={<SignUp />}></Route>
      <Route path="/signIn" element={<SignIn />}></Route>
    </Routes>
  );
};

export default AppRoutes;
