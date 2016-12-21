import React, { PropTypes } from 'react';
import { connect } from 'react-redux'
import { browserHistory } from 'react-router';
import { saveTemplate } from '../../actions/templates' 

import AddExercise from './AddExercise'
import ExerciseList from '../../components/Template/ExerciseList'

import { Grid, Row, Col, Button } from 'react-bootstrap';

export class Template extends React.Component {
  static propTypes = {
    userID: PropTypes.string.isRequired, 
    username: PropTypes.string.isRequired, 
    template: PropTypes.object.isRequired,
    exercises: PropTypes.array.isRequired, 
    dispatchSaveTemplate: PropTypes.func.isRequired,
  }

  handleSaveTemplate(e) {
    e.preventDefault();
    const { template, userID, username, dispatchSaveTemplate } = this.props; 

    dispatchSaveTemplate(template)
    if (process.env.NODE_ENV !== 'test') {
      browserHistory.push(`/User/${username}`);
    }
  }

  render() {
    return (
      <Grid>
        <Row>   
          <h2>New Trackr Workout</h2>
        </Row> 
        <Col xs={4} md={4}> 
          <AddExercise style={{marginTop: 10}}/>
          <Button className="saveTemplate" onClick={(e) => this.handleSaveTemplate(e)} style={{margin: 10}}> Save Template </Button> 
        </Col>
        <Col xs={8} md={8}>
          <ExerciseList exercises={this.props.exercises}/>
        </Col>
      </Grid>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  userID: state.user.id,
  username: state.user.username,
  template: state.template,
  exercises: state.template.exercises,
})

const mapDispatchToProps = (dispatch) => ({
  dispatchSaveTemplate: (id, template) => {
    dispatch(saveTemplate(id, template))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Template)


