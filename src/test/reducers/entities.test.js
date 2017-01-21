import * as types from '../../constants/ActionTypes'
import reducer from '../../reducers/entities'

describe('user reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({ 
      users: {}, 
      exercises: {}, 
      workouts: {}, 
      templates: {} 
    })
  })

  it('should handle LOGIN_USER', () => {
    const nextState = reducer(undefined, {
      type: types.LOGIN_USER,
      id: 1,
      username: 'Riti'
    })
    const expectedState = {
      users: {
        1: {id: 1, username: 'Riti'}
      }, 
      exercises: {}, 
      workouts: {}, 
      templates: {} 
    }
    expect(nextState).toEqual(expectedState);
  })

  it('should handle SAVE_TEMPLATE', () => {
    const template = {
      id: "dd7df893-d27d-44b4-ac14-b2b5606e35a8",
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
    const nextState = reducer(undefined, {
      type: types.SAVE_TEMPLATE,
      id: template.id,
      template,
    })
    const expectedState = {
      users: {}, 
      exercises: {}, 
      workouts: {}, 
      templates: {
        'dd7df893-d27d-44b4-ac14-b2b5606e35a8': {
          ...template
        }
      } 
    }
    expect(nextState).toEqual(expectedState);
  })

}); 