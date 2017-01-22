// REACT-REDUX
import React, { PropTypes } from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'

// SELECTORS 
import { getUserExercisesInWorkout } from '../../reducers/root'

// ACTION CREATORS 
import { saveTemplate } from '../../actions/templates' 
import { trackWorkout } from '../../actions/workouts'

// APP COMPONENTS 
import ExerciseList from '../../components/Workout/ExerciseList'

// BOOTSTRAP
import { Grid, Row, Col, Button } from 'react-bootstrap'

// UTILITIES
import { convertExercisesArrayToCSV } from '../../utils/export'

export class Workout extends React.Component {
  static propTypes = {
    username: PropTypes.string.isRequired, 
    exercises: PropTypes.array.isRequired, 
    userExercises: PropTypes.array.isRequired, 
    workout: PropTypes.object.isRequired, 
    dispatchSaveTemplate: PropTypes.func.isRequired,
    dispatchTrackWorkout: PropTypes.func.isRequired
  }

  handleSaveWorkout = (e) => {
    e.preventDefault();
    const { workout, userExercises, dispatchTrackWorkout } = this.props; 
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