import React, { PropTypes } from 'react'
import Exercise from './Exercise'

//Bootstrap 
import { Well } from 'react-bootstrap';

const ExerciseList = ({ exercises }) => (
  <Well>
    {exercises.map(exercise =>
      <Exercise
        key={exercise.id}
        id={exercise.id}
        {...exercise}
      />
    )}
  </Well>
)

export default ExerciseList