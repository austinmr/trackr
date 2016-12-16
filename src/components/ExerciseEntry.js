import React, { PropTypes } from 'react'
import AddSet from '../containers/AddSet'
import Sets from './Sets'
import { Panel, Row, Col } from 'react-bootstrap';

const Exercise = ({ id, exercise, sets, onClick }) => (
  <Panel> 
    <Row style={{borderBottom: '1px solid black'}}> 
      <Col xs={3} md={3}>
      </Col>
      <Col xs={6} md={6}>
        <h3> {exercise} </h3> 
      </Col>
      <Col xs={3} md={3}>
      </Col>
    </Row> 
    <Row> 
      <Col xs={12} md={12} style={{marginTop: 10}}>
        <AddSet exerciseId={id}/>
      </Col>
    </Row>
    <Row>
      <Sets sets={sets}/>
    </Row>
  </Panel>
)

export default Exercise

