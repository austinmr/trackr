import React from 'react'
import { Grid, Row, Col, Panel, Well, Button } from 'react-bootstrap';
import TemplateEntry from './TemplateEntry'

export default ({ templates, onClick, createWorkout, createVolumeDeload, createWeightDeload  }) => {

  return (
    <Panel className='profileActivePanel'> 
      <Row> 
      <Col xs={10} md={10} xsOffset={1} mdOffset={1} className='profileActivePanelHeader'>
        <h1> TEMPLATES </h1> 
      </Col>
      </Row>
      <Row> 
        <Col xs={10} md={10} xsOffset={1} mdOffset={1}>
          <p> TRACKR templates allow you to create customized daily workouts based on your individual fitness levels and performance metrics. Create a new workout template and start tracking your progress today. </p>
        </Col>
        <Col xs={4} md={4} xsOffset={1} mdOffset={1}>
          <Button className='squareButton' onClick={onClick}> CREATE NEW TEMPLATE </Button>
        </Col> 
      </Row> 
      <Row>
        <Well className='profileActiveWell'>
          {templates.map((template, i) => (
            <TemplateEntry 
              key={template.templateID} 
              buttonText={'Start Workout'}
              createWorkout={()=>{createWorkout(template)}} 
              createVolumeDeload={()=>{createVolumeDeload(template)}}
              createWeightDeload={()=>{createWeightDeload(template)}}
              {...template}
            />
          ))}
        </Well>
      </Row>
    </Panel> 
  ) 
}
