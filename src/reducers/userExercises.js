// import { REQUEST_USER_EXERCISES, RECEIVE_USER_EXERCISES, INVALIDATE_USER_EXERCISES, ADD_USER_EXERCISE } from '../constants/ActionTypes'

// function exercises(state,action) {
//   switch(action.type) {
//     case RECEIVE_USER_EXERCISES:
//       return Object.assign({}, action.exercises)
//     case ADD_USER_EXERCISE: 
//       return {
//         ...state,
//         [`${action.ExerciseID}`]: {
//           ExerciseID: action.ExerciseID,
//           MRW: action.MRW,
//           OneRepMax: action.OneRepMax,
//           UserID: action.UserID,
//           ExerciseName: action.ExerciseName
//         } 
//       }      
//     default:
//       return state
//   }
// }

// function userExercises(state = {
//   isFetching: false,
//   didInvalidate: false,
//   exercises: {}
// }, action) {
//   switch (action.type) {
//     case INVALIDATE_USER_EXERCISES:
//       return {
//         ...state,
//         didInvalidate: true
//       }
//     case REQUEST_USER_EXERCISES:
//       return {
//         ...state, 
//         isFetching: true, 
//         didInvalidate: false
//       }
//     case RECEIVE_USER_EXERCISES:
//       return {
//         ...state, 
//         isFetching: false, 
//         didInvalidate: false,
//         exercises: exercises(state.exercises, action)
//       }
//     case ADD_USER_EXERCISE: 
//       return {
//         ...state,
//         exercises: exercises(state.exercises, action)
//       }
//     default:
//       return state
//   }
// }

// export default userExercises 

// export const getUserExercisesInWorkout = (state, exercises) => {
//   if (typeof exercises[0] !== 'string') {
//     exercises = exercises.map((exercise) => exercise.id); 
//   }
//   const UserExercisesInWorkout = {};
//   exercises.forEach((exerciseID) => {
//     UserExercisesInWorkout[`${exerciseID}`] = state.exercises[`${exerciseID}`]; 
//   }); 
//   return UserExercisesInWorkout; 
// }

// export const getUserExercise = (state, exerciseID) => {
//   const userExercise = state.userExercises[`${exerciseID}`]
//   console.log(exerciseID); 
//   let result = null; 
//   if (userExercise) {
//     result = userExercise; 
//   }
//   return result; 
// }