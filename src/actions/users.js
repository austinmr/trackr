import { v4 } from 'node-uuid'

export const loginUser = (username) => {
  return {
    type: 'LOGIN_USER',
    id: v4(),
    username
  }
}