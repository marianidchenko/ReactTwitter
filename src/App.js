import { Login } from './components/AuthForms/Login/Login';
import { ProfileSetup } from './components/AuthForms/Register/ProfileSetup';
import { Register } from './components/AuthForms/Register/Register';


import { Feed } from './components/Feed/Feed';
import { LeftSidebar } from './components/LeftSidebar/LeftSidebar';
import { RightSidebar } from './components/RightSidebar/RightSidebar';

function App() {
  return (
    <div className="container">
      <LeftSidebar />
      <Feed />
      <RightSidebar />
      <Register />
      <ProfileSetup />
      <Login / >
    </div>
  );
}

export default App;
