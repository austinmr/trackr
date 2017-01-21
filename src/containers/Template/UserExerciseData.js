import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { putNewUserExercise } from '../../actions/userExercises2' 
import { getUserExercise } from '../../reducers/root'

import OneRepMaxModal from '../../components/Template/OneRepMaxModal'

import { Row, Col } from 'react-bootstrap';

export class UserExerciseData extends React.Component {
  static propTypes = {
    userID: PropTypes.string.isRequired,
    exerciseID: PropTypes.string.isRequired,
    exerciseName: PropTypes.string.isRequired,
    putNewUserExercise: PropTypes.func.isRequired,
  }

  state = {
    showModal: true
  }

  handleChange = (e) => {
    this.setState({
      [`${e.target.id}`]: e.target.value,
    }); 
  }

  handleAddUserExercise = (max, targetOneRepMax) => {
    const { userID, exerciseID, exerciseName, putNewUserExercise } = this.props; 
    putNewUserExercise(userID, exerciseID, exerciseName, max, targetOneRepMax); 
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
          <h3> {`${userExercise.oneRepMax} lbs`} </h3>
        </div>
      )
    }
  }

  render() {
    return (
      <Row>
        <Col xs={12} md={12}>
          {this._renderOneRepMaxCalculator()}
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = (state, { exerciseID, exerciseName }) => ({
  userID: state.user.id,
  exerciseID: exerciseID, 
  exerciseName: exerciseName,
  userExercise: getUserExercise(state, exerciseID)
})

const mapDispatchToProps = (dispatch) => ({
  putNewUserExercise: (userID, exerciseID, exerciseName, max, target) => {
    dispatch(putNewUserExercise(userID, exerciseID, exerciseName, max, target))
  },
}) 

export default connect(mapStateToProps, mapDispatchToProps)(UserExerciseData)

