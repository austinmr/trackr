import React, { PropTypes } from 'react'
import Exercise from './ExerciseEntry'

//Bootstrap 
import { Well } from 'react-bootstrap';

const ExerciseList = ({ exercises, onExerciseClick }) => (
  <Well>
    {exercises.map(exercise =>
      <Exercise
        key={exercise.id}
        {...exercise}
      />
    )}
  </Well>
)

export default ExerciseList