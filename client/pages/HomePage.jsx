import React from 'react';

const HomePage = (props) => {
  return (
    <section className='w-full h-full flex flex-row justify-center'>
      <div className='w-1/2 h-screen flex flex-row '>
        <div className='flex flex-col justify-center text-9xl font-bold italic tracking-wide p-10'>
          Project:{' '}
          <span className='homepage-header text-spotifyGreen'>Axolotl</span>
        </div>
        <div className='flex flex-col justify-center'>
          <div className='p-7 border-l border-black'>
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
              spotify.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
