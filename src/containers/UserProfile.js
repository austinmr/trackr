// React-Redux Requirements 
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router';
import { getWorkoutsObjectsArray, getTemplatesObjectsArray, getExercisesObjectsArray } from '../reducers/root'
import { createTemplate } from '../actions/templates'
import { createWorkoutFromTemplateMiddleware } from '../actions/workouts'
import { getAllUserWorkoutsConditional } from '../actions/userWorkouts'
import { getAllUserTemplatesConditional } from '../actions/userTemplates'
import { getAllUserExercisesConditional } from '../actions/userExercises2'
import { getAllUserPlansConditional } from '../actions/userWeeklyPlans'
import { searchAllExercises } from '../actions/allExercises'

// App Components 
import TemplateEntry from '../components/TemplateEntry'
import WorkoutEntry from '../components/UserProfile/WorkoutEntry'

// Bootstrap Imports 
import { Grid, Row, Col, Button, Nav, NavItem, Badge } from 'react-bootstrap';

export class UserProfile extends React.Component {
  static propTypes = {
    userID: PropTypes.string.isRequired, 
    username: PropTypes.string.isRequired, 
    workouts: PropTypes.array.isRequired,
    templates: PropTypes.array.isRequired,
    exercises: PropTypes.array.isRequired,
    createTemplate: PropTypes.func.isRequired, 
    createWorkoutFromTemplate: PropTypes.func.isRequired, 
    getAllUserWorkouts: PropTypes.func.isRequired,
    getAllUserTemplates: PropTypes.func.isRequired,
    getAllUserExercises: PropTypes.func.isRequired,
    getAllUserPlans: PropTypes.func.isRequired,
  }

  state = {
    activeKey: 2
  }

  constructor(props) {
    super(props);
    const { userID, getAllUserWorkouts, getAllUserTemplates, getAllUserExercises, getAllUserPlans } = this.props; 
    getAllUserWorkouts(userID); 
    getAllUserTemplates(userID);
    getAllUserExercises(userID);  
    getAllUserPlans(userID); 
  }

  handleCreateTemplate = () => {
    const { userID, username, createTemplate } = this.props; 
    createTemplate(userID, username);

    // Prevent 'SecurityError' message from Jest 
    if (process.env.NODE_ENV !== 'test') {
      browserHistory.push(`/Template/${username}`);
    }
  }

  handleCreateWorkout = (template) => {
    const { userID, username, createWorkoutFromTemplate } = this.props; 
    const exercises = template.exercises.map((exercise) => exercise.id);
    console.log(exercises); 
    createWorkoutFromTemplate(userID, username, template, exercises);

    // Prevent 'SecurityError' message from Jest 
    if (process.env.NODE_ENV !== 'test') {
      browserHistory.push(`/Workout/${username}`);
    }
  }

  handleTabSelect = (eventKey) => {
    this.setState({activeKey: eventKey}); 
  }

  _renderNavigationBar(){
    return (
      <Nav bsStyle="tabs" justified onSelect={this.handleTabSelect} style={{marginTop: 20}}>
        <NavItem eventKey={1} title="Workouts">Workouts</NavItem>
        <NavItem eventKey={2} title="Templates">Templates</NavItem>
        <NavItem eventKey={3} title="Following" disabled>Friends</NavItem>
        <NavItem eventKey={4} title="Achievements" disabled>Achievements <Badge>{Math.floor(Math.random() * 100)}</Badge></NavItem>
      </Nav>
    )
  }

  _renderActiveComponent(){
    const { templates, workouts } = this.props; 
    if (this.state.activeKey === 1) {
      return (
        workouts.map((workout, i) => (
          <WorkoutEntry key={workout.workoutID} id={workout.workoutID} exercises={workout.exercises}/>
        ))
      )
    } else if (this.state.activeKey === 2) {
      return (
        templates.map((template, i) => (
          <TemplateEntry 
            key={template.templateID} 
            onClick={()=>{this.handleCreateWorkout(template)}} 
            {...template}
          />
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
            <Button className="template-button" bsSize="large" onClick={(e)=>{this.handleCreateTemplate()}}> New Workout Template </Button> 
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
  workouts: getWorkoutsObjectsArray(state),
  templates: getTemplatesObjectsArray(state),
  exercises: getExercisesObjectsArray(state)
})

const mapDispatchToProps = (dispatch) => ({
  createTemplate: (userID, username) => {
    dispatch(createTemplate(userID, username))
  },
  createWorkoutFromTemplate: (userID, username, template, userExercises) => {
    dispatch(createWorkoutFromTemplateMiddleware(userID, username, template, userExercises))
  },
  getAllUserWorkouts: (id) => {
    dispatch(getAllUserWorkoutsConditional(id))
  },
  getAllUserTemplates: (id) => {
    dispatch(getAllUserTemplatesConditional(id))
  },
  getAllUserExercises: (id) => {
    dispatch(getAllUserExercisesConditional(id))
  },
  getAllUserPlans: (id) => {
    dispatch(getAllUserPlansConditional(id))
  }, 
  searchAllExercises: (exerciseName) => {
    dispatch(searchAllExercises(exerciseName))
  }
}) 

const UserProfileContainer = connect(mapStateToProps, mapDispatchToProps)(UserProfile)

export default UserProfileContainer 

// <h1>WORKOUTS</h1>
// <p>{JSON.stringify(workouts)}</p>
// <h1>TEMPLATES</h1>
// <p>{JSON.stringify(templates)}</p>
// <h1>EXERCISES</h1>
// <p>{JSON.stringify(exercises)}</p>
// <Button className="workout-button" bsSize="large" onClick={(e)=>{this.handleCreateWorkout()}}> New Workout </Button> 

