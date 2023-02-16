import React from 'react';

const Home = (props) => {
  return (
    <section className='w-full h-[calc(100vh-3rem)] flex flex-row justify-center'>
      <div className='w-full h-full bg-spotifyDarkGray main-text fixed top-[calc(3rem)] left-0'></div>
      <div className='w-full h-full flex-col lg:w-3/4 flex lg:flex-row z-50'>
        <div className='flex flex-col justify-center text-7xl md:text-9xl lg: font-bold italic tracking-widest md:tracking-wide p-10 z-50'>
          Project:{' '}
          <span className='homepage-header text-spotifyDarkGray'>Axolotl</span>
        </div>
        <div className='flex flex-col justify-center'>
          <div className='p-7 lg:border-l border-spotifyGreen'>
            <h2 className='leading-tight'>
              Project: Axolotl was created to give listeners creative control
              over how they explore new music.
            </h2>
            <br />
            <br />
            <p>
              Here's how it works. You provide us with the details of how the
              playlist to be structured, and we'll return you content curated
              specifically to match your criteria saved directly into your
              Spotify.
            </p>
            <br />
            <br />
            <p>
              Click{' '}
              <a href='' className='font-bold'>
                Here
              </a>{' '}
              to get started.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
