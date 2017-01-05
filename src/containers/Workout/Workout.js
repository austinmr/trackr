import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux'
import { saveTemplate } from '../../actions/templates' 
import { trackWorkout } from '../../actions/workouts'
import { getUserExercisesInWorkout } from '../../reducers/root'
import { convertExercisesArrayToCSV } from '../../utils/export'

import ExerciseList from '../../components/Workout/ExerciseList'

import { Grid, Row, Col, Button } from 'react-bootstrap';

export class Workout extends React.Component {
  static propTypes = {
    username: PropTypes.string.isRequired, 
    exercises: PropTypes.array.isRequired, 
    dispatchSaveTemplate: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    const val = "Hello, world!"; 

  }

  handleSaveWorkout(e) {
    e.preventDefault();
    const { workout, userExercises, dispatchTrackWorkout } = this.props; 
    console.log('USER EXERCISES FROM PROPS: ', userExercises); 
    dispatchTrackWorkout(workout, userExercises); 
    if (process.env.NODE_ENV !== 'test') {
      browserHistory.push(`/Results/${workout.id}`);
    }
  }

  render() {
    const { workout } = this.props; 
    const csvContent = convertExercisesArrayToCSV(workout.exercises); 
    return (
      <Grid>
        <Row>   
          <h2>New Trackr Workout</h2>
        </Row> 
        <Col xs={4} md={4}> 
          <Button className="saveWorkout" onClick={(e) => this.handleSaveWorkout(e)} style={{margin: 10}}> Save Workout </Button>
          <Button className="exportWorkout" onClick={this.handleExport} style={{margin: 10}}> Export Workout </Button> 
        </Col>
        <Col xs={8} md={8}>
          <ExerciseList exercises={this.props.exercises}/>
        </Col>
        <p>{JSON.stringify(this.props.userExercises)}</p>
        <a href={encodeURI(csvContent)} download> DOWNLOAD </a>
      </Grid>
    );
  }
}

const mapStateToProps = (state, { params }) => ({
  username: state.user.username,
  exercises: state.workout.exercises,
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


