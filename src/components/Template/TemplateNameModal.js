import React, { PropTypes } from 'react'
import { calculateRounded1RM } from '../../utils/calculators'
import _ from 'underscore'
import presets from '../../constants/TemplateTypePresets'

import { Row, Col, Modal, Form, FormGroup, FormControl, ControlLabel, Button, DropdownButton, MenuItem } from 'react-bootstrap';

export default class TemplateNameModal extends React.Component {
  static propTypes = {
    showTemplateNameModal: PropTypes.bool.isRequired,
    dispatchSaveTemplate: PropTypes.func.isRequired,
  }

  state = {
    templateName: '',
    templateType: 'none', 
    templatePlanName: '',
    templatePlanID: '',
    templatePlanIndex: '', 
    newTemplatePlan: '',
    newPlan: false, 
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

  handleTemplatePlan = (e) => {
    e.preventDefault(); 
    console.log(e.target.value)

    this.setState({
      templatePlan: e.target.value
    }); 
  }

  handleSaveTemplateName = (e, newPlanObject) => {
    e.preventDefault(); 
    // console.log(newPlanObject); 
    const { templateName, templatePlan, templateType } = this.state;
    const { userPlans, dispatchSaveTemplate } = this.props; 
    let templatePlanName = 'none';
    let templatePlanID = 0; 

    // Data validation 
    if (!templateName) {
      return; 
    }

    if (newPlanObject) {
      templatePlanName = newPlanObject.weeklyPlanName; 
      templatePlanID = newPlanObject.weeklyPlanID;
    } else if (templatePlan !== '') {
      let userPlan = userPlans[templatePlan]; 
      templatePlanName = userPlan.weeklyPlanName; 
      templatePlanID = userPlan.weeklyPlanID; 
    }
    
    // console.log(templatePlanName, templatePlanID); 
    dispatchSaveTemplate(templateName, templateType, templatePlanName, templatePlanID); 
  }

  handleNewUserPlan = (e) => {
    e.preventDefault();  
    const { newTemplatePlan } = this.state; 
    const { dispatchBlankUserPlan } = this.props; 
    console.log('CREATING NEW PLAN', newTemplatePlan); 
    if (!newTemplatePlan) {
      return; 
    }
    dispatchBlankUserPlan(newTemplatePlan); 
    this.setState({
      newPlan: true,
      disableSubmit: true
    })
  }

  _renderCreatePlanButton = () => {
    let { newPlan, newTemplatePlan } = this.state; 
    if (newPlan) {
      return (
        <h3> {newTemplatePlan} </h3>
      )
    } else {
      return (
        <Button onClick={e => this.handleNewUserPlan(e)}>Create Plan</Button>
      )
    }
  }

  _renderSubmitButton = () => {
    let { newPlan, newTemplatePlan, templatePlanIndex } = this.state; 
    const { userPlans } = this.props; 

    let newPlanObject = _.findWhere(userPlans, {weeklyPlanName: newTemplatePlan}); 
    if (newPlan && newPlanObject) {
      return (
        <Button onClick={e => this.handleSaveTemplateName(e, newPlanObject)} disabled={false}>Save Template</Button>
      )
    } else if (newPlan && !newPlanObject) {
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
    const { exerciseName, showTemplateNameModal, userPlans } = this.props; 
    const { templateName, templateType, templatePlanName, newTemplatePlan, disableSubmit } = this.state; 

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
            <ControlLabel style={{marginBottom: '10px', fontSize: '16px'}}>Template Plan</ControlLabel>
            <FormControl componentClass="select" placeholder="select" id="templatePlan" onChange={(e) => this.handleTemplatePlan(e)}>
              <option value="None">Select</option>
              {userPlans.map((plan, i) => (
                <option key={i} value={i}>{plan.weeklyPlanName}</option>
              ))}
            </FormControl>
          </FormGroup>
          <Row>
            <Col xs={6} md={6}>
              <FormGroup>
                <ControlLabel style={{marginBottom: '10px', fontSize: '16px'}}>New Custom Plan</ControlLabel>
                <FormControl id="newTemplatePlan" type="text" onChange={(e) => {this.handleChange(e)}} value={newTemplatePlan}/>
              </FormGroup>
            </Col>
            <Col xs={6} md={6}>
              {this._renderCreatePlanButton()}
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

          // <Row>
          // <Col xs={6} md={6}>
          // <DropdownButton id="templateType" title={'Template Type'} onSelect={this.handleTemplateType}>
          //   <MenuItem eventKey="0">None</MenuItem>
          //   <MenuItem eventKey="1">Chest</MenuItem>
          //   <MenuItem eventKey="2" >Back</MenuItem>
          //   <MenuItem eventKey="3">Legs</MenuItem>
          //   <MenuItem eventKey="4">Shoulders</MenuItem>
          //   <MenuItem eventKey="5">Arms</MenuItem>
          // </DropdownButton>
          // </Col>
          // <Col xs={6} md={6}>
          //   <h3> {`Template aType: ${templateType}`} </h3> 
          // </Col>
          // </Row> 
          // <DropdownButton id="templatePlan" title={'Template Plan'} onSelect={this.handleTemplatePlan}>
          //   <MenuItem eventKey="0" onClick={e => this.handleTemplatePlan(e)}>None</MenuItem>
          //   {userPlans.map((plan, i) => (
          //     <MenuItem key={i} eventKey={i+1} id="Chest" onClick={e => this.handleTemplatePlan(e)}>{plan.weeklyPlanName}</MenuItem>
          //   ))}
          // </DropdownButton>