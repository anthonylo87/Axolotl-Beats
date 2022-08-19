import React, { useState, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  
  const [user, setUser] = useState(null);
  const navigate = useNavigate()
  
  const signIn = (newUser) => {
    // fetch('/api/checkUserAuth')
    // .then(res => res.json())
    // .then(data => console.log(data))
    // .catch(err => console.log(err))
    setUser(newUser);
    navigate('/playlistform')
  }
  
  const signOut = () => {
    setUser(null);
    console.log('logout')
    //=navigate("api/clearCookies");
  };
  
  const value = { user, signIn, signOut };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};


export {useAuth, AuthProvider};