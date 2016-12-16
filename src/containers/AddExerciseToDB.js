import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Row, Panel, Form, FormControl } from 'react-bootstrap';

export class AddExerciseToDB extends React.Component {
  static propTypes = {
    exerciseID: PropTypes.string.isRequired,
    dispatchAddSetReps: PropTypes.func.isRequired,
  }

  state = {
    exercise: this.props.completedReps || ''
  }

  handleAddSet = (e) => {
    e.preventDefault() 
    const { exerciseID, setID, dispatchAddSetReps } = this.props;
    let { reps } = this.state; 
    if (!reps) {
      return
    }
    console.log('exercise: ', reps)
    // dispatchAddSetReps(exerciseID, setID, reps);
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
        <Form onSubmit={e => this.handleAddSet(e)} onBlur={e => this.handleAddSet(e)}>
          <FormControl id="reps" type="text" onChange={(e) => {this.handleChange(e)}} value={this.state.exercise}/>
        </Form>
      </Row>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchAddSetReps: (exerciseID, setID, reps) => {
    dispatch(addSetReps(exerciseID, setID, reps))
  },
}) 

export default connect(null, mapDispatchToProps)(AddExerciseToDB)