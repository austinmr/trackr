// React-Redux Requirements 
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router';
import { createTemplate } from '../actions/templates'
import { fetchUserExercisesIfNeeded } from '../actions/userExercises'
import { createWorkoutFromTemplateMiddleware, fetchAllUserWorkouts } from '../actions/workouts'
import { getTemplatesObjectArray } from '../reducers/root'

// App Components 
import TemplateEntry from '../components/TemplateEntry'

// Bootstrap Imports 
import { Grid, Row, Col, Button, Nav, NavItem, Badge } from 'react-bootstrap';

export class UserProfile extends React.Component {
  static propTypes = {
    username: PropTypes.string.isRequired, 
    dispatchCreateTemplate: PropTypes.func.isRequired, 
  }

  state = {
    activeKey: 2
  }

  constructor(props) {
    super(props);
    const { userID, dispatchFetchUserExercises, dispatchFetchAllUserWorkouts } = this.props; 
    dispatchFetchUserExercises(userID); 
    dispatchFetchAllUserWorkouts(userID); 
  }

  handleCreateTemplate = (username) => {
    this.props.dispatchCreateTemplate(username);

    // Prevent 'SecurityError' message from Jest 
    if (process.env.NODE_ENV !== 'test') {
      browserHistory.push(`/Template/${username}`);
    }
  }

  handleCreateWorkout = (template) => {
    const { userID, username, dispatchCreateWorkout } = this.props; 
    const exercises = template.exercises.map((exercise) => exercise.id);
    dispatchCreateWorkout(userID, username, template, exercises);

    // Prevent 'SecurityError' message from Jest 
    if (process.env.NODE_ENV !== 'test') {
      browserHistory.push(`/Workout/${username}`);
    }
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
    const { username } = this.props; 

    return (
      <Grid> 
        <Row> 
          <Col xs={4} md={4}>
            <h3 style={{color: 'gray'}}> {username} </h3>
            <img src={'https://image.freepik.com/free-vector/crossfit-logo_23-2147494935.jpg'} alt="user profile" width={250} height={250} style={{borderRadius: 10, marginTop: 15}} />
            <h2> Click Here to Start A New Workout! </h2> 
            <Button className="workout-button" bsSize="large" onClick={(e)=>{this.handleCreateTemplate(username)}}> New Workout </Button> 
            <Button className="template-button" bsSize="large" onClick={(e)=>{this.handleCreateTemplate(username)}}> New Workout Template </Button> 
          </Col> 
          <Col xs={8} md={8}>
            {this._renderNavigationBar()}
            {this._renderActiveComponent()}
          </Col>
        </Row> 
      </Grid> 
    )
  }
}

const mapStateToProps = (state, { params }) => ({
  userID: state.user.id, 
  username: state.user.username,
  workouts: state.user.workouts,
  templates: getTemplatesObjectArray(state, params.username),
  userExercises: state.userExercises.exercises
})

const mapDispatchToProps = (dispatch) => ({
  dispatchCreateTemplate: (username) => {
    dispatch(createTemplate(username))
  },
  dispatchCreateWorkout: (userID, username, template, userExercises) => {
    dispatch(createWorkoutFromTemplateMiddleware(userID, username, template, userExercises))
  },
  dispatchFetchUserExercises: (id) => {
    dispatch(fetchUserExercisesIfNeeded(id))
  },
  dispatchFetchAllUserWorkouts: (id) => {
    dispatch(fetchAllUserWorkouts(id))
  }
}) 

const UserProfileContainer = connect(mapStateToProps, mapDispatchToProps)(UserProfile)

export default UserProfileContainer 
