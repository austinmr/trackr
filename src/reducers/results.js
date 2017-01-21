import { SET_WORKOUT_RESULTS } from '../constants/ActionTypes'

function results(state = {}, action) {
  switch (action.type) {
    case SET_WORKOUT_RESULTS:
      return {
        workout: action.workout, 
        userExercises: action.userExercises
      }
    default:
      return state
  }
}

export default results; 