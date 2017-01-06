// React-Redux Requirements 
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router';
import { convertExercisesArrayToCSV, exportPlan } from '../../utils/export'
import _ from 'underscore'; 

import { getTemplatesObjectsArray, getExercisesObjectsArray } from '../../reducers/root'


// Bootstrap Imports 
// import { Grid, Row, Col, Button, Panel, Well, Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

export class Export extends React.Component {
  static propTypes = {
    userID: PropTypes.string.isRequired, 
    // username: PropTypes.string.isRequired, 
    // templates: PropTypes.array.isRequired,
  }

  _renderDays = () => {
    const { plan } = this.props; 
    let planArray = ['Day1','Day2','Day3','Day4','Day5','Day6','Day7'].map((day) => {
      let dayObject = plan[day]; 
      if (dayObject === undefined) {
        dayObject = 'Rest Day'
      } else {
        dayObject = convertExercisesArrayToCSV(dayObject.exercises)
      }
      return dayObject; 
    }); 
    return (
      <div>
        {planArray.map((day, i) => (
          <p key={i}>{JSON.stringify(day)}</p>
        ))}
      </div>
    )
  }

  render() {
    const { plan } = this.props; 
    let csvContent = exportPlan(plan); 

    return (
      <div> 
        <h1> Export Page </h1>
        {this._renderDays()}
        <h3> CSV Export </h3>
        {JSON.stringify(csvContent)}
        <a href={encodeURI(csvContent)} download> DOWNLOAD </a>
      </div> 
    )
  }
}

const mapStateToProps = (state, { params }) => ({
  userID: state.user.id, 
  plan: state.weeklyPlan.exportObject
})

export default connect(mapStateToProps, null)(Export)