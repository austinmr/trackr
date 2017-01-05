import React from 'react'
import { Row, Col, Panel, Button } from 'react-bootstrap';

export default ({weeklyPlanID, weeklyPlanName, complete, planTemplates, onClick, generateWorkouts }) => {
  const _renderButton = (planTemplates, onClick) => {
    if (!complete) {
      return (
        <Button onClick={onClick}> Edit Plan </Button>
      )
    } else {
      return (
        <Button onClick={generateWorkouts}> Generate Workouts </Button>
      )
    }
  }

  return (
      <Panel> 
        <Row height={50}> 
          <Col xs={6} md={6}> 
            <h3> {`Plan: ${weeklyPlanName}`} </h3> 
          </Col> 
          <Col xs={6} md={6} style={{marginTop: 25}}> 
            {_renderButton(planTemplates, onClick)}
            <p>{JSON.stringify(planTemplates)} </p>
          </Col>
        </Row>
      </Panel>
    )
}