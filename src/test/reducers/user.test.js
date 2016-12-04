import * as types from '../../constants/ActionTypes'
import reducer from '../../reducers/user'

describe('user reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(
      {
        loggedIn: false,
        workouts: [],
        templates: []
      }
    )
  })

  it('should handle LOGIN_USER', () => {
    const nextState = reducer([], {
      type: types.LOGIN_USER,
      id: 1,
      username: 'Riti'
    })
    const expectedState = {
      id: 1,
      username: 'Riti',
      loggedIn: true,
      workouts: [],
      templates: []
    }
    expect(nextState).toEqual(expectedState);
  })

}); 