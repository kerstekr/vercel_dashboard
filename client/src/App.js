import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import Auth from './components/Auth';
import Home from './pages/Home';           
import UserDetail from './pages/UserDetail'; 
import Leaderboard from './components/LeadBoard';

function RequireAuth({ children }) {
  const token = localStorage.getItem('token');
  const location = useLocation();

  if (!token) {
    
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  
  useEffect(() => {
    function onStorage() {
      setToken(localStorage.getItem('token'));
    }
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        
        <Route
          path="/login"
          element={<Auth onLoginSuccess={(t) => setToken(t)} />}
        />

        
        <Route
          path="/"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
        <Route
          path="/user/:username"
          element={
            <RequireAuth>
              <UserDetail />
            </RequireAuth>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <RequireAuth>
              <Leaderboard />
            </RequireAuth>
          }
        />

      
        <Route
          path="*"
          element={token ? <Navigate to="/" replace /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
