import * as user from '../../actions/user'
import * as types from '../../constants/ActionTypes'

describe('actions', () => {
  it('should create an action to login users', () => {
    const username = 'riti'
    const expectedAction = {
      type: types.LOGIN_USER,
      username
    }
    expect(user.loginUser(username).type).toEqual(expectedAction.type)
    expect(user.loginUser(username).username).toEqual(expectedAction.username)
  })
})