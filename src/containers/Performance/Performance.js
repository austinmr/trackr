import React, { PropTypes } from 'react';
import { connect } from 'react-redux'
import { browserHistory } from 'react-router';
import { getWorkoutDataForExercise } from '../../actions/performance'
import { formatDynamoDate } from '../../utils/calculators'

import LineChart from '../../components/LineChart/LineChart'

import { Grid, Row, Col, Well, Panel, Form, FormControl, ControlLabel } from 'react-bootstrap';

export class Performance extends React.Component {
  static propTypes = {
    userID: PropTypes.string.isRequired, 
    username: PropTypes.string.isRequired, 
    userExercises: PropTypes.object.isRequired, 
  }

  state = {
    filter: '', 
  }

  handleChange = (e) => {
    this.setState({
      [`${e.target.id}`]: e.target.value,
    }); 
  }

  handleSelectExercise = (exerciseID, workoutLog) => { 
    console.log("SELECTING EXERCISE!"); 
    console.log('EXERCISEID:', exerciseID); 
    console.log("WORKOUTLOG: ", workoutLog); 
    if (!workoutLog) {
      return; 
    }
    const { getWorkoutDataForExercise } = this.props; 
    getWorkoutDataForExercise(exerciseID, workoutLog); 
  }

  _displayUserExercises = () => {
    const { filter } = this.state; 
    const { userExercises } = this.props; 
    const userExerciseKeys = Object.keys(userExercises); 
    const userExercisesArray = userExerciseKeys.map(key => userExercises[key])
    if (filter) {
      const filteredUserExercisesArray = userExercisesArray.filter((exercise) => {
        if (exercise.exerciseName.search(filter) !== -1) {
          return exercise; 
        }
      }); 
      return (
        <Well>
          {filteredUserExercisesArray.map((exercise) => {
            const { exerciseID, exerciseName, MRW, workoutLog } = exercise; 
            return (
              <Panel key={exerciseID} onClick={() => {this.handleSelectExercise(exerciseID, workoutLog)}}> 
                <p> {exerciseID} </p>
                <p> {exerciseName} </p>
              </Panel> 
            )
          })}
        </Well>
      )
    } else {
      return (
        <Well>
          {userExercisesArray.map((exercise) => {
            const { exerciseID, exerciseName, MRW, workoutLog } = exercise; 
            return (
              <Panel key={exerciseID} onClick={() => {this.handleSelectExercise(exerciseID, workoutLog)}}>  
                <p> {exerciseID} </p>
                <p> {exerciseName} </p>
              </Panel> 
            )
          })}
        </Well>
      )
    }
  }

  _displayLineChart = () => {
    const { performance } = this.props; 
    const { render, workoutData } = performance; 
    if (render) {
      let data = workoutData.map((workout) => {
        return {
          date: formatDynamoDate(workout.workoutDate), 
          oneRepMax: +workout.exerciseData.averageOneRepMax
        }
      }); 
      return (
        <LineChart data={data} />
      )
    }
  }


  render() {
    return (
      <Grid>
        <Row>   
          <h2>New Trackr Workout</h2>
        </Row> 
        <Row>
        <Col xs={4} md={4}> 
          <Form onSubmit={(e) => {this.handleSearch(e)}}>
            <ControlLabel style={{marginBottom: '10px', fontSize: '20px'}}>Search Exercises</ControlLabel>
            <FormControl type="text" id="filter" placeholder='Exercise' onChange={e => this.handleChange(e)} value={this.state.filter} style={{margin: '0 auto', width: '210px', textAlign: 'center', marginBottom: '5px'}}/>
          </Form>
          <h3> {this.state.filter} </h3>
          {this._displayUserExercises()}
        </Col>
        <Col xs={8} md={8}>
          {this._displayLineChart()}
        </Col>
        </Row>
      </Grid>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  userID: state.user.id,
  username: state.user.username,
  userExercises: state.entities.exercises,
  performance: state.performance
})

const mapDispatchToProps = (dispatch) => ({
  getWorkoutDataForExercise: (exerciseID, workoutLog) => {
    dispatch(getWorkoutDataForExercise(exerciseID, workoutLog))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Performance)


