import { CREATE_WORKOUT_FROM_TEMPLATE, CREATE_DELOAD_FROM_TEMPLATE, ADD_SET_REPS, PUT_NEW_USER_WORKOUT_SUCCESS } from '../constants/ActionTypes'


const set = (state, action) => {
  switch (action.type) {
    case ADD_SET_REPS: 
      if (state.id !== action.setID) {
        return state
      }

      return {
        ...state,
        completedReps: parseInt(action.reps)
      }
    default: 
      return state 
  }
}
 
const exercise = (state = {}, action) => {
  switch (action.type) {
    case ADD_SET_REPS: 
      if (state.id !== action.exerciseID) {
        return state
      }

      return {
        ...state,
        sets: state.sets.map(s => set(s, action))
      }
    default: 
      return state 
  }
}

const exercises = (state = [], action) => {
  switch (action.type) {
    case ADD_SET_REPS:
      return state.map(e => exercise(e, action))
    default: 
      return state
  }
}

const workouts = (state = {}, action ) => {
  switch (action.type) {
    case CREATE_WORKOUT_FROM_TEMPLATE:
      return {
        id: action.id,
        userID: action.userID, 
        username: action.username,
        date: action.date,
        templateID: action.templateID,
        exercises: action.exercises,
      }
    case CREATE_DELOAD_FROM_TEMPLATE:
      return {
        id: action.id,
        userID: action.userID, 
        username: action.username,
        date: action.date,
        templateID: action.templateID,
        exercises: action.exercises,
        deload: action.deload
      }
    case ADD_SET_REPS: 
      return {
        ...state,
        exercises: exercises(state.exercises, action)
      }
    case PUT_NEW_USER_WORKOUT_SUCCESS: 
      return {}
    default: 
      return state
  }
} 

export default workouts