import React from 'react'
import { Row, Col, Panel, Well } from 'react-bootstrap';
import ProgramEntry from './ProgramEntry'

export default ({ programs, editProgram, genWorkouts }) => {

  return (
    <Panel className='profileActivePanel'> 
      <Row> 
      <Col xs={10} md={10} xsOffset={1} mdOffset={1} className='profileActivePanelHeader'>
        <h1> PROGRAMS </h1> 
      </Col>
      </Row>
      <Row> 
        <Col xs={10} md={10} xsOffset={1} mdOffset={1}>
          <p> Some default text about programs </p>
        </Col>
      </Row> 
      <Row>
        <Well className='profileActiveWell'>
          {programs.map((program, i) => (
            <ProgramEntry 
              key={i} 
              {...program}
              onClick={()=>{editProgram(program)}}
              genWorkouts={()=>{genWorkouts(program, 'None')}} 
              genVolumeDeload={()=>{genWorkouts(program, 'Volume')}}
              genWeightDeload={()=>{genWorkouts(program, 'Weight')}}
            />
          ))}
        </Well>
      </Row>
    </Panel> 
  ) 
}
