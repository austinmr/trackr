// React-Redux Requirements 
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router';
import { calculatePerformancePercentage, totalWorkoutSets, totalWorkoutWeight, topExercise } from '../utils/calculators'

// Bootstrap Imports 
import { Grid, Row, Col, Well, Button, Nav, NavItem, Badge, ProgressBar } from 'react-bootstrap';

export class Results extends React.Component {
  static propTypes = {
    workout: PropTypes.object.isRequired,
    userExercises: PropTypes.object.isRequired, 
  }

  state = {
    activeKey: 2
  }

  handleTabSelect(eventKey) {
    this.setState({activeKey: eventKey}); 
  }

  _renderNavigationBar(){
    return (
      <Nav bsStyle="tabs" justified onSelect={this.handleTabSelect.bind(this)} style={{marginTop: 20}}>
        <NavItem eventKey={1} title="Workouts" disabled>Workouts</NavItem>
        <NavItem eventKey={2} title="Templates">Templates</NavItem>
        <NavItem eventKey={3} title="Following" disabled>Friends</NavItem>
        <NavItem eventKey={4} title="Achievements" disabled>Achievements <Badge>{Math.floor(Math.random() * 100)}</Badge></NavItem>
      </Nav>
    )
  }

  _renderActiveComponent(){
    const { templates } = this.props; 
    if (this.state.activeKey === 1) {
      // return (
      //   // workouts.map((workout, i) => (
      //   //   <WorkoutEntry key={workout.id} workout={workout} onClick={() => {viewWorkout(workout)}} />
      //   // ))
      // )
    } else if (this.state.activeKey === 2) {
      return (
        templates.map((template, i) => (
          <TemplateEntry key={template.id} onClick={()=>{this.handleCreateWorkout(template)}} {...template}/>
        ))
      )
    }
  }

  render() {
    const { workout, userExercises } = this.props; 

    return (
      <Grid style={{'color': 'white'}}> 
        <Row> 
          <Col xs={4} md={4}>
            <h3 style={{color: 'gray'}}> {workout.username} </h3>
            <img src={'https://image.freepik.com/free-vector/crossfit-logo_23-2147494935.jpg'} alt="user profile" width={250} height={250} style={{borderRadius: 10, marginTop: 15}} />
          </Col> 
          <Col xs={8} md={8}>
            <Well style={{'background':'black'}}> 
              <h1> {`Workout Performance:`} </h1> 
              <h3> {`EXERCISES: ${workout.exercises.length}`} </h3> 
              <h3> {`TOTAL SETS: ${totalWorkoutSets(workout.exercises)}`} </h3> 
              <ProgressBar now={calculatePerformancePercentage(workout.exercises)} label={calculatePerformancePercentage(workout.exercises)} />
              <h3> {`${totalWorkoutWeight(workout.exercises)} LBS MOVED`} </h3> 
              <h3> {`BEST LIFT: ${topExercise(workout.exercises).exercise}`} </h3> 
              <h3> {`PERSONAL RECORDS: ${totalWorkoutSets(workout.exercises)}`} </h3> 
            </Well> 
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


const ResultsContainer = connect(mapStateToProps, null)(Results)

export default ResultsContainer 

            // <h2> Click Here to Start A New Workout! </h2> 
            // <Button className="workout-button" bsSize="large" onClick={(e)=>{this.handleCreateTemplate(username)}}> New Workout </Button> 
            // <Button className="template-button" bsSize="large" onClick={(e)=>{this.handleCreateTemplate(username)}}> New Workout Template </Button> 
