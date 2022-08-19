import React from 'react';
import { Component } from 'react';
import { useAuth } from './AuthContext.jsx';

import { useNavigate } from 'react-router-dom';


const LoginPage = (props) => {
  const auth = useAuth(); 
  const navigate = useNavigate();
  
  if (!auth.user) {
    fetch('/api/checkUserAuth')
    .then(res => res.json())
      .then(data => {
        console.log(data)
        auth.signIn(data.display_name)
      })
    .catch(err => console.log(err))
  }
  
  return (
    <div id="loginPage">
      <h3>Login to Spotify below to continue</h3>      
      {auth.user}
    <a href='/api/auth'><button className="login">Spotify Login</button></a>
    </div> 
  )
}

export default LoginPage