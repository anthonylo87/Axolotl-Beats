import React from 'react';
import DashLayout from '../layouts/DashLayout.jsx';
import { Input, InputLabel } from '@mui/material';

function General() {
  return (
    <DashLayout>
      <div className='bg-spotifyDarkGray p-2 px-6 my-4'>
        <h2>General Preferences</h2>
      </div>
      <div className='bg-spotifyDarkGray px-6 py-6 h-1/2'>
        <div className='my-2'>
          <InputLabel size='small'>
            Number of Sections To Include in Your Playlist:{' '}
          </InputLabel>
        </div>
        <br />
        <Input placeholder='No. of Sections' />
      </div>
    </DashLayout>
  );
}
export default General;
