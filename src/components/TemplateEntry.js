import React from 'react'
import { Row, Col, ProgressBar, Panel, Button } from 'react-bootstrap';
// import { formatDate } from '../date/date'

// let skillLevel = Math.max((Math.floor(Math.random() * 100)), 65); 


export default ({id, exercises, onClick}) => {
  return (
      <Panel> 
        <Row height={50}> 
          <Col xs={6} md={6}> 
            <h3> {`Template: ${id}`} </h3> 
            <Button onClick={onClick}> Start Workout from Template </Button> 
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