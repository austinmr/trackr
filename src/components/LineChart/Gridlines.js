import React  from 'react';
import * as d3 from "d3"
import Gridline from './Gridline'

export default (props) => {
  const make_x_gridlines = () => {
    return d3.axisBottom(props.x)
      .ticks(5)
  }
  const make_y_gridlines = () => {
    return d3.axisLeft(props.y)
      .ticks(4)
  }
  const xSettings = {
    translate: 'translate(0,' + (props.height) + ')',
    scale: props.x,
    gridlines: 'x',
    makeGridlines: make_x_gridlines,
    height: props.height,
    width: props.width
  };
  const ySettings = {
    translate: 'translate(0, 0)',
    scale: props.y,
    gridlines: 'y',
    makeGridlines: make_y_gridlines, 
    height: props.height,
    width: props.width
  };
  return (
    <g>
      <Gridline {...ySettings}/>
    </g>
  )
}