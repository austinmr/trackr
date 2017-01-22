import React from 'react'
import * as d3 from 'd3'
import { formatDomain } from '../../utils/calculators'
import Axes from './Axes'
import Gridlines from './Gridlines'

export default class LineGraph extends React.Component {

  render() {
    let { data } = this.props; 

    // Set dimensions and margins for the graph 
    const margin =  {top: 50, right: 50, bottom: 50, left: 50}; 
    const svgHeight = 700
    const svgWidth = 500
    const height = svgHeight - margin.top - margin.bottom;
    const width = svgWidth - margin.left - margin.right;

    let minY = d3.min(data, function(d) { return d.oneRepMax; })
    let maxY = d3.max(data, function(d) { return d.oneRepMax; })
    let formattedDomain = formatDomain(minY, maxY)

    // set the ranges
    let y = d3.scaleLinear()
      .domain(formattedDomain)
      .range([height, 0]); 

    let x = d3.scaleTime()
      .domain(d3.extent(data, function(d) { return d.date; }))
      .range([0, width]);

    // define the line 
    let line = d3.line()
      .x((d) => { return x(d.date); })
      .y((d) => { return y(d.oneRepMax); });

    let dates = data.map(d => d.date)

    let d3Props = {
      width, 
      height, 
      x, 
      y,
      dates
    }

    return (
      <div style={{ backgroundColor:"#D3D3D3", height: 800, width: 600, textAlign: "center"}}> 
        <svg style={{height: svgHeight, width: svgWidth}}>
          <g transform={'translate('+margin.left +', ' + margin.top + ')'}>
            <path 
              d={line(data)}
              fill="none"
              stroke="aqua"
              strokeWidth={3}
            />
            <Axes {...d3Props} />
            <Gridlines {...d3Props} />
          </g>
        </svg>
      </div>
    )
  }
}
