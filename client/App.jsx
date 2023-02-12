import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home.jsx';
import LoginPage from './components/LoginPage.jsx';
import PlaylistPage from './pages/PlaylistPage.jsx';
import EmbeddedPlayer from './components/EmbeddedPlayer.jsx';
import { AuthProvider, useAuth } from './components/AuthContext.jsx';
import Nav from './components/Nav.jsx';

import './stylesheets/app.css';

//

function App() {
  const [playlistId, setplaylistId] = useState('Initial value');
  // AMG (wed. 5pm): could also include as state a 'custom_parameter_names' array, e.g. ['danciness', 'speechiness']. then, update the function definition remixBreakpointsAndSegmentDataIntoAnArrForServer to be a little cleaner.

  const [customParams, setCustomParams] = useState([
    'danciness',
    'speechiness',
  ]);
  const [breakpointsArr, setbreakpointsArr] = useState([
    {
      minute: 0, // the starting breakpoint-object will ALWAYS have its minute-value equal to 0, and the user cannot change this
      bpm: 60,
      custom_params: { danciness: 0.5, speechiness: 0.5 },
    },
    {
      minute: 45,
      bpm: 120,
      custom_params: { danciness: 0.8, speechiness: 0.6 },
    },
    {
      minute: 80,
      bpm: 130,
      custom_params: { danciness: 0.9, speechiness: 0.7 },
    },
    {
      minute: 95,
      bpm: 150,
      custom_params: { danciness: 1, speechiness: 1 },
    },
  ]);

  const [segmentsArr, setSegmentsArr] = useState([
    {
      genres: ['rock', 'dance', 'funk'],
    },
    {
      genres: ['metal'],
    },
    {
      genres: ['metal', 'classical'],
    },
  ]);

  const [loading, setLoading] = useState(false);
  const auth = useAuth();

  useEffect(() => {
    const newArr = [];
    const customParamsObj = {};

    for (const ele of breakpointsArr) {
      for (const customParam of customParams) {
        customParamsObj[customParam] = 0;
      }
      const newEle = { ...ele, custom_params: customParamsObj };
      newArr.push(newEle);
    }

    setbreakpointsArr(newArr);
  }, []);

  return (
    <AuthProvider>
      <Nav />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route
          path='/dashboard'
          element={
            <PlaylistPage
              setplaylistId={setplaylistId}
              loading={loading}
              setLoading={setLoading}
              customParams={customParams}
              breakpointsArr={breakpointsArr}
              setbreakpointsArr={setbreakpointsArr}
              segmentsArr={segmentsArr}
              setSegmentsArr={setSegmentsArr}
            />
          }
        ></Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
