// React-Redux Requirements 
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router';

import { getTemplatesObjectsArray, getExercisesObjectsArray } from '../../reducers/root'


// Bootstrap Imports 
// import { Grid, Row, Col, Button, Panel, Well, Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

export class Export extends React.Component {
  static propTypes = {
    userID: PropTypes.string.isRequired, 
    // username: PropTypes.string.isRequired, 
    // templates: PropTypes.array.isRequired,
  }
  render() {
    return (
      <div> 
        <h1> Export Page </h1>
      </div> 
    )
  }
}

const mapStateToProps = (state, { params }) => ({
  userID: state.user.id, 
  templates: getTemplatesObjectsArray(state),
  exercises: getExercisesObjectsArray(state),
})

const mapDispatchToProps = (dispatch) => ({
}) 

export default connect(mapStateToProps, mapDispatchToProps)(Export)