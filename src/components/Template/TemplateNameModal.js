import React, { PropTypes } from 'react'
import _ from 'underscore'
// import { calculateRounded1RM } from '../../utils/calculators'
// import presets from '../../constants/TemplateTypePresets'

import { Row, Col, Modal, Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';

export default class TemplateNameModal extends React.Component {
  static propTypes = {
    showTemplateNameModal: PropTypes.bool.isRequired,
    dispatchSaveTemplate: PropTypes.func.isRequired,
  }

  state = {
    templateName: '',
    templateType: 'none', 
    templateProgram: '',
    templateProgramID: '',
    templateProgramName: '',
    templateProgramIndex: '', 
    newTemplateProgram: '',
    newProgram: false, 
    disableSubmit: false
  }

  handleChange = (e) => {
    this.setState({
      [`${e.target.id}`]: e.target.value,
    }); 
  }

  handleTemplateType = (e) => {
    e.preventDefault();
    console.log(e.target.value)

    this.setState({
      templateType: e.target.value
    }); 
  }

  handleTemplateProgram = (e) => {
    e.preventDefault(); 
    console.log(e.target.value)

    this.setState({
      templateProgram: e.target.value
    }); 
  }

  handleSaveTemplateName = (e, newProgramObject) => {
    e.preventDefault(); 
    // console.log(newPlanObject); 
    const { templateName, templateProgram, templateType } = this.state;
    const { userPrograms, dispatchSaveTemplate } = this.props; 
    let templateProgramName = 'none';
    let templateProgramID = 0; 

    // Data validation 
    if (!templateName) {
      return; 
    }

    if (newProgramObject) {
      templateProgramName = newProgramObject.programName; 
      templateProgramID = newProgramObject.programID;
    } else if (templateProgram !== '') {
      let userProgram = userPrograms[templateProgram]; 
      templateProgramName = userProgram.programName; 
      templateProgramID = userProgram.programID; 
    }
    
    // console.log(templatePlanName, templatePlanID); 
    dispatchSaveTemplate(templateName, templateType, templateProgramName, templateProgramID); 
  }

  handleNewUserProgram = (e) => {
    e.preventDefault();  
    const { newTemplateProgram } = this.state; 
    const { dispatchBlankUserProgram } = this.props; 
    console.log('CREATING NEW PLAN', newTemplateProgram); 
    if (!newTemplateProgram) {
      return; 
    }
    dispatchBlankUserProgram(newTemplateProgram); 
    this.setState({
      newProgram: true,
      disableSubmit: true
    })
  }

  _renderCreateProgramButton = () => {
    let { newProgram, newTemplateProgram } = this.state; 
    if (newProgram) {
      return (
        <h3> {newTemplateProgram} </h3>
      )
    } else {
      return (
        <Button onClick={e => this.handleNewUserProgram(e)}>Create Program</Button>
      )
    }
  }

  _renderSubmitButton = () => {
    let { newProgram, newTemplateProgram } = this.state; 
    const { userPrograms } = this.props; 

    let newProgramObject = _.findWhere(userPrograms, {programName: newTemplateProgram}); 
    if (newProgram && newProgramObject) {
      return (
        <Button onClick={e => this.handleSaveTemplateName(e, newProgramObject)} disabled={false}>Save Template</Button>
      )
    } else if (newProgram && !newProgramObject) {
      return (
        <Button disabled={true}>Save Template</Button>
      )
    } else {
      return (
        <Button onClick={e => this.handleSaveTemplateName(e)} disabled={false}>Save Template</Button>
      )
    }
  }

  render() {
    const { showTemplateNameModal, userPrograms } = this.props; 
    const { templateName, newTemplateProgram } = this.state; 

    return (
      <Modal show={showTemplateNameModal} animation={true}> 
        <Modal.Header>
          <Modal.Title>Template Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          TRACKR recommends giving your new workout template a name!
          Enter a name for this template below. 
          <Form >
            <FormGroup>
              <ControlLabel style={{marginBottom: '10px', fontSize: '16px'}}>Template Name</ControlLabel>
              <FormControl id="templateName" type="text" onChange={(e) => {this.handleChange(e)}} value={templateName}/>
            </FormGroup>
          Additionally, you can specify the main muscle group for this template. 
          <FormGroup>
            <ControlLabel style={{marginBottom: '10px', fontSize: '16px'}}>Template Type</ControlLabel>
            <FormControl componentClass="select" placeholder="select" id="templateType" onChange={(e) => this.handleTemplateType(e)}>
              <option value="None">Select</option>
              <option value="Chest">Chest</option>
              <option value="Back">Back</option>
              <option value="Legs">Legs</option>
              <option value="Shoulders">Shoulders</option>
              <option value="Arms">Arms</option>
            </FormControl>
          </FormGroup>
          <FormGroup>
            <ControlLabel style={{marginBottom: '10px', fontSize: '16px'}}>Template Program</ControlLabel>
            <FormControl componentClass="select" placeholder="select" id="templateProgram" onChange={(e) => this.handleTemplateProgram(e)}>
              <option value="None">Select</option>
              {userPrograms.map((program, i) => (
                <option key={i} value={i}>{program.programName}</option>
              ))}
            </FormControl>
          </FormGroup>
          <Row>
            <Col xs={6} md={6}>
              <FormGroup>
                <ControlLabel style={{marginBottom: '10px', fontSize: '16px'}}>New Custom Program</ControlLabel>
                <FormControl id="newTemplateProgram" type="text" onChange={(e) => {this.handleChange(e)}} value={newTemplateProgram}/>
              </FormGroup>
            </Col>
            <Col xs={6} md={6}>
              {this._renderCreateProgramButton()}
            </Col>
          </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {this._renderSubmitButton()}
        </Modal.Footer>
      </Modal>
    )
  }
}