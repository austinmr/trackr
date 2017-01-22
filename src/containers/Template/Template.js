import React, { PropTypes } from 'react';
import { connect } from 'react-redux'
import { browserHistory } from 'react-router';
import { putNewUserTemplate } from '../../actions/userTemplates' 


// PROGRAM REFACTOR
// import { putBlankUserPlan } from '../../actions/userWeeklyPlans' 
import { putBlankUserProgram } from '../../actions/userPrograms' 

// import { getPlansObjectsArray } from '../../reducers/root'
import { getProgramsObjectsArray } from '../../reducers/root'


import AddExercise from './AddExercise'
import ExerciseList from '../../components/Template/ExerciseList'
import TemplateNameModal from '../../components/Template/TemplateNameModal'

import { Grid, Row, Col, Button } from 'react-bootstrap';

export class Template extends React.Component {
  static propTypes = {
    userID: PropTypes.string.isRequired, 
    username: PropTypes.string.isRequired, 
    template: PropTypes.object.isRequired,
    templateID: PropTypes.string.isRequired, 
    exercises: PropTypes.array.isRequired, 
    putNewUserTemplate: PropTypes.func.isRequired,
  }

  state = {
    showTemplateNameModal: false,
  }

  handleSaveTemplate = () => {
    console.log('Saving template!'); 
    this.setState({showTemplateNameModal: true}); 
  }

  dispatchSaveTemplate = (templateName, templateType, templatePlanName, templatePlanID) => {
    const { userID, username, template, templateID, putNewUserTemplate } = this.props; 
    if (!templateID || !userID) {
      return; 
    }
    let blankSets = false; 
    template.exercises.map((exercise) => {
      if (exercise.sets.length === 0) {
        blankSets = true; 
      }
    }); 
    if (blankSets) {
      return; 
    }

    
    putNewUserTemplate(userID, templateID, templateName, template, templateType, templatePlanName, templatePlanID)
    this.setState({showTemplateNameModal: false}); 
    if (process.env.NODE_ENV !== 'test') {
      browserHistory.push(`/User/${username}`);
    }
  }

  dispatchBlankUserProgram = (programName) => {
    const { userID, putBlankUserProgram } = this.props; 
    if (!userID || !programName) {
      return; 
    } 
    putBlankUserProgram(userID, programName); 
  }

  _renderTemplateNameModal() {
    const { showTemplateNameModal } = this.state; 
    if (showTemplateNameModal) {
      return (
          <TemplateNameModal 
            showTemplateNameModal={showTemplateNameModal}
            userPrograms={this.props.userPrograms}
            dispatchSaveTemplate={this.dispatchSaveTemplate}
            dispatchBlankUserProgram={this.dispatchBlankUserProgram}
          />
        )
    }
  }

  render() {
    return (
      <Grid>
        <Row>   
          <h2>New Trackr Workout</h2>
          {this._renderTemplateNameModal()}
        </Row> 
        <Row>
        <Col xs={4} md={4}> 
          <AddExercise style={{marginTop: 10}}/>
          <Button className="saveTemplate" onClick={this.handleSaveTemplate} style={{margin: 10}}> Save Template </Button> 
        </Col>
        <Col xs={8} md={8}>
          <ExerciseList exercises={this.props.exercises}/>
        </Col>
        </Row>
      </Grid>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  userID: state.user.id,
  username: state.user.username,
  template: state.template,
  templateID: state.template.id, 
  exercises: state.template.exercises,
  userPrograms: getProgramsObjectsArray(state)
})

const mapDispatchToProps = (dispatch) => ({
  putNewUserTemplate: (userID, templateID, templateName, template, templateType, templatePlanName, templatePlanID) => {
    dispatch(putNewUserTemplate(userID, templateID, templateName, template, templateType, templatePlanName, templatePlanID))
  },
  putBlankUserProgram: (userID, programName) => {
    dispatch(putBlankUserProgram(userID, programName))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Template)


