import { LOGIN_USER } from '../constants/ActionTypes'
import { v4 } from 'uuid'

export const loginUser = (username) => {
  return {
    type: LOGIN_USER,
    id: v4(),
    username
  }
}

