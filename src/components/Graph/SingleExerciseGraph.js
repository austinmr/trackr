import React, { PropTypes } from 'react'
import Bar from './Bar'
import GridLine from './GridLine'

import { gridLineArray, graphMaxValue } from '../../utils/calculators'

import { Panel, Row } from 'react-bootstrap';

const width = 650;
const height = 650; 

// const Graph = ({ currentOneRepMax, sets }) => (
//   <Panel> 
//     <svg style={{height: height, width: width, paddingTop: 25, padddingBottom: 25}} >
//       {[0,1,2,3,4,5].map((num) => (
//       <text x="10" y={num * 100} font-family="Verdana" font-size="35">
//         {`${50*num} lbs`}
//       </text>
//       ))}
//       {[0,1,2,3,4,5].map((num) => (
//         <line x1={50} y1={num* 100} x2={700} y2={num* 100} strokeWidth="2" stroke="black"/>
//       ))}
//       <Bar 
//         data={sets} 
//         width={width} 
//         height={height}
//       />
//     </svg> 
//   </Panel>
// )
const Graph = ({ currentOneRepMax, sets }) => (
  <Panel> 
    <svg style={{height: height, width: width, marginTop: 25, marginBottom: 25}} >
        <line x1={200} x2={500} y1={10} y2={10} strokeWidth="2" stroke="blue"/>
        {gridLineArray(currentOneRepMax).map((gridElement, i) => (
            <GridLine key={'Gridline' + i}{...gridElement}/> 
          ))}
        <Bar 
          data={sets}
          increment={graphMaxValue(currentOneRepMax)} 
          width={width} 
          height={height}
        />
        <line x1={200} x2={500} y1={500} y2={500} strokeWidth="2" stroke="gray"/>
        <line x1={200} x2={500} y1={600} y2={600} strokeWidth="2" stroke="orange"/>
    </svg> 
  </Panel>
)

export default Graph



