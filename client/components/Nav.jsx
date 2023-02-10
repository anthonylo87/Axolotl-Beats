import React from 'react';
import { useAuth } from './AuthContext.jsx';
import { Link } from 'react-router-dom';

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
    <nav className='bg-spotifyGreen border-b border-spotifyBlack flex justify-center min-h-[3rem]'>
      <div className='w-1/2 min-[700px] m-auto text-spotifyBlack'>
        <ul className='flex flex-row justify-end'>
          <li className='p-3' id='logoutButton'>
            <Link to='/dashboard'>Dashboard</Link>
            {/* <a className='bye'>Dashboard</a> */}
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
