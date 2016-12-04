import * as users from '../actions/users'
import * as types from '../constants/ActionTypes'

// Default example of action testing with Jest

describe('actions', () => {
  // it('should create an action to add a todo', () => {
  //   const text = 'Finish docs'
  //   const expectedAction = {
  //     type: types.ADD_TODO,
  //     text
  //   }
  //   expect(actions.addTodo(text)).toEqual(expectedAction)
  // })

  it('should create an action to login users', () => {
    const username = 'riti'
    const expectedAction = {
      type: types.LOGIN_USER,
      username
    }
    expect(users.loginUser(username).type).toEqual(expectedAction.type)
    expect(users.loginUser(username).username).toEqual(expectedAction.username)
  })
})