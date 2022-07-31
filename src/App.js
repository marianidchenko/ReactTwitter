import { Routes, Route, useNavigate } from 'react-router-dom';
import { Login } from './components/AuthForms/Login/Login';
import { ProfileSetup } from './components/AuthForms/Register/ProfileSetup';
import { Register } from './components/AuthForms/Register/Register';
import { Home } from './components/Home/Home';


function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/login" component={Login} element={<Login />}/>
        <Route path="/register" component={Register} element={<Register />}/>
        <Route path="/profile-setup" component={ProfileSetup} element={<ProfileSetup />}/>
        <Route path="/" component={Home} element={<Home />}/>
      </Routes>
    </div>
  );
}

export default App;
