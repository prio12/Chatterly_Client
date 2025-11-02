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
import MyAlbum from '../pages/MyAlbum';
import MyVideos from '../pages/MyVideos';
import Chats from '../pages/Chats';
import ChatPanel from '../components/chats/ChatPanel';
import SearchPage from '../pages/SearchPage';
import LikedPosts from '../pages/LikedPosts';
import Settings from '../pages/Settings';
import FAQPage from '../pages/FAQPage';
import GuidelinesPage from '../pages/GuidelinesPage';
import AdminDashboard from '../pages/admin/AdminDashboard';

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
        <Route path="/myAlbums" element={<MyAlbum />}></Route>
        <Route path="/myVideos" element={<MyVideos />}></Route>
        <Route path="/posts/:id" element={<PostDetails />}></Route>
        <Route path="/chats" element={<Chats />}></Route>
        <Route path="/search" element={<SearchPage />}></Route>
        <Route path="/settings" element={<Settings />}></Route>
        <Route path="/chats/:uid" element={<ChatPanel />}></Route>
        <Route path="/likedPosts" element={<LikedPosts />}></Route>
        <Route path="/faq" element={<FAQPage />}></Route>
        <Route path="/admin" element={<AdminDashboard />}></Route>
        <Route path="/guidelines" element={<GuidelinesPage />}></Route>
      </Route>
      <Route path="/signUp" element={<SignUp />}></Route>
      <Route path="/signIn" element={<SignIn />}></Route>
    </Routes>
  );
};

export default AppRoutes;
