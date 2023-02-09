import React from 'react';
import { useAuth } from './AuthContext.jsx';

const Nav = (props) => {
  // const auth = useAuth();

  // if (!auth.user) {
  //   fetch('/api/checkUserAuth')
  //   .then(res => res.json())
  //     .then(data => {
  //       console.log(data)
  //       auth.signIn(data.display_name)
  //     })
  //     .catch(err => console.log(err))

  //   return (<nav id='navBar'></nav>);
  // }

  return (
    <nav className='border-b border-black flex justify-center min-h-[3rem]'>
      <div className='w-1/2 min-[700px] m-auto'>
        <ul className='flex flex-row justify-end'>
          <li className='p-3' id='logoutButton'>
            <a className='bye'>Dashboard</a>
          </li>
          <li className='p-3' id='logoutButton'>
            <a className='bye'>Log In</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
