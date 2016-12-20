import React from 'react'
import * as d3 from "d3";
import Rect from './Rect'
import Label from './Label'

class Bar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {width, height, xScale, yScale, sets, repsArray, padding, svgMargin } = this.props; 

    let availableWidth = width - (padding * 2 * repsArray.length); 
    console.log(availableWidth); 
    let repTotal = repsArray.reduce((a, b) => { return parseInt(a) + parseInt(b)}); 
    console.log("repTotal", repTotal); 
    let repWidthArray = repsArray.map((r) => {
      let width = Math.floor((r/repTotal) * availableWidth); 
      return width; 
    }); 
    console.log(repWidthArray); 

    // Initialize the x starting value -> Where the first bar will start
    // Move the bar chart over by 50 so that there is space for the axis text
    let nextX = padding + (svgMargin * 2); 

    // Generate the bars elements by mapping through sets array. 
    let bars = sets.map((set, i) => {
      let barHeight = yScale(set.weight);
      let y = height - barHeight - 25;
      let barWidth = repWidthArray[i];
      let x = nextX; 
      let xLabel = x + (Math.round(barWidth / 2)); 
      nextX = x + barWidth + padding; 

      return (
        <g key={i}>
          <Rect             
            height={barHeight}
            width={barWidth}
            x={x}
            y={y} 
            xLabel={xLabel}
            reps={set.completedReps}
            weight={set.weight}
            oneRepMax={set.completedOneRepMax}
          />
        </g>
      )
    }); 

    return (
      <g>{bars}</g>
    );
  }
};

export default Bar