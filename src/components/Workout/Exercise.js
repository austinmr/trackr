import React from 'react'
import AddSetReps from '../../containers/Workout/AddSetReps'
import { Row, Col, Panel, Well } from 'react-bootstrap'

const ExerciseRow = ({ exercise, id, currentOneRepMax, sets, onClick }) => (
  <Panel style={{borderRadius: 0}}> 
    <Row style={{borderBottom: '1px solid black', background: 'black', color: 'white', fontFamily: 'Source Sans Pro'}}> 
      <Col xs={12} md={12}>
        <span> <h4 style={{display: 'inline'}}>EXERCISE</h4><h2 style={{display: 'inline'}}>{exercise} </h2> </span>
        <h4> {`1RM: ${currentOneRepMax}`} </h4>
      </Col>
    </Row> 
    <Row style={{borderBottom: '1px solid black'}}> 
      <Col xs={1} md={1}>
        <h4 style={{textAlign: "center"}}> set </h4>
      </Col> 
      <Col xs={2} md={2}>
        <h4 style={{textAlign: "center"}}> weight </h4>
      </Col> 
      <Col xs={2} md={2}>
        <h4 style={{textAlign: "center"}}> reps </h4>
      </Col> 
    </Row>
      {sets.map((set, i) => 
        <Row key={id + i} style={{marginTop: 10}}> 
          <Col xs={1} md={1}>
            <h4 style={{textAlign: "center"}}> {`${i+1}`} </h4>
          </Col> 
          <Col xs={2} md={2}>
            <Well bsSize="small" style={{marginTop: 3, marginBottom: 3, marginLeft: 10, textAlign: "center"}}>
              {`${set.weight}`}
            </Well>
          </Col> 
          <Col xs={2} md={2} style={{marginTop: 5}}>
            <AddSetReps 
              exerciseID={id}
              setID={set.id}
              {...set}
            />
          </Col> 
          <Col xs={7} md={7}>
            <h4> {`[ target reps: ${set.targetReps} ]`} </h4>
          </Col> 
        </Row>
      )}
  </Panel>
)

export default ExerciseRow
