import React from 'react';
import reactDom from 'react-dom';
import Slider from '@mui/material/Slider';
import { useState } from 'react';

function Breakpoint(props) {
  const { id, timeDisabled, breakpointsArr, setbreakpointsArr } = props;

  // Get the changing value of time and set its state on change

  const minuteZeroOrEntry = (
    <div>
      <label className='p-2' htmlFor='minute'>
        Minute:{' '}
      </label>
      <input
        className='shadow appearance-none rounded border border-borderColor p-2 text-gray-700 focus:outline-none focus:shadow-outline'
        id='minute'
        name='minuteInput'
        value={breakpointsArr[id].minute}
        type='Number'
        onChange={(e) => {
          const updateState = [...breakpointsArr];
          updateState[id].minute = e.target.value;
          setbreakpointsArr(updateState);
        }}
        disabled={id === 0 ? true : false}
      ></input>
    </div>
  );

  // Create sliders for custom parameters
  const customParamsList = Object.keys(breakpointsArr[0].custom_params);

  const paramComponents = customParamsList.map((ele, index) => {
    return (
      <div className='m-3' key={index}>
        <label>
          <strong>{ele}</strong>
        </label>
        <Slider
          type='number'
          onChange={(e) => {
            const updateState = [...breakpointsArr];
            updateState[id].custom_params[ele] = e.target.value / 100;
            setbreakpointsArr(updateState);
          }}
          value={breakpointsArr[id].custom_params[ele] * 100}
          min={0}
          max={100}
          step={1}
          valueLabelDisplay='on'
        />
      </div>
    );
  });

  return (
    <div className='m-3 rounded border border-borderColor bg-secondary w-11/12 p-5'>
      {minuteZeroOrEntry}
      <br></br>
      <div className='m-3'>
        <label>
          <strong>BPM</strong>
        </label>
        <Slider
          type='number'
          onChange={(e) => {
            const updateState = [...breakpointsArr];
            updateState[id].bpm = e.target.value;
            setbreakpointsArr(updateState);
          }}
          value={breakpointsArr[id].bpm}
          min={30}
          max={200}
          valueLabelDisplay='on'
        />
      </div>
      {paramComponents}
    </div>
  );
}
export default Breakpoint;
