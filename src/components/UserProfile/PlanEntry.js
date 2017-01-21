import React from 'react'
import { Row, Col, Panel, Button } from 'react-bootstrap';

export default ({weeklyPlanID, weeklyPlanName, complete, planTemplates, onClick, genWorkouts, genVolumeDeload, genWeightDeload }) => {
  const _renderButton = (planTemplates, onClick) => {
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
            <h1> {`Plan: ${weeklyPlanName.toUpperCase()}`} </h1> 
          </Col> 
          <Col xs={6} md={6} style={{marginTop: 25}}> 
            <p>{JSON.stringify(planTemplates)}</p>
          </Col>
        </Row>
        <Row>
          {_renderButton(planTemplates, onClick)}
        </Row>
      </Panel>
    )
}