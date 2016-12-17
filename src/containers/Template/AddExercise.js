import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { addExercise } from '../../actions/templates'
import { searchForExercise } from '../../actions/dbExercises'
import { getExerciseSearchList } from '../../reducers/root'

import ExerciseSearchList from '../../components/Template/ExerciseSearchList'
import AddExerciseToDB from './AddExerciseToDB'

import { Row, Form, FormControl, ControlLabel } from 'react-bootstrap'

export class AddExercise extends React.Component {
  static propTypes = {
    dispatchAddExercise: PropTypes.func.isRequired, 
    dispatchSearchForExercise: PropTypes.func.isRequired, 
  }

  state = {
    exercise: '',
    search: false, 
  }

  handleChange = (e) => {
    this.setState({
      [`${e.target.id}`]: e.target.value,
    }); 
  }

  handleSearch = (e) => {
    e.preventDefault(); 
    const { exercise } = this.state; 
    const { dispatchSearchForExercise } = this.props; 
    dispatchSearchForExercise(exercise); 
    this.setState({search: true})
  }

  handleAddExercise = (id, exercise) => {
    const { dispatchAddExercise } = this.props; 
    if (!exercise) {
      return; 
    }
    console.log(`id: ${id}, exercise: ${exercise}`); 
    dispatchAddExercise(id, exercise);
    this.setState({exercise: ''}); 
  }

  _renderExerciseSearchList() {
    const { exercise } = this.state;  
    const { exerciseSearchList, renderSearchList } = this.props;
    if (renderSearchList && exerciseSearchList.length === 0) {
      return (
        <AddExerciseToDB exercise={exercise}/> 
      )
    } 
    else if (renderSearchList) {
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

const mapStateToProps = (state) => ({
  exerciseSearchList: getExerciseSearchList(state),
  renderSearchList: state.dbExercises.render
})

const mapDispatchToProps = (dispatch) => ({
  dispatchAddExercise: (id, exercise) => {
    dispatch(addExercise(id, exercise))
  },
  dispatchSearchForExercise: (exercise) => {
    dispatch(searchForExercise(exercise)); 
  },
}) 

export default connect(mapStateToProps, mapDispatchToProps)(AddExercise)


