import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NoPage from './components/NoPage';
import UserList from './components/UserList';
import UserPlaces from './components/UserPlaces';
import Authenticate from './components/Authenticate';
import NewPlace from './components/NewPlace';
import PlaceDetail from './components/PlaceDetail';
import { useAuth} from './context/AuthContext.js';
import { Navigate } from 'react-router-dom';

function App() {
  const { userInformation } = useAuth();

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/:uid/places" element={<UserPlaces />} />
          <Route path="/authenticate" element={!userInformation ? <Authenticate /> : <Navigate to="/" />} />
          <Route path="/places/new" element={userInformation ? <NewPlace /> : <Navigate to="/authenticate" />} />
          <Route path="/places/:pid" element={userInformation ? <PlaceDetail /> : <Navigate to="/authenticate" />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
  );
}


export default App;
