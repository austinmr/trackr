import React, { PropTypes } from 'react';
import { connect } from 'react-redux'
import { browserHistory } from 'react-router';
import { putNewUserTemplate } from '../../actions/userTemplates' 
import { putBlankUserPlan } from '../../actions/userWeeklyPlans' 
import { getPlansObjectsArray } from '../../reducers/root'

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

  dispatchBlankUserPlan = (weeklyPlanName) => {
    const { userID, putBlankUserPlan } = this.props; 
    if (!userID || !weeklyPlanName) {
      return; 
    } 
    putBlankUserPlan(userID, weeklyPlanName); 
  }

  _renderTemplateNameModal() {
    const { showTemplateNameModal } = this.state; 
    if (showTemplateNameModal) {
      return (
          <TemplateNameModal 
            dispatchSaveTemplate={this.dispatchSaveTemplate}
            dispatchBlankUserPlan={this.dispatchBlankUserPlan}
            showTemplateNameModal={showTemplateNameModal}
            userPlans={this.props.userPlans}
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
  userPlans: getPlansObjectsArray(state)
})

const mapDispatchToProps = (dispatch) => ({
  putNewUserTemplate: (userID, templateID, templateName, template, templateType, templatePlanName, templatePlanID) => {
    dispatch(putNewUserTemplate(userID, templateID, templateName, template, templateType, templatePlanName, templatePlanID))
  },
  putBlankUserPlan: (userID, weeklyPlanName) => {
    dispatch(putBlankUserPlan(userID, weeklyPlanName))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Template)


