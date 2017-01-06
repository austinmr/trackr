import React from 'react'
import { Row, Col, Panel, Button, ProgressBar } from 'react-bootstrap';

export class TemplateEntry extends React.Component {
  _renderButtons = () => {
    const { buttonText } = this.props; 
    if (buttonText === 'Add Template') {
      const { addTemplate } = this.props; 
      return (
        <Button onClick={addTemplate}> Add Template </Button> 
      )
    } else if (buttonText === 'Start Workout') {
      const { createWorkout, createVolumeDeload, createWeightDeload } = this.props; 
      return (
        <Row>
          <Button onClick={createWorkout}> Start Workout </Button> 
          <Button onClick={createVolumeDeload}> Volume Deload </Button> 
          <Button onClick={createWeightDeload}> Weight Deload </Button> 
        </Row>
      )
    }
  }

  render() {
    const { templateName, exercises } = this.props; 
    return (
      <Panel> 
        <Row height={50}> 
          <Col xs={6} md={6}> 
            <h5> {`Template: ${templateName}`} </h5> 
            {this._renderButtons()}
          </Col> 
          <Col xs={6} md={6} style={{marginTop: 25}}> 
            <ProgressBar bsStyle={'success'} now={80} label={`${2000} points`}/>
            {exercises.map((e, i) => 
              <p key={`${e.exercise + i}`}> {`${e.exercise}: [ ${e.sets.length} sets ]`} </p>
            )}
          </Col>
        </Row>
      </Panel>
    )
  }
}

export default TemplateEntry