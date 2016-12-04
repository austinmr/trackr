// React-Redux Requirements 
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router';
import { createTemplate } from '../actions/templates'

// App Components 
// import WorkoutEntry from '../components/WorkoutEntry'

// Bootstrap Imports 
import { Grid, Row, Col, Button, Nav, NavItem, Badge } from 'react-bootstrap';

export class UserProfile extends React.Component {
  static propTypes = {
    username: PropTypes.string.isRequired, 
    dispatchCreateTemplate: PropTypes.func.isRequired, 
  }

  handleCreateTemplate = (username) => {
    this.props.dispatchCreateTemplate(username);

    // Prevent 'SecurityError' message from Jest 
    if (process.env.NODE_ENV !== 'test') {
      browserHistory.push(`/Template/${username}`);
    }
  }

  // handleTabSelect(eventKey) {
  //   this.setState({activeKey: eventKey}); 
  // }

  // _renderNavigationBar(){
  //   return (
  //     <Nav bsStyle="tabs" justified onSelect={this.handleTabSelect.bind(this)} style={{marginTop: 20}}>
  //       <NavItem eventKey={1} title="Workouts">Workouts</NavItem>
  //       <NavItem eventKey={2} title="Templates">Templates</NavItem>
  //       <NavItem eventKey={3} title="Following" disabled>Friends</NavItem>
  //       <NavItem eventKey={4} title="Achievements" disabled>Achievements <Badge>{Math.floor(Math.random() * 100)}</Badge></NavItem>
  //     </Nav>
  //   )
  // }

  // _renderActiveComponent(){
  //   const { workouts, templates, viewWorkout } = this.props; 
  //   if (this.state.activeKey === 1) {
  //     return (
  //       workouts.map((workout, i) => (
  //         <WorkoutEntry key={workout.id} workout={workout} onClick={() => {viewWorkout(workout)}} />
  //       ))
  //     )
  //   } else if (this.state.activeKey === 2) {
  //     return (
  //       templates.map((template, i) => (
  //         <WorkoutEntry key={template.id} workout={template} onClick={() => {viewWorkout(template)}} />
  //       ))
  //     )
  //   }
  // }

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
          </Col>
        </Row> 
      </Grid> 
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  username: state.user.username,
  workouts: state.user.workouts,
  templates: state.user.templates,
})

const mapDispatchToProps = (dispatch) => ({
  dispatchCreateTemplate: (username) => {
    dispatch(createTemplate(username))
  },
}) 

const UserProfileContainer = connect(mapStateToProps, mapDispatchToProps)(UserProfile)

export default UserProfileContainer 

// {this._renderNavigationBar()}
// {this._renderActiveComponent()}