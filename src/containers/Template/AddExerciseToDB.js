import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { addDBExercise } from '../../actions/dbExercises'

import { Row, Panel, Button, Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

export class AddExerciseToDB extends React.Component {
  static propTypes = {
    dispatchAddDBExercise: PropTypes.func.isRequired,
  }

  state = {
    exercise: this.props.exercise || '',
    exerciseType: ''
  }

  handleAddExerciseToDB = (e) => {
    e.preventDefault() 
    let { exercise, exerciseType } = this.state;
    const { dispatchAddDBExercise } = this.props; 
    if (!exercise) {
      return
    }
    if (exerciseType) {
      exercise = `${exercise} [${exerciseType}]`
    }
    console.log('exercise: ', exercise)
    console.log(exerciseType)
    dispatchAddDBExercise(exercise);
  }

  handleChange = (e) => {
    this.setState({
      [`${e.target.id}`]: e.target.value,
    }); 
  }

  render() {
    return (
      <Row>
        <Panel> 
          <h2> Exercise Not Found </h2> 
          <h4> Please enter exercise name below to add this the TRACKR database </h4> 
        </Panel> 
        <Form onSubmit={e => this.handleAddExerciseToDB(e)}>
          <FormGroup>
            <ControlLabel>Exercise Name</ControlLabel>
            <FormControl id="exercise" type="text" onChange={(e) => {this.handleChange(e)}} value={this.state.exercise}/>
            <ControlLabel>Exercise Type</ControlLabel>
            <FormControl id="exerciseType" componentClass="select" onChange={(e) => {this.handleChange(e)}} placeholder="select">
              <option value="select">select</option>
              <option value="barbell">barbell</option>
              <option value="dumbbell">dumbbell</option>
              <option value="machine">machine</option>
            </FormControl>
            <Button type="submit"> Add Exercise </Button>
          </FormGroup> 
        </Form>
      </Row>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchAddDBExercise: (exercise) => {
    dispatch(addDBExercise(exercise))
  },
}) 

export default connect(null, mapDispatchToProps)(AddExerciseToDB)