import React from 'react'
import { Row, Col, ProgressBar, Panel } from 'react-bootstrap';

export default ({id, exercises }) => {
  return (
      <Panel> 
        <Row height={50}> 
          <Col xs={6} md={6}> 
            <h3> {`Workout: ${id}`} </h3> 
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