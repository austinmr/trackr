import * as templates from '../../actions/templates'
import * as types from '../../constants/ActionTypes'

describe('actions', () => {
  it('should create an action to create new template', () => {
    const username = 'riti'
    const expectedAction = {
      type: types.CREATE_TEMPLATE,
      username
    }
    const template = templates.createTemplate(username)
    expect(template.type).toEqual(expectedAction.type)
    expect(template.username).toEqual(expectedAction.username)
  })

  it('should add a new exercise', () => {
    const exercise = 'bench press'
    const expectedAction = {
      type: types.ADD_EXERCISE,
      exercise
    }
    const template = templates.addExercise(exercise)
    expect(template.type).toEqual(expectedAction.type)
    expect(template.exercise).toEqual(expectedAction.exercise)
  })

  it('should add a new set', () => {
    const exerciseId = '1'
    const reps = 10
    const expectedAction = {
      type: types.ADD_SET,
      exerciseId, 
      reps
    }
    const template = templates.addSet(exerciseId, reps)
    expect(template.type).toEqual(expectedAction.type)
    expect(template.exerciseId).toEqual(expectedAction.exerciseId)
    expect(template.exerciseId).toEqual(expectedAction.exerciseId)

  })

})