import { CREATE_TEMPLATE, SAVE_TEMPLATE, ADD_EXERCISE, ADD_SET } from '../constants/ActionTypes'
import { v4 } from 'uuid'

const createDate = () => {
  let now = new Date(); 
  return now; 
}

export const createTemplate = (username) => {
  return {
    type: CREATE_TEMPLATE,
    id: v4(),
    date: createDate(),
    username,
  }
}

export const saveTemplate = (template) => {
  return {
    type: SAVE_TEMPLATE,
    id: template.id,
    template,
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
