import React from 'react'
import * as d3 from "d3";
import Rect from './Rect'

class Bar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let props = this.props; 
    const { increment } = this.props; 
    let data = props.data.map((d) => { return d.weight;}); 
    let reps = props.data.map((d) => { return d.completedReps; });
    let exerciseData = props.data; 
    console.log('INCREMENT:', increment);
    // console.log(data);  
    // console.log(reps); 
    // console.log(exerciseData); 

    // let yScale = d3.scaleLinear()
    //   .domain([0, d3.max(data)])
    //   .range([0, this.props.height]);

    // Changed domain max to set the max to the max weight of the graph
    let yScale = d3.scaleLinear()
      .domain([0, increment])
      .range([0, (this.props.height-100)]);

    let xScale = d3.scaleLinear()
      .domain([0, d3.max(reps)])
      .range([0, (this.props.width-100)]);

    let padding = 10; 
    let availableWidth = this.props.width - (padding * 2 * reps.length); 
    // console.log('availableWidth', availableWidth); 
    // console.log(reps); 
    let repTotal = reps.reduce((a, b) => { return parseInt(a) + parseInt(b)}); 
    // console.log("repTotal", repTotal); 
    let repWidth = reps.map((r) => {
      let width = Math.floor((r/repTotal) * availableWidth); 
      return width; 
    }); 
    // console.log(repWidth); 

    let nextX = padding + 50; 
    let bars = exerciseData.map((set, i) => {
      let height = yScale(set.weight);
      let y = props.height - height - 100;
      let width = repWidth[i];
      let x = nextX; 
      nextX = x + width + padding; 

      return (
        <Rect 
          key={i}
          height={height}
          width={width}
          x={x}
          y={y} />
      )
    }); 

    return (
      <g>{bars}</g>
    );
  }
};

export default Bar