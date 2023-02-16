import React, { useState } from 'react';
import Breakpoint from '../components/Breakpoint.jsx';
import Segment from '../components/Segment.jsx';
// import DownArrow from '../components/DownArrow.jsx';
// import BPMPlot from '../components/BPMPlot.jsx';
import DashNav from '../components/DashNav.jsx';
import CustomParamsPlot from '../components/CustomParamsPlot.jsx';

// function that takes breakpoints, segments state objects and packages into a request body that can be processesd by the back-end
function remixBreakpointsAndSegmentDataIntoAnArrForServer(
  breakpointsArr,
  segmentsArr
) {
  const arrForServer = [];
  for (let i = 0; i < segmentsArr.length; i++) {
    const custom_params = Object.keys(breakpointsArr[i].custom_params);
    const segmentObj = {
      start_time: breakpointsArr[i].minute,
      end_time: breakpointsArr[i + 1].minute,
      starting_bpm_target: breakpointsArr[i].bpm,
      ending_bpm_target: breakpointsArr[i + 1].bpm,
      genres: segmentsArr[i].genres,
      custom_params,
      custom_param_starting_values: custom_params.map(
        (parameterName) => breakpointsArr[i].custom_params[parameterName]
      ),
      custom_param_ending_values: custom_params.map(
        (parameterName) => breakpointsArr[i + 1].custom_params[parameterName]
      ),
    };

    arrForServer.push(segmentObj);
  }
  return arrForServer;
}

const PlaylistPage = (props) => {
  const { children } = props;

  return (
    <section className='w-screen h-[calc(100vh-3rem)] flex flex-row justify-center items-center p-4'>
      <div className='w-full lg:w-3/4 h-full flex flex-col justify-between'>
        <div className='w-full bg-spotifyDarkGray'>
          <DashNav />
        </div>
        <div className='h-full w-full'>{children}</div>
      </div>
    </section>
  );
};

export default PlaylistPage;
