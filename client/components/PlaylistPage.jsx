import React from 'react';
import Breakpoint from './Breakpoint.jsx';
import Segment from './Segment.jsx';
import DownArrow from './DownArrow.jsx';
import BPMPlot from './BPMPlot.jsx';
import CustomParamsPlot from './CustomParamsPlot.jsx';

// function that takes breakpoints, segments state objects and packages into a request body that can be processesd by the back-end
function remixBreakpointsAndSegmentDataIntoAnArrForServer(
  breakpointsArr,
  segmentsArr
) {
  const arrForServer = [];
  for (let i = 0; i < segmentsArr.length; i++) {
    const custom_params = Object.keys(breakpointsArr[i].custom_params); // this implicitly assumes that breakpoint-objects i and i+1 have the same custom_params objects.... so really we should just update this in STATE at some point, and then the present code can be cleaned up slightly.
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
    breakpointsArr,
    setbreakpointsArr,
    segmentsArr,
    setSegmentsArr,
  } = props;

  const breakpoints = breakpointsArr.map((element, index) => {
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

  const downArrow = <DownArrow />;

  const result = [];
  breakpoints.forEach((element, index) => {
    result.push(element);

    if (index < breakpoints.length - 1) {
      result.push(downArrow);
    }
    if (segments[index]) {
      result.push(segments[index]);
    }
    if (index < breakpoints.length - 1) {
      result.push(downArrow);
    }
  });

  if (loading) {
    return (
      <div className='h-screen flex flex-col justify-center content-center'>
        <div class='text-5xl text-center'>Your Playlist is Loading...</div>
        <div class='h-1/5 mx-auto loader --1'></div>
      </div>
    );
  } else {
    return (
      <div id='formPage'>
        <h1 className='text-3xl'>
          Fill out the form below to generate a new playlist
        </h1>
        <div
          id='parentContainer'
          className='flex flex-col lg:flex-row lg: justify-center w-11/12'
        >
          {/* Contains charts */}
          <div className='flex flex-col lg:w-5/12 justify-center content-center lg:order-2'>
            <div className='p-5'>
              <BPMPlot breakpointsArr={breakpointsArr} />
            </div>
            <div className='p-5'>
              <CustomParamsPlot breakpointsArr={breakpointsArr} />
            </div>
          </div>
          <div className='lg:w-3/12 lg:order-1 lg:h-screen lg:overflow-y-auto lg:overflow-x-hidden'>
            {result}
            <button
              type='button'
              onClick={() => {
                // add a new breakpoint-object to breakpointsArr, which is a copy of the last breakpoint-object but with its minute property incremented by 30
                let newBreakpointsArr = [...breakpointsArr];
                const lastBreakpointObj =
                  breakpointsArr[breakpointsArr.length - 1];
                const newBreakpointObj = JSON.parse(
                  JSON.stringify(lastBreakpointObj)
                );
                newBreakpointObj.minute += 30;
                newBreakpointsArr.push(newBreakpointObj);
                setbreakpointsArr(newBreakpointsArr);
                // add a new segment-object to segmentsArr, which is a copy of the last segment-object
                let newSegmentsArr = [...segmentsArr];
                const lastSegmentObj = segmentsArr[segmentsArr.length - 1];
                const newSegmentObj = JSON.parse(
                  JSON.stringify(lastSegmentObj)
                );
                newSegmentsArr.push(newSegmentObj);
                setSegmentsArr(newSegmentsArr);
              }}
            >
              Add a segment!
            </button>
            <br />
            <button
              type='button'
              onClick={() => {
                let newBreakpointsArr = [...breakpointsArr];
                if (newBreakpointsArr.length > 2) {
                  newBreakpointsArr.pop();
                }
                setbreakpointsArr(newBreakpointsArr);
                let newSegmentsArr = [...segmentsArr];
                if (newSegmentsArr.length > 1) {
                  newSegmentsArr.pop();
                }
                setSegmentsArr(newSegmentsArr);
              }}
            >
              Delete a segment!
            </button>
            <br />
            <button
              type='button'
              onClick={() => {
                setLoading(true);
                fetch('/api/getDynamicPlaylist', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    playlistName: 'What is an Axolotl',
                    playlistDescription: 'Created by Axolotl',
                    segments: remixBreakpointsAndSegmentDataIntoAnArrForServer(
                      breakpointsArr,
                      segmentsArr
                    ),
                  }),
                })
                  .then((res) => res.json())
                  .then((data) => {
                    setLoading(false);
                    console.log(data);
                  })
                  .catch((err) => console.log(err));
              }}
            >
              Create my playlist!
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default PlaylistPage;
