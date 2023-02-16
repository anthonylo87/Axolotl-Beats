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
  const {
    loading,
    setLoading,
    customParams,
    breakpointsArr,
    setbreakpointsArr,
    segmentsArr,
    setSegmentsArr,
    children,
  } = props;

  const breakpoints = customParams.map((element, index) => {
    const timeDisabled = index === 0 ? true : false;

    return (
      <Breakpoint
        key={`breakpoint-${index}`}
        id={index}
        breakpointsArr={breakpointsArr}
        setbreakpointsArr={setbreakpointsArr}
        timeDisabled={timeDisabled}
      />
    );
  });

  const segments = segmentsArr.map((element, index) => {
    return (
      <Segment
        key={`segment-${index}`}
        id={index}
        segmentsArr={segmentsArr}
        setSegmentsArr={setSegmentsArr}
      />
    );
  });

  // const downArrow = <DownArrow />;

  // const result = [];
  // breakpoints.forEach((element, index) => {
  //   result.push(element);

  //   if (index < breakpoints.length - 1) {
  //     result.push(downArrow);
  //   }
  //   if (segments[index]) {
  //     result.push(segments[index]);
  //   }
  //   if (index < breakpoints.length - 1) {
  //     result.push(downArrow);
  //   }
  // });

  const bkptComponents = customParams.map((ele, idx) => {
    return <CustomParamsPlot key={idx} breakpointsArr={breakpointsArr} />;
  });

  const subSection = 'bg-spotifyDarkGray p-3 rounded';

  if (loading) {
    return (
      <div className='h-screen flex flex-col justify-center content-center'>
        <div class='text-5xl text-center'>Your Playlist is Loading...</div>
        <div class='h-1/5 mx-auto loader --1'></div>
      </div>
    );
  } else {
    return (
      <section className='w-full h-[calc(100vh-3rem)] flex flex-row justify-center items-center p-4'>
        <div className='w-1/2 h-full flex flex-col justify-between'>
          <div className='w-full bg-spotifyDarkGray mb-2'>
            <DashNav />
          </div>
          <div className='h-full w-full bg-spotifyDarkGray p-4'>{children}</div>
        </div>
      </section>

      // <div id='formPage'>
      //   <h1>Fill out the form below to generate a new playlist</h1>
      //   <div className='flex flex-col lg:flex-row lg:flex-row w-screen justify-center content-center'>
      //     <div className='w-screen lg:w-5/12 p-5'>
      //       <BPMPlot breakpointsArr={breakpointsArr} />
      //     </div>
      //     <div className='w-screen lg:w-5/12 p-5'>
      //       <CustomParamsPlot breakpointsArr={breakpointsArr} />
      //     </div>
      //   </div>
      //   {result}
      //   {/* placeholder for Spotify component with iFrame */}
      //   <button
      //     type='button'
      //     onClick={() => {
      //       // add a new breakpoint-object to breakpointsArr, which is a copy of the last breakpoint-object but with its minute property incremented by 30
      //       let newBreakpointsArr = [...breakpointsArr];
      //       const lastBreakpointObj = breakpointsArr[breakpointsArr.length - 1];
      //       const newBreakpointObj = JSON.parse(
      //         JSON.stringify(lastBreakpointObj)
      //       );
      //       newBreakpointObj.minute += 30;
      //       newBreakpointsArr.push(newBreakpointObj);
      //       setbreakpointsArr(newBreakpointsArr);
      //       // add a new segment-object to segmentsArr, which is a copy of the last segment-object
      //       let newSegmentsArr = [...segmentsArr];
      //       const lastSegmentObj = segmentsArr[segmentsArr.length - 1];
      //       const newSegmentObj = JSON.parse(JSON.stringify(lastSegmentObj));
      //       newSegmentsArr.push(newSegmentObj);
      //       setSegmentsArr(newSegmentsArr);
      //     }}
      //   >
      //     Add a segment!
      //   </button>
      //   <br />
      //   <button
      //     type='button'
      //     onClick={() => {
      //       let newBreakpointsArr = [...breakpointsArr];
      //       if (newBreakpointsArr.length > 2) {
      //         newBreakpointsArr.pop();
      //       }
      //       setbreakpointsArr(newBreakpointsArr);
      //       let newSegmentsArr = [...segmentsArr];
      //       if (newSegmentsArr.length > 1) {
      //         newSegmentsArr.pop();
      //       }
      //       setSegmentsArr(newSegmentsArr);
      //     }}
      //   >
      //     Delete a segment!
      //   </button>
      //   <br />
      //   <button
      //     type='button'
      //     onClick={() => {
      //       setLoading(true);
      //       fetch('/api/getDynamicPlaylist', {
      //         method: 'POST',
      //         headers: {
      //           'Content-Type': 'application/json',
      //         },
      //         body: JSON.stringify({
      //           playlistName: 'What is an Axolotl',
      //           playlistDescription: 'Created by Axolotl',
      //           segments: remixBreakpointsAndSegmentDataIntoAnArrForServer(
      //             breakpointsArr,
      //             segmentsArr
      //           ),
      //         }),
      //       })
      //         .then((res) => res.json())
      //         .then((data) => {
      //           setLoading(false);
      //           console.log(data);
      //         })
      //         .catch((err) => console.log(err));
      //     }}
      //   >
      //     Create my playlist!
      //   </button>
      // </div>
    );
  }
};

export default PlaylistPage;
