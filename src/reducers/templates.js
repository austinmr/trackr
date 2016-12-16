import { CREATE_TEMPLATE, SAVE_TEMPLATE, ADD_EXERCISE, ADD_SET } from '../constants/ActionTypes'

const set = (state, action) => {
  switch (action.type) {
    case ADD_SET: 
      return [
        ...state,
        {
          id: action.id,
          reps: action.reps,
        }
      ]
    default: 
      return state 
  }
}

const exercise = (state = {}, action) => {
  switch (action.type) {
    case ADD_SET: 
      if (state.id !== action.exerciseId) {
        return state
      }

      return {
        ...state,
        sets: set(state.sets, action)
      }
    default: 
      return state 
  }
}

const exercises = (state = [], action) => {
  switch (action.type) {
    case ADD_EXERCISE:
      return [
        ...state, 
        {
        id: action.id, 
        exercise: action.exercise, 
        sets: []
        }
      ]
    case ADD_SET:
      return state.map(e => exercise(e, action))
    default: 
      return state
  }
}

const templates = (state = {}, action ) => {
  switch (action.type) {
    case CREATE_TEMPLATE:
      return {
        id: action.id,
        username: action.username,
        date: action.date,
        exercises: [],
      }
    case ADD_EXERCISE: 
      return {
        ...state,
        exercises: exercises(state.exercises, action)
      }
    case ADD_SET: 
      return {
        ...state,
        exercises: exercises(state.exercises, action)
      }
    default: 
      return state
  }
} 

export default templates