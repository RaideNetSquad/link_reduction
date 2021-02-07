import './App.css';
import 'materialize-css';

import {useRoutes} from './pages/routes';
import { BrowserRouter as Router } from 'react-router-dom';
import {useAuth} from './hooks/auth.hook';
import {AuthContext} from './context/AuthContext';
import { NavBar } from './components/NavBar';
import { Loader } from './components/Loader';

function App() {
  const {login, logout, token, userId, ready} = useAuth();
  const isAuthenticated = !!token;

  const routes = useRoutes(isAuthenticated);

  if(!ready){
    return <Loader/>
  }

  return (
    <AuthContext.Provider value={{
      login, logout, token, userId, isAuthenticated
    }}>
      <Router>
      {isAuthenticated && <NavBar/>}
        <div className="container">
        {
          routes
        }
        </div>
      </Router>
    </AuthContext.Provider>
  ); 
}

export default App;
