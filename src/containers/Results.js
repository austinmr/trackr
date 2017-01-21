// React-Redux Requirements 
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router';
import { calculatePerformancePercentage, totalWorkoutSets, totalWorkoutWeight, topExercise } from '../utils/calculators'

import ExerciseListExpand from './Performance/ExerciseListExpand'
import SingleExerciseGraph from '../components/BarGraph/GraphComponent'
// import SingleExerciseGraph from '../components/Graph/LineChart'

import ResultsImg from '../../assets/ResultsCropped.png' 

// Bootstrap Imports 
import { Grid, Row, Col, Well, Button, Nav, NavItem, Badge, ProgressBar, Image, Jumbotron } from 'react-bootstrap';

export class Results extends React.Component {
  static propTypes = {
    workout: PropTypes.object.isRequired,
    userExercises: PropTypes.object.isRequired, 
  }

  state = {
    selectedExercise: null, 
  }

  handleSelectExercise = (exercise) => {
    this.setState({selectedExercise: exercise}); 
  }

  _renderSingleExerciseGraph = () => {
    const { selectedExercise } = this.state; 
    if (selectedExercise !== null) {
      return (
        <SingleExerciseGraph {...selectedExercise} />
      )
    }
  }

  render() {
    const { workout, userExercises } = this.props; 
    const { selectedExercise } = this.state; 

    return (
      <Grid fluid={true} style={{padding: 0}}>
        <Jumbotron style={{backgroundImage: 'url(' + ResultsImg + ')', backgroundSize: 'cover', borderRadius: 0}}>
          <Row> 
            <Col xs={4} md={4}>
              <h3 style={{color: 'gray'}}> {workout.username} </h3>
              <img src={'https://image.freepik.com/free-vector/crossfit-logo_23-2147494935.jpg'} alt="user profile" width={250} height={250} style={{borderRadius: 10, marginTop: 15}} />
            </Col> 
            <Col xs={8} md={8}>
              <Well style={{background:'rgba(0, 0, 0, 0.5)', color: 'white'}}> 
                <h1> {`Workout Performance:`} </h1> 
                <h3> {`EXERCISES: ${workout.exercises.length}`} </h3> 
                <h3> {`TOTAL SETS: ${totalWorkoutSets(workout.exercises)}`} </h3> 
                <ProgressBar now={calculatePerformancePercentage(workout.exercises)} label={`${calculatePerformancePercentage(workout.exercises)} %`}/>
                <h3> {`${totalWorkoutWeight(workout.exercises)} LBS MOVED`} </h3> 
                <h3> {`BEST LIFT: ${topExercise(workout.exercises).exercise}`} </h3> 
                <h3> {`PERSONAL RECORDS: ${userExercises.newRecords.length}`} </h3> 
              </Well> 
            </Col>
          </Row>
        </Jumbotron>
        <Row>
        <Col xs={4} md={4}>
          <ExerciseListExpand exercises={workout.exercises} selectExercise={this.handleSelectExercise}/>
        </Col>
        <Col xs={8} md={8}>
          {this._renderSingleExerciseGraph()}
        </Col> 
        </Row>
      </Grid> 
    )
  }
}

const mapStateToProps = (state, { params }) => ({
  workout: state.results.workout,
  userExercises: state.results.userExercises
})


export default connect(mapStateToProps, null)(Results)
