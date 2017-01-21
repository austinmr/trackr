import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { addSet } from '../../actions/templates' 
import presets from '../../constants/RepPresets'

import { Row, Col, Form, FormGroup, FormControl, ControlLabel, Button, DropdownButton, MenuItem } from 'react-bootstrap';

export class AddSet extends React.Component {
  static propTypes = {
    exerciseId: PropTypes.string.isRequired,
    dispatchAddSet: PropTypes.func.isRequired,
  }

  state = {
    reps: '',
    previousReps: null,
  }

  handleAddSet = (e) => {
    e.preventDefault() 
    const { exerciseId, dispatchAddSet } = this.props;
    let { reps } = this.state; 

    if (!reps) {
      return
    }

    dispatchAddSet(exerciseId, reps);
    this.setState({
      reps: '',
      previousReps: reps, 
    })
  }

  handleAddSetRange = (e) => {
    const { exerciseId, dispatchAddSet } = this.props;
    let repRange = e.target.value
    repRange = repRange.split(',')

    repRange.map((reps) => {
      return dispatchAddSet(exerciseId, reps)
    }); 
  }

  handleChange = (e) => {
    this.setState({
      [`${e.target.id}`]: e.target.value,
    }); 
  }

  render() {
    return (
      <Form onSubmit={e => this.handleAddSet(e)}>
        <Row>
          <FormGroup>
            <Col xs={4} md={4}>
              <ControlLabel style={{marginBottom: '10px', fontSize: '16px'}}>Reps</ControlLabel>
              <FormControl id="reps" type="text" onChange={(e) => {this.handleChange(e)}} value={this.state.reps}/>
            </Col>
            <Col xs={2} md={2}>
              <Button type="submit">
                Add Set
              </Button>
            </Col>
            <Col xs={2} md={2}>
              <Button onClick={e => this.handleAddSet(e)}>
                Duplicate Set
              </Button>
            </Col>
          </FormGroup>
          <Col xs={4} md={4}>
            <FormGroup>
              <ControlLabel style={{fontSize: '16px'}}>Rep Presets</ControlLabel>
              <FormControl componentClass="select" placeholder="select" id="templateType" onChange={(e) => this.handleAddSetRange(e)}>
                <option value="select">select</option>
                {presets.map((preset, i) => (
                  <option key={i} value={preset}>{`${preset}`}</option>
                ))}
              </FormControl>
            </FormGroup>
          </Col>
        </Row>
      </Form>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchAddSet: (exerciseId, reps) => {
    dispatch(addSet(exerciseId, reps))
  },
}) 

export default connect(null, mapDispatchToProps)(AddSet)
