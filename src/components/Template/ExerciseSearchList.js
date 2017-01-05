import React, { PropTypes } from 'react'
import ExerciseEntry from './ExerciseSearchEntry'
import { Well } from 'react-bootstrap';

export default class ExerciseSearchList extends React.Component {
  render() {
    const { exerciseSearchResults, onClick } = this.props; 
    return (
      <Well>
        {exerciseSearchResults.map(exercise =>
          <ExerciseEntry
            key={exercise.exerciseID}
            onClick={onClick}
            {...exercise}
          />
        )}
      </Well>
    )
  }
}
