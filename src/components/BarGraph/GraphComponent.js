// import React, { PropTypes } from 'react'
// import * as d3 from "d3";
// import { gridLineArray, graphMaxValue } from '../../utils/calculators'

// import GridLine from './GridLine'
// import Bars from './GraphBars'

// import { Panel, Row } from 'react-bootstrap';

// const Graph = ({ currentOneRepMax, sets }) => {

//   const width = 650;
//   const height = 650; 
//   const svgMargin = 50; 
//   const margin =  {top: 25, right: 25, bottom: 25, left: 25}; 
//   const padding = 10; 

//   let repsArray = sets.map((set) => set.completedReps); 
//   let graphMaximumValue = graphMaxValue(currentOneRepMax); 

//   let yScale = d3.scaleLinear()
//     .domain([0, graphMaximumValue])
//     .range([0, height]);

//   let xScale = d3.scaleLinear()
//     .domain([0, d3.max(repsArray)])
//     .range([0, (width-(svgMargin * 2))]);

//   return (
//     <Panel className='resultsGraphPanel'> 
//       <svg id='resultBarGraph'>
//         {gridLineArray(currentOneRepMax).map((gridElement, i) => (
//           <GridLine key={'Gridline' + i} svgMargin={svgMargin} {...gridElement} /> 
//         ))}
//         <Bars
//           width={width} 
//           height={height} 
//           xScale={xScale}
//           yScale={yScale}
//           svgMargin={svgMargin}
//           sets={sets}
//           padding={padding}
//           repsArray={repsArray}
//         />
//       </svg> 
//     </Panel>
//   )
// }

// export default Graph



