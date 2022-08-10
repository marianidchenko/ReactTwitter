import "./App.css"

import { Routes, Route } from 'react-router-dom';

import { AuthProvider } from "./contexts/authContext";
import { TweetProvider } from "./contexts/TweetContext";

import { Login } from './components/AuthForms/Login/Login';
import { ProfileSetup } from './components/AuthForms/Register/ProfileSetup';
import { Register } from './components/AuthForms/Register/Register';
import { Home } from './components/Home/Home';
import { Profile } from "./components/Profile/Profile";
import { TweetDetails } from "./components/TweetDetails/TweetDetails";
import { ComposeTweetPopup } from "./components/Feed/Tweet/ComposeTweet/ComposeTweetPopup";
import { Bookmarks } from "./components/Bookmarks/Bookmarks";

function App() {

  return (
    <AuthProvider>
      <TweetProvider>
        <div className="container">
          <Routes>
            <Route path="/login" component={Login} element={<Login />} />
            <Route path="/register" component={Register} element={<Register />} />
            <Route path="/profile-setup" component={ProfileSetup} element={<ProfileSetup />} />
            <Route path="/" component={Home} element={<Home />} />
            <Route path="/:username" component={Profile} element={<Profile />} />
            <Route path="/tweet/:id" component={TweetDetails} element={<TweetDetails />} />
            <Route path="/compose" component={ComposeTweetPopup} element={<ComposeTweetPopup />} />
            <Route path="/bookmarks" component={Bookmarks} element={<Bookmarks />} />
          </Routes>
          <ComposeTweetPopup />
        </div>
        </TweetProvider>
    </AuthProvider>
  );
}

export default App;
