// React-Redux Requirements 
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router';
import { getTemplatesObjectsArray } from '../../reducers/root'
import { createWeeklyPlan, addTemplateToWeeklyPlan } from '../../actions/weeklyPlan'
import { putNewUserPlan } from '../../actions/userWeeklyPlans'
// import { createWorkoutFromTemplateMiddleware } from '../actions/workouts'
// import { getAllUserWorkoutsConditional } from '../actions/userWorkouts'
// import { getAllUserTemplatesConditional } from '../actions/userTemplates'
// import { getAllUserExercisesConditional } from '../actions/userExercises2'
// import { searchAllExercises } from '../actions/allExercises'

// App Components 
import TemplateEntry from '../../components/TemplateEntry'
// import WorkoutEntry from '../components/UserProfile/WorkoutEntry'

// Bootstrap Imports 
import { Grid, Row, Col, Button } from 'react-bootstrap';

export class WeeklyPlanner extends React.Component {
  static propTypes = {
    userID: PropTypes.string.isRequired, 
    username: PropTypes.string.isRequired, 
    templates: PropTypes.array.isRequired,
  }

  state = {
    activeDay: 'Day1', 
    availableDays: ['Day1','Day2','Day3','Day4','Day5','Day6','Day7'], 
    weeklyPlanName: 'Phase1'
  }

  handleCreateWeeklyPlan = () => {
    const { userID, createWeeklyPlan } = this.props; 
    createWeeklyPlan(userID);
  }

  handleAddTemplateToWeeklyPlan = (templateID) => {
    const { addTemplateToWeeklyPlan } = this.props;
    let { activeDay, availableDays } = this.state; 
    if (availableDays.indexOf(activeDay) === -1) {
      return; 
    }
    addTemplateToWeeklyPlan(templateID, activeDay)
  }

  handleActiveDaySelection = (e) => {
    e.preventDefault(); 
    console.log(e.target.id)
    this.setState({activeDay: e.target.id})
  }

  handleSaveWeeklyPlan = () => {
    const { userID, username, weeklyPlan, putNewUserPlan } = this.props; 
    const { weeklyPlanName } = this.state; 
    if (!userID || !weeklyPlan) {
      return; 
    }
    console.log('Saving a plan!')
    console.log(userID); 
    const { weeklyPlanID, templates } = weeklyPlan; 
    putNewUserPlan(userID, weeklyPlanID, weeklyPlanName, templates)

    if (process.env.NODE_ENV !== 'test') {
      browserHistory.push(`/User/${username}`);
    }
  }

  // handleCreateWorkout = (template) => {
  //   const { userID, username, createWorkoutFromTemplate } = this.props; 
  //   const exercises = template.exercises.map((exercise) => exercise.id);
  //   console.log(exercises); 
  //   createWorkoutFromTemplate(userID, username, template, exercises);

  //   // Prevent 'SecurityError' message from Jest 
  //   if (process.env.NODE_ENV !== 'test') {
  //     browserHistory.push(`/Workout/${username}`);
  //   }
  // }return

  // handleTabSelect = (eventKey) => {
  //   this.setState({activeKey: eventKey}); 
  // }

  render() {
    const { username, templates, weeklyPlan } = this.props; 
    let planArray = Object.keys(weeklyPlan.templates)
    console.log(planArray); 
    planArray = planArray.map((key) => { 
      return {
        [`${key}`]: weeklyPlan.templates[`${key}`]
      }
    })

    return (
      <Grid> 
        <h2> Plan New Week! </h2> 
        <Button className="template-button" bsSize="large" onClick={(e)=>{this.handleCreateWeeklyPlan()}}> New Week Plan </Button> 
        <Button className="template-button" bsSize="large" onClick={this.handleSaveWeeklyPlan}> Save Current Plan </Button> 
        <Row> 
          <Col xs={4} md={4}> 
            {planArray.map((day, i) => (
              <p key={i}> {JSON.stringify(day)} </p>
            ))}
          </Col> 
          <Col xs={8} md={8}>
            <Button id='Day1' onClick={(e)=>{this.handleActiveDaySelection(e)}}> Day 1 </Button>
            <Button id='Day2' onClick={(e)=>{this.handleActiveDaySelection(e)}}> Day 2 </Button>
            <Button id='Day3' onClick={(e)=>{this.handleActiveDaySelection(e)}}> Day 3 </Button>
            <Button id='Day4' onClick={(e)=>{this.handleActiveDaySelection(e)}}> Day 4 </Button>
            <Button id='Day5' onClick={(e)=>{this.handleActiveDaySelection(e)}}> Day 5 </Button>
            <Button id='Day6' onClick={(e)=>{this.handleActiveDaySelection(e)}}> Day 6 </Button>
            <Button id='Day7' onClick={(e)=>{this.handleActiveDaySelection(e)}}> Day 7 </Button>
          </Col> 
        </Row>
        <Row> 
          <Col xs={4} md={4}>
            <h3 style={{color: 'gray'}}> {username} </h3>
            <img src={'https://image.freepik.com/free-vector/crossfit-logo_23-2147494935.jpg'} alt="user profile" width={250} height={250} style={{borderRadius: 10, marginTop: 15}} />
            <h2> Click Here to Start A New Workout! </h2> 
          </Col> 
          <Col xs={8} md={8}>
          {templates.map((template, i) => (
            <TemplateEntry 
              key={template.templateID} 
              onClick={()=>{this.handleAddTemplateToWeeklyPlan(template.templateID)}} 
              buttonText={'Add Template to Plan'}
              {...template}
            />
          ))}
          </Col>
        </Row> 
      </Grid> 
    )
  }
}

const mapStateToProps = (state, { params }) => ({
  userID: state.user.id, 
  username: state.user.username,
  templates: getTemplatesObjectsArray(state),
  weeklyPlan: state.weeklyPlan
})

const mapDispatchToProps = (dispatch) => ({
  createWeeklyPlan: (userID) => {
    dispatch(createWeeklyPlan(userID))
  },
  addTemplateToWeeklyPlan: (templateID, day) => {
    dispatch(addTemplateToWeeklyPlan(templateID, day))
  },
  putNewUserPlan: (userID, weeklyPlanID, weeklyPlanName, planTemplates) => {
    dispatch(putNewUserPlan(userID, weeklyPlanID, weeklyPlanName, planTemplates))
  }
}) 

export default connect(mapStateToProps, mapDispatchToProps)(WeeklyPlanner)
 

// <h1>WORKOUTS</h1>
// <p>{JSON.stringify(workouts)}</p>
// <h1>TEMPLATES</h1>
// <p>{JSON.stringify(templates)}</p>
// <h1>EXERCISES</h1>
// <p>{JSON.stringify(exercises)}</p>
// <Button className="workout-button" bsSize="large" onClick={(e)=>{this.handleCreateWorkout()}}> New Workout </Button> 

