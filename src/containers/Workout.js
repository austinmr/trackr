import React, { PropTypes } from 'react';
import { connect } from 'react-redux'
import { saveTemplate } from '../actions/templates' 
import { trackWorkout } from '../actions/workouts'
import { browserHistory } from 'react-router';
import ExerciseList from '../components/Workout/ExerciseList'
import { getUserExercisesInWorkout } from '../reducers/root'

import { Grid, Row, Col, Button } from 'react-bootstrap';

export class Workout extends React.Component {
  static propTypes = {
    username: PropTypes.string.isRequired, 
    exercises: PropTypes.array.isRequired, 
    dispatchSaveTemplate: PropTypes.func.isRequired,
  }

  handleSaveWorkout(e) {
    e.preventDefault();
    const { workout, userExercises, dispatchTrackWorkout } = this.props; 
    dispatchTrackWorkout(workout, userExercises); 
    // if (process.env.NODE_ENV !== 'test') {
    //   browserHistory.push(`/User/${username}`);
    // }
  }

  render() {
    return (
      <Grid>
        <Row>   
          <h2>New Trackr Workout</h2>
        </Row> 
        <Col xs={4} md={4}> 
          <Button className="saveWorkout" onClick={(e) => this.handleSaveWorkout(e)} style={{margin: 10}}> Save Workout </Button> 
        </Col>
        <Col xs={8} md={8}>
          <ExerciseList exercises={this.props.exercises} userMaxes={this.props.userMaxes} />
        </Col>
      </Grid>
    );
  }
}

const mapStateToProps = (state, { params }) => ({
  username: state.user.username,
  exercises: state.workout.exercises,
  userMaxes: state.user.userMaxes,
  userExercises: getUserExercisesInWorkout(state), 
  workout: state.workout
})

const mapDispatchToProps = (dispatch) => ({
  dispatchSaveTemplate: (workout) => {
    dispatch(saveTemplate(workout))
  },
  dispatchTrackWorkout: (workout, userExercises) => {
    dispatch(trackWorkout(workout, userExercises))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Workout)


