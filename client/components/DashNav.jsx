import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DashNavLink, DashNavNoLink } from '../components/DashNavLink.jsx';

const DashNav = () => {
  // State - Dash Nav
  const [currentLink, setCurrentLink] = useState(1);

  return (
    <nav className='w-full'>
      <ul className='flex flex-row flex-wrap w-full'>
        <Link to='/dashboard/general'>
          <DashNavLink
            id={1}
            currentLink={currentLink}
            setCurrentLink={setCurrentLink}
          >
            General
          </DashNavLink>
        </Link>
        <DashNavNoLink>&#x203A;</DashNavNoLink>
        <Link to='/dashboard/parameters'>
          <DashNavLink
            id={2}
            currentLink={currentLink}
            setCurrentLink={setCurrentLink}
          >
            Set Parameters
          </DashNavLink>
        </Link>
        <DashNavNoLink>&#x203A;</DashNavNoLink>
        <Link to='/dashboard/genres'>
          <DashNavLink
            id={3}
            currentLink={currentLink}
            setCurrentLink={setCurrentLink}
          >
            Customize Genres
          </DashNavLink>
        </Link>
        <DashNavNoLink>&#x203A;</DashNavNoLink>
        <Link to='/dashboard/generate'>
          <DashNavLink
            id={4}
            currentLink={currentLink}
            setCurrentLink={setCurrentLink}
          >
            Generate Playlist
          </DashNavLink>
        </Link>
      </ul>
    </nav>
  );
};

export default DashNav;
