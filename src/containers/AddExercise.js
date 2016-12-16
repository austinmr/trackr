import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { addExercise } from '../actions/templates'
import ExerciseSearchList from '../components/ExerciseSearchList'
import AddExerciseToDB from './AddExerciseToDB'
// import ExerciseEntry from '../components/ExerciseSearchEntry'

import { Well, Row, Form, FormControl, ControlLabel } from 'react-bootstrap'

// Dynamo
// const AWS = require('aws-sdk');
import 'aws-sdk/dist/aws-sdk';
import dynamoConfig from '../../dynamoConfig'
const AWS = window.AWS;
AWS.config.update(dynamoConfig);
AWS.config.setPromisesDependency(require('bluebird'));
const docClient = new AWS.DynamoDB.DocumentClient();

export class AddExercise extends React.Component {
  static propTypes = {
    dispatchAddExercise: PropTypes.func.isRequired, 
  }

  state = {
    exercise: '',
    exerciseSearchList: null
  }

  handleChange = (e) => {
    this.setState({
      [`${e.target.id}`]: e.target.value,
    }); 
  }

  handleSearch = (e) => {
    e.preventDefault(); 
    const searchTerm = this.state.exercise; 
    console.log(`searching for ${searchTerm}`); 
    const searchParams = {
        TableName: "Exercises",
        FilterExpression: "contains(exerciseName, :searchTerm)",
        ExpressionAttributeValues: {
            ":searchTerm": searchTerm
        }
    };
    docClient.scan(searchParams, (err, data) => {
      if (err) {
        console.log(JSON.stringify(err, null, 2));
      } else {
        console.log(data.Items)
        let exerciseSearchList = 'not found'; 
        if (data.Items.length > 0) {
          exerciseSearchList = data.Items
        }
        this.setState({
          exerciseSearchList: exerciseSearchList
        })
      }
    });
  }

  handleAddExercise = (id, exercise) => {
    // e.preventDefault()
    // let exercise = this.state.exercise; 
    if (!exercise) {
      return; 
    }
    console.log(`id: ${id}, exercise: ${exercise}`); 
    this.props.dispatchAddExercise(id, exercise);
    this.setState({exercise: ''}); 
  }

  _renderExerciseSearchList() {
    const { exerciseSearchList } = this.state; 
    if (exerciseSearchList === 'not found') {
      return (
        <AddExerciseToDB /> 
      )
    } 
    else if (exerciseSearchList !== undefined && exerciseSearchList !== null) {
      return (
        <ExerciseSearchList exerciseSearchList={exerciseSearchList} onClick={this.handleAddExercise}/>
      )
    }
  }

  render() {
    return (
      <Row>
        <Form className="AddExerciseForm" onSubmit={(e) => {this.handleSearch(e)}}>
          <ControlLabel style={{marginBottom: '10px', fontSize: '20px'}}>Enter New Exercise</ControlLabel>
          <FormControl type="text" id="exercise" placeholder='Exercise' onChange={e => this.handleChange(e)} value={this.state.exercise} style={{margin: '0 auto', width: '210px', textAlign: 'center', marginBottom: '5px'}}/>
        </Form>
        {this._renderExerciseSearchList()}
      </Row> 
    )
  }
}


const mapDispatchToProps = (dispatch) => ({
  dispatchAddExercise: (id, exercise) => {
    dispatch(addExercise(id, exercise))
  },
}) 

AddExercise = connect(null, mapDispatchToProps)(AddExercise)

export default AddExercise
