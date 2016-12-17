import { REQUEST_DB_EXERCISES, RECEIVE_DB_EXERCISES, PUT_DB_EXERCISE, ADDED_DB_EXERCISE } from '../constants/ActionTypes'

function exercises(state,action) {
  switch(action.type) {
    case RECEIVE_DB_EXERCISES:
      return Object.assign({}, state, action.exercises)      
    default:
      return state
  }
}

function dbExercises(state = {
  render: false, 
  exercises: {},
  searchResults: []
}, action) {
  switch (action.type) {
    case REQUEST_DB_EXERCISES:
      return {
        ...state, 
        render: false, 
      }
    case RECEIVE_DB_EXERCISES:
      return {
        ...state, 
        render: true, 
        exercises: exercises(state.exercises, action),
        searchResults: Object.keys(action.exercises)
      }
    case ADDED_DB_EXERCISE:
      return {
        ...state, 
        render: false, 
      }
    default:
      return state
  }
}

export default dbExercises 

// export const getExerciseSearchListObjects = (state) => {
//   const exerciseSearchListObjects = {}; 
//   state.searchResults.forEach((exerciseId) => {
//     exerciseSearchListObjects[`${exerciseId}`] = exercises[`exerciseId`];
//   })
//   return exerciseSearchListObjects; 
// }

export const getExerciseSearchList = (state) => {
  return state.searchResults.map((exerciseId) => {
    console.log(state.exercises[exerciseId]); 
    return state.exercises[exerciseId]
  }); 
}