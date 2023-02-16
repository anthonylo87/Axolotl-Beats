import React, { useState } from 'react';
import DashLayout from '../layouts/DashLayout.jsx';
import { TextField, InputLabel } from '@mui/material';

function General() {
  const [duration, setDuration] = React.useState();
  const [sections, setSections] = React.useState();

  const handleChange = (e, type) => {
    const regex = /^[0-9\b]+$/;
    if (e.target.value === '' || regex.test(e.target.value)) {
      if (type === 'sections') {
        setSections(e.target.value);
      } else if (type === 'duration') {
        setDuration(e.target.value);
      }
    }
  };

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
        <TextField
          type='tel'
          onChange={(e) => handleChange(e, 'duration')}
          value={duration}
          placeholder='Playlist Duration (Min)'
          color='primary'
          variant='standard'
          autoFocus={true}
          sx={{
            '& .MuiInputBase-root': {
              '&:before': {
                borderBottom: '1px solid white',
              },
              '&:after': {
                borderBottom: 'none',
              },
            },
          }}
        />
        <div className='my-2'>
          <InputLabel size='small'>
            Number of Sections To Include in Your Playlist:{' '}
          </InputLabel>
        </div>
        <br />
        <TextField
          type='tel'
          onChange={(e) => handleChange(e, 'sections')}
          value={sections}
          placeholder='Number of Sections'
          color='primary'
          variant='standard'
          autoFocus={true}
          sx={{
            '& .MuiInputBase-root': {
              '&:before': {
                borderBottom: '1px solid white',
              },
              '&:after': {
                borderBottom: 'none',
              },
            },
          }}
        />
      </div>
    </DashLayout>
  );
}
export default General;
