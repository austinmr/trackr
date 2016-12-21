import { SEARCH_ALL_EXERCISES_SUCCESS } from '../constants/ActionTypes'

function allExercises (state = {
  isFetching: false,
  isValid: false,
  items: []
}, action) {
  switch (action.type) {
    case SEARCH_ALL_EXERCISES_SUCCESS: 
      return {
        ...state,
        isFetching: false,
        isValid: true,
        items: [
          ...action.response.result
        ]
      }
    default:
      return state
  }
}

export default allExercises