import React from 'react'

const GridLine = ({ yValue, weight, svgMargin }) => (
  <g> 
    <text x={10} y={(yValue * 120) + svgMargin}> 
      {`${weight}`}
    </text>
    <line x1={50} x2={700} y1={(yValue* 120) + svgMargin}  y2={(yValue* 120) + svgMargin} strokeWidth="2" stroke="black"/>
  </g>
)

export default GridLine