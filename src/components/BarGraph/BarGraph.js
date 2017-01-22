import React from 'react'
import * as d3 from 'd3'
import Axis from './Axis'
import Gridlines from '../LineChart/Gridlines'
import Bars from './GraphBars'

import { barGraphMaxValue } from '../../utils/calculators'
import { Panel } from 'react-bootstrap';

export default class BarGraph extends React.Component {

  render() {
    let { currentOneRepMax, sets } = this.props; 
    
    // Set dimensions and margins for the graph 
    const svgMargin = 25
    const margin =  {top: svgMargin, right: 50, bottom: svgMargin, left: 50}; 
    const svgHeight = 550;
    const svgWidth = 700;
    const padding = 15; 
    const height = svgHeight - margin.top - margin.bottom;
    const width = svgWidth - margin.left - margin.right;

    let repsArray = sets.map((set) => set.completedReps);
    let graphMaximumValue = barGraphMaxValue(currentOneRepMax); 

    let x = d3.scaleLinear()
      .domain([0, d3.max(repsArray)])
      .range([0, width]);

    let y = d3.scaleLinear()
      .domain([0, graphMaximumValue])
      .range([height, 0]);

    let d3Props = {
      width, 
      height, 
      x, 
      y,
      sets,
      padding, 
      svgMargin
    }

    return (
      <Panel className='resultsGraphPanel'> 
        <svg id='resultBarGraph'>
          <g transform={'translate('+margin.left +', ' + margin.top + ')'}>
            <Axis orient='left' {...d3Props} />
            <Gridlines repsArray={repsArray} {...d3Props} />
            <Bars repsArray={repsArray} {...d3Props} />
          </g>
        </svg>
      </Panel>
    )
  }
}