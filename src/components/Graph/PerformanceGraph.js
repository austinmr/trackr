import React, { PropTypes } from 'react'
import * as d3 from "d3"

import OneRepMaxBar from './OneRepMaxBar'
// import XAxis from './XAxis'

import { Panel, Row } from 'react-bootstrap'
// import formatDate from '../../date/date'

const width = 800;
const height = 800; 

const calculateOneRepMax = (set) => {
  return Math.floor(set.weight / (1.0278 - (.0278 * set.reps))); 
}

const _renderOneRepMax = (sets) => {
  return (
    <div>
      {sets.map((s, i) => (
        <p key={s.id}> {`Set ${i}: ${calculateOneRepMax(s)}`} </p>
      ))}
    </div>
  )
}

const reduceCalculateMax = (exerciseArray) => {
  return exerciseArray.map((exercise) => {
    return exercise.sets
    .map((set) => {
      return Math.floor(parseInt(set.weight) / (1.0278 - (.0278 * parseInt(set.reps)))); 
    })
    .reduce((a,b) => {
      return Math.max(a,b)
    })
  })
}

// let xScale = d3.scale.ordinal()
//   .domain(d3.range(this.props.data.length))
//   .rangeRoundBands([0, this.props.width], 0.05); 


const PerformanceGraph = ({ exerciseArray }) => {

  let xScale = d3.scaleBand().rangeRound([0, 800]).padding(0.1); 
  let yScale = d3.scaleLinear().rangeRound([800, 0]); 
  let maxData = reduceCalculateMax(exerciseArray)
  xScale.domain(maxData.map((d, i) => { return i; }));
  yScale.domain([0, d3.max(maxData)]);

  let xValues = exerciseArray.map((exercise, i) => {
    console.log(exercise.date);
    return `${(exercise.date)} : ${maxData[i]}`; 
  })

  return (
  <Panel> 
    <Row> 
      <svg width={850} height={850} style={{margin: 20}}>
          <OneRepMaxBar
            key={exerciseArray.id + 'i'}
            exerciseArray={exerciseArray} 
            width={width} 
            height={height} 
            xScale={xScale}
            yScale={yScale}
            maxData={maxData}
          />
          <g className="xyAxis">
            <XAxis 
              xScale={xScale}
              xValues={xValues}
              translate={`translate(0,${800})`}
            />
          </g>
      </svg> 
    </Row>
  </Panel>
  )
}

export default PerformanceGraph
