// CONSTANTS 
import { SEARCH_ALL_EXERCISES_REQUEST, SEARCH_ALL_EXERCISES_SUCCESS, CREATE_TEMPLATE } from '../constants/ActionTypes'

function allExercises (state = {
  isFetching: false,
  isValid: false,
  displaySearch: false, 
  items: [],
  searchResults: []
}, action) {
  switch (action.type) {
    case SEARCH_ALL_EXERCISES_REQUEST: 
      return {
        ...state,
        isFetching: true
      }
    case SEARCH_ALL_EXERCISES_SUCCESS: 
      return {
        ...state,
        isFetching: false,
        isValid: true,
        displaySearch: true, 
        searchResults: [
          ...action.response.result
        ]
      }
    case CREATE_TEMPLATE:
      return {
        ...state,
        isFetching: false,
        isValid: false,
        displaySearch: false
      }
    default:
      return state
  }
}

export default allExercises
