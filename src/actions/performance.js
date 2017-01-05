import { SET_PERFORMANCE_EXERCISE, RENDER_PERFORMANCE_EXERCISE } from '../constants/ActionTypes'
import { getWorkoutDataForExerciseMiddleware } from '../reducers/root'


export function setPerformanceExercise(exerciseID, workoutData) {
  return {
    type: SET_PERFORMANCE_EXERCISE,
    exerciseID,
    workoutData, 
  }
}

// export function renderPerformanceExercise(id, workouts) {
//   return {
//     type: RECEIVE_ALL_USER_WORKOUTS,
//     id,
//     workouts
//   }
// }

// export const getAllUserTemplates = (id) => (dispatch) => {
//   dispatch(getAllUserTemplatesRequest(id))
//   return templatesAPI.getAllUserTemplates(id).then((response) => {
//     const normalizedResponse = normalize(response.Items, templatesAPI.arrayOfTemplates)
//     console.log(response); 
//     console.log(response.Items); 
//     console.log(
//       'normalized response', 
//       normalizedResponse
//     ); 
//     dispatch(getAllUserTemplatesSuccess(id, normalizedResponse))
//   }).catch((err) => {
//     console.log(err); 
//   }); 
// }

// export const createWorkoutFromTemplateMiddleware = (userID, username, template, exercises) => {
//   return (dispatch, getState) => {
//     // console.log('firing middleware call')
//     const state = getState(); 
//     const userExercisesWorkout = getUserExercisesInWorkoutMiddleware(state, exercises); 
//     // console.log(userExercisesWorkout);
//     dispatch(createWorkoutFromTemplate(userID, username, template, userExercisesWorkout)); 
//   }
// }

export const getWorkoutDataForExercise = (exerciseID, workoutLog) => (dispatch, getState) => {
  const state = getState(); 
  const workoutDataForExercise = getWorkoutDataForExerciseMiddleware(state, exerciseID, workoutLog); 
  dispatch(setPerformanceExercise(exerciseID, workoutDataForExercise)); 
}