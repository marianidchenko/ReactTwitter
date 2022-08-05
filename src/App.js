import "./App.css"

import { Routes, Route } from 'react-router-dom';
import * as tweetServices from './services/tweetServices'

import { Login } from './components/AuthForms/Login/Login';
import { ProfileSetup } from './components/AuthForms/Register/ProfileSetup';
import { Register } from './components/AuthForms/Register/Register';
import { Home } from './components/Home/Home';
import { AuthContext } from "./contexts/authContext";
import { useAuth } from "./hooks/useAuth";
import { useState } from "react";
import { TweetContext } from "./contexts/TweetContext";
import { Profile } from "./components/Profile/Profile";
import { TweetDetails } from "./components/TweetDetails/TweetDetails";
import { ComposeTweetPopup } from "./components/Feed/Tweet/ComposeTweet/ComposeTweetPopup";

function App() {

  const user = useAuth();

  const [tweets, setTweets] = useState([]);
  const [composePopup, setComposePopup] = useState(false);

  const updateTweets = async () => {
    const data = await tweetServices.getAll();
    const tweetTemp = ((data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))).sort((a, b) => b.timestamp - a.timestamp));
    setTweets(tweetTemp.filter((tweet) => tweet.isReply == false))
  }

  return (
    <AuthContext.Provider value={{ user }}>
      <TweetContext.Provider value={{ updateTweets, tweets, setTweets, setComposePopup }}>
        <div className="container">
          <Routes>
            <Route path="/login" component={Login} element={<Login />} />
            <Route path="/register" component={Register} element={<Register />} />
            <Route path="/profile-setup" component={ProfileSetup} element={<ProfileSetup />} />
            <Route path="/" component={Home} element={<Home />} />
            <Route path="/:username" component={Profile} element={<Profile />} />
            <Route path="/tweet/:id" component={TweetDetails} element={<TweetDetails />} />
            <Route path="/compose" component={ComposeTweetPopup} element={<ComposeTweetPopup />} />
          </Routes>
          {composePopup && <ComposeTweetPopup />}
        </div>
      </TweetContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
