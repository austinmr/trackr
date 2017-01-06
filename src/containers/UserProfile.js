// React-Redux Requirements 
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router';
import { getWorkoutsObjectsArray, getTemplatesObjectsArray, getExercisesObjectsArray, getPlansObjectsArray } from '../reducers/root'
import { createTemplate } from '../actions/templates'
import { createWorkoutFromTemplateMiddleware } from '../actions/workouts'
import { createWeightDeloadFromTemplateMiddleware, createVolumeDeloadFromTemplateMiddleware } from '../actions/deload'

import { getAllUserWorkoutsConditional } from '../actions/userWorkouts'
import { getAllUserTemplatesConditional } from '../actions/userTemplates'
import { getAllUserExercisesConditional } from '../actions/userExercises2'
import { getAllUserPlansConditional } from '../actions/userWeeklyPlans'
import { searchAllExercises } from '../actions/allExercises'
import { createWeeklyPlan, editWeeklyPlan, useWeeklyPlan, createExportFromPlanMiddleware } from '../actions/weeklyPlan'

// App Components 
import TemplateEntry from '../components/UserProfile/TemplateEntry'
import WorkoutEntry from '../components/UserProfile/WorkoutEntry'
import PlanEntry from '../components/UserProfile/PlanEntry'

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

  handleCreateVolumeDeload = (template) => {
    const { userID, username, createVolumeDeload } = this.props; 
    const exercises = template.exercises.map((exercise) => exercise.id);
    console.log(exercises); 
    createVolumeDeload(userID, username, template, exercises);

    // Prevent 'SecurityError' message from Jest 
    if (process.env.NODE_ENV !== 'test') {
      browserHistory.push(`/Workout/${username}`);
    }
  }

  handleCreateWeightDeload = (template) => {
    const { userID, username, createWeightDeload } = this.props; 
    const exercises = template.exercises.map((exercise) => exercise.id);
    console.log(exercises); 
    createWeightDeload(userID, username, template, exercises);

    // Prevent 'SecurityError' message from Jest 
    if (process.env.NODE_ENV !== 'test') {
      browserHistory.push(`/Workout/${username}`);
    }
  }

  handleCreateWeeklyPlan = () => {
    const { userID, username, createWeeklyPlan } = this.props; 
    createWeeklyPlan(userID);

    // Prevent 'SecurityError' message from Jest 
    if (process.env.NODE_ENV !== 'test') {
      browserHistory.push(`/Planner`);
    }
  }

  handleEditWeeklyPlan = (plan) => {
    const { userID, username, editWeeklyPlan } = this.props; 
    const { weeklyPlanID, weeklyPlanName } = plan; 
    let planTemplates = {
      Day1: null,
      Day2: null,
      Day3: null,
      Day4: null,
      Day5: null,
      Day6: null,
      Day7: null
    }
    if (plan.planTemplates) {
      planTemplates = plan.planTemplates
    } 
    editWeeklyPlan(userID, weeklyPlanID, weeklyPlanName, planTemplates);

    // Prevent 'SecurityError' message from Jest 
    if (process.env.NODE_ENV !== 'test') {
      browserHistory.push(`/Planner/${weeklyPlanID}`);
    }
  }

  handleGenerateWorkouts = (plan, deload) => {
    console.log('Generating workouts')
    const { createExportFromPlanMiddleware } = this.props; 
    const { userID, weeklyPlanID, weeklyPlanName, planTemplates } = plan; 
    createExportFromPlanMiddleware(userID, weeklyPlanID, weeklyPlanName, planTemplates, deload);

    if (process.env.NODE_ENV !== 'test') {
      browserHistory.push(`/Export/${weeklyPlanID}`);
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
        <NavItem eventKey={3} title="Plans">Weekly Plans</NavItem>
        <NavItem eventKey={4} title="Achievements" disabled>Achievements <Badge>{Math.floor(Math.random() * 100)}</Badge></NavItem>
      </Nav>
    )
  }

  _renderActiveComponent(){
    const { templates, workouts, plans } = this.props; 
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
            buttonText={'Start Workout'}
            createWorkout={()=>{this.handleCreateWorkout(template)}} 
            createVolumeDeload={()=>this.handleCreateVolumeDeload(template)}
            createWeightDeload={()=>this.handleCreateWeightDeload(template)}
            {...template}
          />
        ))
      )
    }
    else if (this.state.activeKey === 3) {
      return (
        plans.map((plan, i) => (
          <PlanEntry 
            key={i} 
            onClick={()=>{this.handleEditWeeklyPlan(plan)}}
            genWorkouts={()=>{this.handleGenerateWorkouts(plan, 'None')}} 
            genVolumeDeload={()=>{this.handleGenerateWorkouts(plan, 'Volume')}}
            genWeightDeload={()=>{this.handleGenerateWorkouts(plan, 'Weight')}}
            {...plan}
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
            <h4> New Workout </h4> 
            <Button className="template-button" bsSize="large" onClick={(e)=>{this.handleCreateTemplate()}}> New Workout Template </Button> 
            <h4> New Weekly Plan </h4> 
            <Button className="template-button" bsSize="large" onClick={(e)=>{this.handleCreateWeeklyPlan()}}> New Workout Plan </Button> 
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
  exercises: getExercisesObjectsArray(state),
  plans: getPlansObjectsArray(state)
})

const mapDispatchToProps = (dispatch) => ({
  createTemplate: (userID, username) => {
    dispatch(createTemplate(userID, username))
  },
  createWorkoutFromTemplate: (userID, username, template, userExercises) => {
    dispatch(createWorkoutFromTemplateMiddleware(userID, username, template, userExercises))
  },
  createVolumeDeload: (userID, username, template, userExercises) => {
    dispatch(createVolumeDeloadFromTemplateMiddleware(userID, username, template, userExercises))
  },
  createWeightDeload: (userID, username, template, userExercises) => {
    dispatch(createWeightDeloadFromTemplateMiddleware(userID, username, template, userExercises))
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
  }, 
  createWeeklyPlan: (userID) => {
    dispatch(createWeeklyPlan(userID))
  }, 
  editWeeklyPlan: (userID, planID, planName, templates) => {
    dispatch(editWeeklyPlan(userID, planID, planName, templates))
  }, 
  useWeeklyPlan: (userID, planID, planName, templates) => {
    dispatch(useWeeklyPlan(userID, planID, planName, templates))
  }, 
  createExportFromPlanMiddleware: (userID, planID, planName, templates, deload) => {
    dispatch(createExportFromPlanMiddleware(userID, planID, planName, templates, deload))
  }, 
}) 

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)
 