// REACT-REDUX
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

// ACTION CREATORS 
import { putNewExercise } from '../../actions/allExercises'

// BOOTSTRAP
import { Row, Panel, Button, Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

export class AddExerciseToDB extends React.Component {
  static propTypes = {
    exercise: PropTypes.string.isRequired,
    putNewExercise: PropTypes.func.isRequired,
  }

  state = {
    exercise: this.props.exercise || '',
    exerciseType: ''
  }

  handlePutNewExercise = (e) => {
    e.preventDefault() 
    const { putNewExercise } = this.props; 
    let { exercise, exerciseType } = this.state;
    if (!exercise) {
      return;
    }
    if (exerciseType && exerciseType !== 'select') {
      exercise = `${exercise} [${exerciseType}]`;
    }
    putNewExercise(exercise);
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
        <Form onSubmit={e => this.handlePutNewExercise(e)}>
          <FormGroup>
            <ControlLabel>Exercise Name</ControlLabel>
            <FormControl id="exercise" type="text" onChange={(e) => {this.handleChange(e)}} value={this.state.exercise}/>
            <ControlLabel>Exercise Type</ControlLabel>
            <FormControl id="exerciseType" componentClass="select" onChange={(e) => {this.handleChange(e)}} placeholder="select">
              <option value="select">select</option>
              <option value="barbell">barbell</option>
              <option value="dumbbell">dumbbell</option>
              <option value="machine">machine</option>
              <option value="smith machine">smith machine</option>
            </FormControl>
            <Button type="submit"> Add Exercise </Button>
          </FormGroup> 
        </Form>
      </Row>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  putNewExercise: (exercise) => {
    dispatch(putNewExercise(exercise))
  },
}) 

export default connect(null, mapDispatchToProps)(AddExerciseToDB)