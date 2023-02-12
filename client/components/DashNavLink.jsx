import React from 'react';

const DashNavLink = (props) => {
  let currentBG;
  let currentFont;

  const { children, id, currentLink, setCurrentLink } = props;

  const handleClick = (e) => {
    setCurrentLink(id);
  };

  return (
    <li
      className={
        (currentLink === id && id !== undefined
          ? 'bg-spotifyGreen'
          : 'bg-spotifyDarkGray') + ' px-3'
      }
    >
      <button onClick={handleClick}>
        <div
          className={
            (currentLink === id && id !== undefined
              ? 'text-spotifyBlack '
              : 'text-neutral-300 hover:underline underline-offset-8') +
            ' text-center tracking-widest font-bold text-xs px-2 py-3 whitespace-nowrap'
          }
        >
          {children}
        </div>
      </button>
    </li>
  );
};

export default DashNavLink;
