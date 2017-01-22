import React from 'react'
import dateFormat from 'dateformat'
import { Row, Col, Panel } from 'react-bootstrap'

export default ({workoutDate, exercises }) => {
  return (
      <Panel className='profileActiveEntry'> 
        <Row height={50}> 
          <Col xs={10} md={10} xsOffset={1} mdOffset={1} className='underline'> 
            <h1> {`WORKOUT [${dateFormat(JSON.parse(workoutDate), "ddd mmm d").toUpperCase()}]`} </h1> 
          </Col> 
          <Col xs={10} md={10} xsOffset={1} mdOffset={1}> 
          {exercises.map((e, i) => 
            <p key={`${e.exercise + i}`}> {`${e.exercise}: [ ${e.sets.length} sets ]`} </p>
          )}
          </Col>
        </Row>
      </Panel>
    )
}