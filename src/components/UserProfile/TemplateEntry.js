import React from 'react'
import { Row, Col, Panel, Button, ProgressBar } from 'react-bootstrap';

export class TemplateEntry extends React.Component {
  state = {
    displayActive: false,
  }

  handleClick = () => {
    console.log('ENTERING!')
    let { displayActive } = this.state;
    this.setState({displayActive: !displayActive})
  }

  _renderButtons = () => {
    const { buttonText } = this.props; 
    if (buttonText === 'Add Template') {
      const { addTemplate } = this.props; 
      return (
        <Button className='squareButtonWhite' onClick={addTemplate}> Add Template </Button> 
      )
    } else if (buttonText === 'Start Workout') {
      const { createWorkout, createVolumeDeload, createWeightDeload } = this.props; 
      return (
        <Row style={{marginTop: 20}}>
          <Col xs={10} md={10} xsOffset={1} mdOffset={1}> 
            <Button className='squareButtonWhite' onClick={createWorkout}> START WORKOUT </Button> 
          </Col>
          <Col xs={5} md={5} xsOffset={1} mdOffset={1}> 
            <Button className='squareButtonWhite' onClick={createVolumeDeload} > VOLUME DELOAD </Button> 
          </Col>
          <Col xs={5} md={5}> 
            <Button className='squareButtonWhite' onClick={createWeightDeload}> WEIGHT DELOAD </Button> 
          </Col>
        </Row>
      )
    }
  }

  _renderExercises = () => {
    const { displayActive } = this.state; 
    const { exercises } = this.props;
    if (displayActive) {
      return (
        <Col xs={10} md={10} xsOffset={1} mdOffset={1} style={{marginTop: 10}}> 
          {exercises.map((e, i) => 
            <p key={`${e.exercise + i}`}> {`${e.exercise}: [ ${e.sets.length} sets ]`} </p>
          )}
        </Col>
      )
    }
  } 

  render() {
    const { templateName, exercises, templateType, templatePlanName } = this.props; 
    return (
      <Panel className='profileActiveEntry'> 
        <Row> 
          <Col xs={10} md={10} xsOffset={1} mdOffset={1} className='underline'> 
            <h1> {`${templateName.toUpperCase()}`} </h1> 
          </Col> 
        </Row>
        <Row style={{marginTop: 20}} onClick={(e) => {this.handleClick(e)}}> 
          <Col xs={5} md={5} xsOffset={1} mdOffset={1}> 
             <h1> EXERCISES |</h1> <h2> {`${exercises.length || "[N/A]"}`} </h2>
          </Col> 
          <Col xs={5} md={5}> 
            <h1> TYPE |</h1> <h2> {`${templateType.toUpperCase() || "[N/A]"}`} </h2> 
          </Col> 
        </Row>
        <Row>
          {this._renderExercises()}
        </Row>
        {this._renderButtons()}
      </Panel>
    )
  }
}



export default TemplateEntry