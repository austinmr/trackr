import React from 'react'

const Label = ({ x, y, reps, fill }) => (
    <text x={x - 20} y={y} fill={fill} style={{'fontFamily': 'ModernSans', fontSize:80}}> 
      {`${reps}`}
    </text>
)

export default Label