import React, { PropTypes } from 'react'
import { Panel, Row, Col } from 'react-bootstrap';

const Exercise = ({ exerciseID, exerciseName, onClick }) => (
  <Panel onClick={()=>{onClick(exerciseID, exerciseName)}}> 
    <Row style={{borderBottom: '1px solid black'}}> 
      <Col xs={3} md={3}>
      </Col>
      <Col xs={6} md={6}>
        <h3> {exerciseName} </h3> 
      </Col>
      <Col xs={3} md={3}>
      </Col>
    </Row> 
  </Panel>
)

export default Exercise