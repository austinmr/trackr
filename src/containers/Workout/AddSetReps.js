import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { addSetReps } from '../../actions/workouts' 
import { Form, FormControl } from 'react-bootstrap'

export class AddSet extends React.Component {
  static propTypes = {
    exerciseID: PropTypes.string.isRequired,
    dispatchAddSetReps: PropTypes.func.isRequired,
  }

  state = {
    reps: this.props.completedReps || ''
  }

  handleAddSet = (e) => {
    e.preventDefault() 
    const { exerciseID, setID, dispatchAddSetReps } = this.props;
    let { reps } = this.state; 

    if (!reps) {
      return;
    }
    dispatchAddSetReps(exerciseID, setID, reps);
  }

  handleChange = (e) => {
    this.setState({
      [`${e.target.id}`]: e.target.value,
    }); 
  }

  render() {
    return (
      <Form onSubmit={e => this.handleAddSet(e)} onBlur={e => this.handleAddSet(e)}>
        <FormControl id="reps" type="number" onChange={(e) => {this.handleChange(e)}} value={this.state.reps}/>
      </Form>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchAddSetReps: (exerciseID, setID, reps) => {
    dispatch(addSetReps(exerciseID, setID, reps))
  },
}) 

export default connect(null, mapDispatchToProps)(AddSet)
