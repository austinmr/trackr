import React, { PropTypes } from 'react'
import { calculateRounded1RM } from '../../utils/calculators'

import { Row, Col, Modal, Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';

export default class TemplateNameModal extends React.Component {
  static propTypes = {
    showTemplateNameModal: PropTypes.bool.isRequired,
    dispatchSaveTemplate: PropTypes.func.isRequired,
  }

  state = {
    templateName: '',
    templateType: '', 
    templatePlan: ''
  }

  handleChange = (e) => {
    this.setState({
      [`${e.target.id}`]: e.target.value,
    }); 
  }

  handleSaveTemplateName = (e) => {
    e.preventDefault(); 
    const { templateName } = this.state; 
    const { dispatchSaveTemplate } = this.props; 
    if (!templateName) {
      return; 
    }
    dispatchSaveTemplate(templateName)
  }

  render() {
    const { exerciseName, showTemplateNameModal } = this.props; 
    const { templateName } = this.state; 

    return (
      <Modal show={showTemplateNameModal} animation={true}> 
        <Modal.Header>
          <Modal.Title>Template Name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          TRACKR recommends giving your new workout template a name!
          Enter a name for this template below. 
          <Form >
            <FormGroup>
              <ControlLabel style={{marginBottom: '10px', fontSize: '16px'}}>Template Name</ControlLabel>
              <FormControl id="templateName" type="text" onChange={(e) => {this.handleChange(e)}} value={templateName}/>
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={e => this.handleSaveTemplateName(e)}>Save Template</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

