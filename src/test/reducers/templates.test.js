import * as types from '../../constants/ActionTypes'
import reducer from '../../reducers/templates'

describe('user reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({})
  })

  it('should handle CREATE_TEMPLATE', () => {
    const nextState = reducer([], {
      type: types.CREATE_TEMPLATE,
      id: 1,
      username: 'Riti',
      date: 'today'
    })
    const expectedState = {
      id: 1,
      username: 'Riti',
      date: 'today',
      exercises: []
    }
    expect(nextState).toEqual(expectedState);
  })

}); 

