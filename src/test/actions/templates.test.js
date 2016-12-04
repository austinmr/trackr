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
})