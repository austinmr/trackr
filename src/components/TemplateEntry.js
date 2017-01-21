import React from 'react'
import { Row, Col, ProgressBar, Panel, Button } from 'react-bootstrap';
// import { formatDate } from '../date/date'

// let skillLevel = Math.max((Math.floor(Math.random() * 100)), 65); 

export default ({templateName, exercises, createWorkout, createVolumeDeload, createWeightDeload, addTemplate, buttonText}) => {
  return (
      <Panel> 
        <Row height={50}> 
          <Col xs={6} md={6}> 
            <h3> {`Template: ${templateName}`} </h3> 
            <Button onClick={createWorkout}> Start Workout </Button> 
            <Button onClick={createVolumeDeload}> Volume Deload </Button> 
            <Button onClick={createWeightDeload}> Weight Deload </Button> 
          </Col> 
          <Col xs={6} md={6} style={{marginTop: 25}}> 
            <ProgressBar bsStyle={'success'} now={80} label={`${2000} points`}/>
            {exercises.map((e, i) => 
              <p key={`${e.exercise + i}`}> {`${e.exercise}: [ ${e.sets.length} sets ]`} </p>
            )}
          </Col>
        </Row>
      </Panel>
    )
}

