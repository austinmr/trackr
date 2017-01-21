// CONSTANTS 
import { LOGIN_USER } from '../constants/ActionTypes'

// DEPENDENCIES
import { v4 } from 'uuid'

// BASIC ACTION CREATORS
export const loginUser = (username) => {
  return {
    type: LOGIN_USER,
    id: v4(),
    username
  }
}
