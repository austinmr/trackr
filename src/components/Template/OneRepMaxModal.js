import React, { PropTypes } from 'react'
import { calculateRounded1RM } from '../../utils/calculators'

import { Row, Col, Modal, Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';

export default class OneRepMaxModal extends React.Component {
  static propTypes = {
    showModal: PropTypes.bool.isRequired,
    exerciseName: PropTypes.string.isRequired,
    handleAddUserExercise: PropTypes.func.isRequired,
  }

  state = {
    weight: '',
    reps: '',
    oneRepMax: '',
  }

  handleChange = (e) => {
    this.setState({
      [`${e.target.id}`]: e.target.value,
    }); 
  }

  handleAddOneRepMax = (e) => {
    e.preventDefault(); 
    const { weight, reps, oneRepMax } = this.state; 
    const { handleAddUserExercise } = this.props; 
    const calculatedMax = calculateRounded1RM(weight, reps); 
    if (!oneRepMax && !calculatedMax) {
      return; 
    } 
    const max = calculatedMax || oneRepMax; 
    handleAddUserExercise(max); 
  }

  render() {
    const { exerciseName, showModal } = this.props; 
    const { weight, reps, oneRepMax } = this.state; 

    return (
      <div className="modal-container" style={{"position":"relative", height: 450}} >
        <Modal show={showModal} container={this} style={{"position":"absolute"}}> 
          <Modal.Header>
            <Modal.Title>New Exercise: {`${exerciseName}`}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            TRACKR database shows <strong>{`${exerciseName}`} </strong> is a new exercise for you. 
            Please enter your one rep max for this exercise. 
            You can use the calculators below to estimate your one rep max. 
            <Form >
              <Row>
                <FormGroup>
                  <Col xs={4} md={4}>
                    <ControlLabel style={{marginBottom: '10px', fontSize: '16px'}}>One Rep Max</ControlLabel>
                    <FormControl id="oneRepMax" type="number" onChange={(e) => {this.handleChange(e)}} value={oneRepMax}/>
                  </Col>
                </FormGroup>
              </Row>
              <Row>
                <FormGroup>
                  <Col xs={4} md={4}>
                    <ControlLabel style={{marginBottom: '10px', fontSize: '16px'}}>Weight</ControlLabel>
                    <FormControl id="weight" type="number" onChange={(e) => {this.handleChange(e)}} value={weight}/>
                  </Col>
                  <Col xs={4} md={4}>
                    <ControlLabel style={{marginBottom: '10px', fontSize: '16px'}}>Reps</ControlLabel>
                    <FormControl id="reps" type="number" onChange={(e) => {this.handleChange(e)}} value={reps}/>
                  </Col>
                  <Col xs={4} md={4}>
                    <ControlLabel style={{marginBottom: '10px', fontSize: '16px'}}>One Rep Max</ControlLabel>
                    <FormControl type="number" disabled="true" onChange={(e) => {this.handleChange(e)}} value={calculateRounded1RM(weight, reps)}/>
                  </Col>
                </FormGroup> 
              </Row> 
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={e => this.handleAddOneRepMax(e)}>Add One Rep Max</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

