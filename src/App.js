import "./App.css"

import { Routes, Route } from 'react-router-dom';
import { UnprotectedRoute } from "./customRoutes/UnprotectedRoute";

import { AuthProvider } from "./contexts/authContext";
import { TweetProvider } from "./contexts/TweetContext";
import { ProtectedRoute } from "./customRoutes/ProtectedRoute";

import { Login } from './components/AuthForms/Login/Login';
import { ProfileSetup } from './components/AuthForms/Register/ProfileSetup';
import { Register } from './components/AuthForms/Register/Register';
import { Home } from './components/Home/Home';
import { Profile } from "./components/Profile/Profile";
import { TweetDetails } from "./components/TweetDetails/TweetDetails";
import { ComposeTweetPopup } from "./components/Feed/Tweet/ComposeTweet/ComposeTweetPopup";
import { Bookmarks } from "./components/Bookmarks/Bookmarks";
import { NotFound } from "./components/Errors/NotFound";

import { useAuth } from "./hooks/useAuth";


function App() {

  const user = useAuth();

  return (
    <AuthProvider>
      <TweetProvider>
        <div className="container">
          <Routes>

            <Route element={<ProtectedRoute user={user} />}>
              <Route path="/profile-setup" component={ProfileSetup} element={<ProfileSetup />} />
              <Route path="/bookmarks" component={Bookmarks} element={<Bookmarks />} />
            </Route>

            <Route element={<UnprotectedRoute user={user} />}>
              <Route path="/login" component={Login} element={<Login />} />
              <Route path="/register" component={Register} element={<Register />} />
            </Route>

            <Route path="/" component={Home} element={<Home />} />
            <Route path="/profile/:username" component={Profile} element={<Profile />} />
            <Route path="/tweet/:id" component={TweetDetails} element={<TweetDetails />} />

            <Route path="/404" component={NotFound} element={<NotFound />} />
            <Route path="*" element={<NotFound />} />

          </Routes>
          <ComposeTweetPopup />
        </div>
      </TweetProvider>
    </AuthProvider>
  );
}

export default App;
