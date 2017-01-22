import React from 'react'
import { Row, Col, Panel, Button } from 'react-bootstrap';

export default ({programID, programName, complete, programTemplates, onClick, genWorkouts, genVolumeDeload, genWeightDeload }) => {
  const _renderButton = (programTemplates, onClick) => {
    if (!complete) {
      return (
        <Button onClick={onClick}> Edit Plan </Button>
      )
    } else {
      return (
        <div>
          <Button onClick={genWorkouts}> Generate Workouts </Button>
          <Button onClick={genVolumeDeload}> Volume Deload </Button>
          <Button onClick={genWeightDeload}> Weight Deload </Button>
        </div> 
      )
    }
  }

  return (
      <Panel className='profileActiveEntry'> 
        <Row height={50}> 
          <Col xs={10} md={10} xsOffset={1} mdOffset={1} className='underline'> 
            <h1> {`Plan: ${programName.toUpperCase()}`} </h1> 
          </Col> 
          <Col xs={6} md={6} style={{marginTop: 25}}> 
            <p>{JSON.stringify(programTemplates)}</p>
          </Col>
        </Row>
        <Row>
          {_renderButton(programTemplates, onClick)}
        </Row>
      </Panel>
    )
}