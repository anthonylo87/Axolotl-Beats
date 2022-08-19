import React from "react";
import { useAuth } from './AuthContext.jsx'

const Nav = (props) => {
  const auth = useAuth();

  if (!auth.user) {
    fetch('/api/checkUserAuth')
    .then(res => res.json())
      .then(data => {
        console.log(data)
        auth.signIn(data.display_name)
      })
      .catch(err => console.log(err))
    
    return (<nav id='navBar'></nav>);
  }




  return (<nav id='navBar'>
    <ul className='navList'>
      <li className='links' id='logoutButton'>
        Welcome {auth.user}!!&nbsp;&nbsp;
        <a className='bye' onClick={auth.signOut} href='/api/logOut'>
          Logout
        </a>
      </li>
    </ul>
  </nav>);
}

export default Nav;