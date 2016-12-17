import React, { PropTypes } from 'react'
import AddSet from '../../containers/Template/AddSet'
import UserExerciseData from '../../containers/Template/UserExerciseData'
import Sets from './Sets'
import { Panel, Row, Col } from 'react-bootstrap';

const Exercise = ({ id, exercise, sets, onClick }) => (
  <Panel> 
    <Row style={{borderBottom: '1px solid black'}}>
      <UserExerciseData exerciseID={id} exerciseName={exercise}/>
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

