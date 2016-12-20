import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { addUserExerciseToDB } from '../../actions/userExercises' 
import { getUserExercise } from '../../reducers/root'

import OneRepMaxModal from '../../components/Template/OneRepMaxModal'

import { Row } from 'react-bootstrap';

export class UserExerciseData extends React.Component {
  static propTypes = {
    userID: PropTypes.string.isRequired,
    dispatchAddUserExercise: PropTypes.func.isRequired,
  }

  state = {
    showModal: true
  }

  handleChange = (e) => {
    this.setState({
      [`${e.target.id}`]: e.target.value,
    }); 
  }

  handleAddUserExercise = (max) => {
    const { userID, exerciseID, exerciseName, dispatchAddUserExercise } = this.props; 
    dispatchAddUserExercise(userID, exerciseID, exerciseName, max); 
    this.setState({showModal: false})
  }

  _renderOneRepMaxCalculator() {
    const { userExercise, exerciseName } = this.props; 
    const { showModal } = this.state; 
    if (userExercise === null) {
      return (
        <OneRepMaxModal 
          showModal={showModal}
          exerciseName={exerciseName}
          handleAddUserExercise={this.handleAddUserExercise}
        />
      )
    } else {
      return (
        <div>
          <h1> {`${exerciseName}`} </h1>
          <h3> {`${userExercise.OneRepMax} lbs`} </h3>
        </div>
      )
    }
  }

  render() {
    return (
      <Row>
        {this._renderOneRepMaxCalculator()}
      </Row>
    )
  }
}

const mapStateToProps = (state, { exerciseID }) => ({
  userID: state.user.id,
  userExercise: getUserExercise(state, exerciseID)
})

const mapDispatchToProps = (dispatch) => ({
  dispatchAddUserExercise: (userID, exerciseID, exerciseName, max) => {
    dispatch(addUserExerciseToDB(userID, exerciseID, exerciseName, max))
  },
}) 

export default connect(mapStateToProps, mapDispatchToProps)(UserExerciseData)

