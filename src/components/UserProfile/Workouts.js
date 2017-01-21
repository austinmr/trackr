import React from 'react'
import { Row, Col, Panel, Well, Button } from 'react-bootstrap';
import WorkoutEntry from './WorkoutEntry'

export default ({ onClick, workouts }) => {

  return (
    <Panel className='profileActivePanel'> 
      <Row> 
      <Col xs={10} md={10} xsOffset={1} mdOffset={1} className='profileActivePanelHeader'>
        <h1> WORKOUTS </h1> 
      </Col>
      </Row>
      <Row> 
        <Col xs={10} md={10} xsOffset={1} mdOffset={1}>
          <p> Some default text about workouts </p>
        </Col>
      </Row> 
      <Row>
        <Well className='profileActiveWell'>
          {workouts.map((workout, i) => (
            <WorkoutEntry 
              key={workout.workoutID} 
              {...workout}
            />
          ))}
        </Well>
      </Row>
    </Panel> 
  ) 
}
