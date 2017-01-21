// CONSTANTS 
import { SET_WORKOUT_RESULTS } from '../constants/ActionTypes'

// BASIC ACTION CREATORS
export const setWorkoutResults = (workout, userExercises) => {
  return {
    type: SET_WORKOUT_RESULTS,
    workout, 
    userExercises
  }
}