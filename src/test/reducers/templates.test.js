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

  it('should handle ADD_EXERCISE', () => {
    const initialState = {
      id: 1,
      username: 'Riti',
      date: 'today'
    }
    const nextState = reducer(initialState, {
      type: types.ADD_EXERCISE,
      id: "a8056300-3f0f-4e5a-b49f-673256e074cd",
      exercise: 'bench press',
    })
    const expectedState = {
      id: 1,
      username: 'Riti',
      date: 'today',
      exercises: [
        {
          id: "a8056300-3f0f-4e5a-b49f-673256e074cd",
          exercise: 'bench press', 
          sets: []
        }
      ]
    }
    expect(nextState).toEqual(expectedState);
  })

  it('should handle ADD_SET', () => {
    const initialState = {
      id: 1,
      username: 'Riti',
      date: 'today',
      exercises: [
        {
          id: "a8056300-3f0f-4e5a-b49f-673256e074cd",
          exercise: 'bench press', 
          sets: []
        }
      ]
    }
    const nextState = reducer(initialState, {
      type: types.ADD_SET,
      id: 3,
      exerciseId: "a8056300-3f0f-4e5a-b49f-673256e074cd",
      reps: 10
    })
    const expectedState = {
      id: 1,
      username: 'Riti',
      date: 'today',
      exercises: [
        {
          id: "a8056300-3f0f-4e5a-b49f-673256e074cd",
          exercise: 'bench press', 
          sets: [
            {
              id: 3,
              reps: 10
            }
          ]
        }
      ]
    }
    expect(nextState).toEqual(expectedState);
  })

}); 

