import React  from 'react';
import Axis   from './Axis';

export default (props) => {
  const xSettings = {
    translate: 'translate(0,' + (props.height) + ')',
    x: props.x,
    orient: 'bottom', 
    dates: props.dates
  };
  const ySettings = {
    translate: 'translate(0, 0)',
    y: props.y,
    orient: 'left',
  };
  return (
    <g className="xy-axis">
      <Axis {...xSettings}/>
      <Axis {...ySettings}/>
    </g>
  )
}