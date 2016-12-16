import userMaxes from '../dynamo/users1RM'
import { LOGIN_USER, REQUEST_USER_EXERCISES, RECEIVE_USER_EXERCISES } from '../constants/ActionTypes'

var profile = {
  loggedIn: false,
  workouts: [],
  templates: [], 
  userMaxes: userMaxes, 
}



const user = (state = profile, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        id: action.id,
        username: action.username,
        loggedIn: true,
        workouts: [], 
        templates: [],
        exercises: []
      }
    case 'SAVE_TEMPLATE': 
      return {
        ...state,
        templates: [
        ...state.templates, 
        action.id
        ]
      }
      default:
        return state
    }
  }

export default user
