// REACT-REDUX
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router';

// SELECTORS 
import { 
  getWorkoutsObjectsArray, 
  getTemplatesObjectsArray, 
  getExercisesObjectsArray, 
  getProgramsObjectsArray 
} from '../../reducers/root'

// ACTION CREATORS
import { createTemplate } from '../../actions/templates'
import { createWorkoutFromTemplateMiddleware } from '../../actions/workouts'
import { createWeightDeloadFromTemplateMiddleware, createVolumeDeloadFromTemplateMiddleware } from '../../actions/deload'
import { getAllUserWorkoutsConditional } from '../../actions/userWorkouts'
import { getAllUserTemplatesConditional } from '../../actions/userTemplates'
import { getAllUserExercisesConditional } from '../../actions/userExercises'
import { getAllUserProgramsConditional } from '../../actions/userPrograms'
import { searchAllExercises } from '../../actions/allExercises'
import { createProgram, editProgram, useProgram, createExportFromProgramMiddleware } from '../../actions/program'

// APP COMPONENTS 
import UserDetails from '../../components/UserProfile/UserDetails'
import Templates from '../../components/UserProfile/Templates'
import Workouts from '../../components/UserProfile/Workouts'
import Programs from '../../components/UserProfile/Programs'

// Bootstrap Imports 
import { Grid, Row, Col, Button, Nav, NavItem, Badge, Tabs, Tab, Well, Panel, Jumbotron } from 'react-bootstrap';
import ProfileImg from '../../../assets/ProfileImg4.jpg' 

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
    getAllUserPrograms: PropTypes.func.isRequired,
  }

  state = {
    activeKey: 2
  }

  constructor(props) {
    super(props);
    const { userID, getAllUserWorkouts, getAllUserTemplates, getAllUserExercises, getAllUserPrograms } = this.props; 
    getAllUserWorkouts(userID); 
    getAllUserTemplates(userID);
    getAllUserExercises(userID);  
    getAllUserPrograms(userID); 
  }

  // WORKOUTS
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

  // TEMPLATES
  handleCreateTemplate = () => {
    const { userID, username, createTemplate } = this.props; 
    createTemplate(userID, username);

    // Prevent 'SecurityError' message from Jest 
    if (process.env.NODE_ENV !== 'test') {
      browserHistory.push(`/Template/${username}`);
    }
  }

  // PROGRAMS
  handleCreateProgram = () => {
    const { userID, username, createProgram } = this.props; 
    createProgram(userID);

    // Prevent 'SecurityError' message from Jest 
    if (process.env.NODE_ENV !== 'test') {
      browserHistory.push(`/Program`);
    }
  }

  handleEditProgram = (program) => {
    const { userID, username, editProgram } = this.props; 
    const { programID, programName } = program; 
    let programTemplates = {
      Day1: null,
      Day2: null,
      Day3: null,
      Day4: null,
      Day5: null,
      Day6: null,
      Day7: null
    }
    if (program.programTemplates) {
      programTemplates = program.programTemplates
    } 
    editProgram(userID, programID, programName, programTemplates);

    // Prevent 'SecurityError' message from Jest 
    if (process.env.NODE_ENV !== 'test') {
      browserHistory.push(`/Program/${programID}`);
    }
  }

  handleGenerateWorkouts = (program, deload) => {
    console.log('Generating workouts')
    const { createExportFromProgramMiddleware } = this.props; 
    const { userID, programID, programName, programTemplates } = program; 
    createExportFromProgramMiddleware(userID, programID, programName, programTemplates, deload);

    if (process.env.NODE_ENV !== 'test') {
      browserHistory.push(`/Export/${programID}`);
    }
  }

  // NAVIGATION
  handleTabSelect = (eventKey) => {
    this.setState({activeKey: eventKey}); 
  }

  // INTERNAL RENDERING 
  _renderNavigationBar = () => {
    const { activeKey } = this.state; 
    return (
      <Nav activeKey={this.state.activeKey} justified onSelect={this.handleTabSelect} className='profileNav'>
        <NavItem eventKey={1} title="Workouts">WORKOUTS</NavItem>
        <NavItem eventKey={2} title="Templates">TEMPLATES</NavItem>
        <NavItem eventKey={3} title="Plans">PROGRAMS</NavItem>
        <NavItem eventKey={4} title="Achievements" disabled>ACHIEVEMENTS <Badge>{Math.floor(Math.random() * 100)}</Badge></NavItem>
      </Nav>
    )
  }

  _renderActiveComponent(){
    const { templates, workouts, programs } = this.props; 
    const { activeKey } = this.state; 
    if (activeKey === 1) {
      return (
        <Workouts 
          workouts={workouts}
        />
      )
    } else if (activeKey === 2) {
      return (
        <Templates 
          onClick={()=>{this.handleCreateTemplate()}}
          createWorkout={this.handleCreateWorkout}
          createVolumeDeload={this.handleCreateVolumeDeload}
          createWeightDeload={this.handleCreateWeightDeload}
          templates={templates}
        />
      )
    } else if (activeKey === 3) {
      return (
        <Programs 
          programs={programs}
          editProgram={this.handleEditProgram}
          genWorkouts={this.handleGenerateWorkouts} 
        />
      )
    } 
  }

  render() {
    const { username, workouts, templates, programs } = this.props; 

    return (
      <Grid fluid={true} style={{backgroundImage: 'url(' + ProfileImg + ')'}} className='profileBackground'> 
        <Grid className='profileGrid'>
        <Row>
          <Col className='profileHeader' xs={10} md={10} xsOffset={1} mdOffset={1}>
            <h1> PROFILE </h1>
          </Col>
        </Row>
        <Row> 
        <Col xs={4} md={4} className='profileDetails'>
          <UserDetails 
            username={username}
            workouts={workouts.length}
            templates={templates.length}
            programs={programs.length}
          />
        </Col> 
          <Col xs={8} md={8}>
            {this._renderNavigationBar()}
            {this._renderActiveComponent()}
          </Col>
        </Row> 
        </Grid>
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
    programs: getProgramsObjectsArray(state)
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
    getAllUserPrograms: (id) => {
      dispatch(getAllUserProgramsConditional(id))
    }, 
    searchAllExercises: (exerciseName) => {
      dispatch(searchAllExercises(exerciseName))
    }, 
    createProgram: (userID) => {
      dispatch(createProgram(userID))
    }, 
    editProgram: (userID, programID, programName, templates) => {
      dispatch(editProgram(userID, programID, programName, templates))
    }, 
    useProgram: (userID, programID, programName, templates) => {
      dispatch(useProgram(userID, programID, programName, templates))
    }, 
    createExportFromProgramMiddleware: (userID, programID, programName, templates, deload) => {
      dispatch(createExportFromProgramMiddleware(userID, programID, programName, templates, deload))
    }, 
  }) 

  export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)