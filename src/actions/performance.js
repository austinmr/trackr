// CONSTANTS 
import { SET_PERFORMANCE_EXERCISE } from '../constants/ActionTypes'

// APIs + MIDDLEWARE
import { getWorkoutDataForExerciseMiddleware } from '../reducers/root'

// BASIC ACTION CREATORS
export function setPerformanceExercise(exerciseID, workoutData) {
  return {
    type: SET_PERFORMANCE_EXERCISE,
    exerciseID,
    workoutData, 
  }
}

export const getWorkoutDataForExercise = (exerciseID, workoutLog) => (dispatch, getState) => {
  const state = getState(); 
  const workoutDataForExercise = getWorkoutDataForExerciseMiddleware(state, exerciseID, workoutLog); 
  dispatch(setPerformanceExercise(exerciseID, workoutDataForExercise)); 
}