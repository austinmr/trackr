// CONSTANTS 
import { CREATE_TEMPLATE, ADD_EXERCISE, ADD_SET } from '../constants/ActionTypes'

// DEPENDENCIES
import { v4 } from 'uuid'

const createDate = () => {
  let now = new Date(); 
  return now; 
}

// BASIC ACTION CREATORS
export const createTemplate = (userID, username) => {
  return {
    type: CREATE_TEMPLATE,
    id: v4(),
    date: createDate(),
    userID, 
    username,
  }
}

export const addExercise = (id, exercise) => {
  return {
    type: ADD_EXERCISE,
    id, 
    exercise,
  }
}

export const addSet = (exerciseId, reps) => {
  return {
    type: ADD_SET,
    id: v4(),
    exerciseId,
    reps
  }
}