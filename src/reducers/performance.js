// CONSTANTS 
import { SET_PERFORMANCE_EXERCISE, RENDER_PERFORMANCE_EXERCISE } from '../constants/ActionTypes'

function performance (state = {
  render: false,
  exerciseID: null, 
}, action) {
  switch (action.type) {
    case SET_PERFORMANCE_EXERCISE: 
      return {
        ...state,
        render: true, 
        exerciseID: action.exerciseID,
        workoutData: action.workoutData, 
      }
    case RENDER_PERFORMANCE_EXERCISE: 
      return {
        ...state, 
        render: true,
      }
    default:
      return state
  }
}

export default performance
