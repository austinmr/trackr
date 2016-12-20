import { LOGIN_USER, REQUEST_USER_EXERCISES, RECEIVE_USER_EXERCISES } from '../constants/ActionTypes'

var profile = {
  id: '7b0b8b9d-8cd3-4ab4-8830-88604bc8aad4',
  username: 'Riti',
  loggedIn: true,
  workouts: [],
  templates: [], 
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
      }
    case 'SAVE_TEMPLATE': 
      return {
        ...state,
        templates: [
        ...state.templates, 
        action.id
        ]
      }
    case 'SAVE_WORKOUT': 
      return {
        ...state,
        workouts: [
        ...state.workouts, 
        action.id
        ]
      }
      default:
        return state
    }
  }

export default user
