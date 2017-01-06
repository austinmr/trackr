import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { addExercise } from '../../actions/templates'
import { searchAllExercisesConditional } from '../../actions/allExercises'
import { getExerciseSearchResults } from '../../reducers/root'

import ExerciseSearchResults from '../../components/Template/ExerciseSearchList'
import AddExerciseToDB from './AddExerciseToDB'

import { Row, Form, FormControl, ControlLabel } from 'react-bootstrap'

export class AddExercise extends React.Component {
  static propTypes = {
    exerciseSearchResults: PropTypes.array.isRequired,
    displaySearchResults: PropTypes.bool.isRequired,
    addExerciseToTemplate: PropTypes.func.isRequired, 
    searchForExercises: PropTypes.func.isRequired, 
  }

  state = {
    exercise: '',
  }

  handleChange = (e) => {
    let exercise = e.target.value; 
    exercise = exercise.toLowerCase(); 

    this.setState({
      exercise: exercise,
    }); 
  }

  handleSearch = (e) => {
    e.preventDefault(); 
    const { exercise } = this.state; 
    const { searchForExercises } = this.props; 
    searchForExercises(exercise); 
  }

  handleAddExercise = (id, exercise) => {
    const { addExerciseToTemplate } = this.props; 
    if (!exercise) {
      return; 
    }
    console.log(`id: ${id}, exercise: ${exercise}`); 
    addExerciseToTemplate(id, exercise);
    this.setState({exercise: ''}); 
  }

  _renderExerciseSearchList() {
    const { exercise } = this.state;  
    const { exerciseSearchResults, displaySearchResults } = this.props;
    if (displaySearchResults && exerciseSearchResults.length === 0) {
      return (
        <AddExerciseToDB exercise={exercise}/> 
      )
    } 
    else if (displaySearchResults) {
      return (
        <ExerciseSearchResults exerciseSearchResults={exerciseSearchResults} onClick={this.handleAddExercise}/>
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

const mapStateToProps = (state) => ({
  exerciseSearchResults: getExerciseSearchResults(state),
  displaySearchResults: state.allExercises.displaySearch
})

const mapDispatchToProps = (dispatch) => ({
  addExerciseToTemplate: (id, exercise) => {
    dispatch(addExercise(id, exercise))
  },
  searchForExercises: (exercise) => {
    dispatch(searchAllExercisesConditional(exercise)); 
  },
}) 

export default connect(mapStateToProps, mapDispatchToProps)(AddExercise)


