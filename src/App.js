import { Feed } from './components/Feed/Feed';
import { LeftSidebar } from './components/LeftSidebar/LeftSidebar';
import { RightSidebar } from './components/RightSidebar/RightSidebar';

function App() {
  return (
    <div className="container">
      <LeftSidebar />
      <Feed />
      <RightSidebar />
    </div>
  );
}

export default App;
