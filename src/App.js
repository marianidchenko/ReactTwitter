import "./App.css"

import { Routes, Route, useNavigate } from 'react-router-dom';
import { auth } from "./firebase-config"

import { Login } from './components/AuthForms/Login/Login';
import { ProfileSetup } from './components/AuthForms/Register/ProfileSetup';
import { Register } from './components/AuthForms/Register/Register';
import { Home } from './components/Home/Home';
import { useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { AuthContext } from "./contexts/authContext";

function App() {

  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  })

  return (
    <AuthContext.Provider value={{ user }}>
      <div className="container">
        <Routes>
          <Route path="/login" component={Login} element={<Login />} />
          <Route path="/register" component={Register} element={<Register />} />
          <Route path="/profile-setup" component={ProfileSetup} element={<ProfileSetup />} />
          <Route path="/" component={Home} element={<Home />} />
        </Routes>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
