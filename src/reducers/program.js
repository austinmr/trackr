import { CREATE_PROGRAM, EDIT_PROGRAM, USE_PROGRAM, ADD_TEMPLATE } from '../constants/ActionTypes'

const templates = (state = {}, action) => {
  switch (action.type) {
    case ADD_TEMPLATE: 
      return {
        ...state,
        [`${action.day}`]: action.templateID
      }
    default: 
      return state 
  }
}

const program = (state = {}, action ) => {
  switch (action.type) {
    case CREATE_PROGRAM:
      return {
        userID: action.userID,
        programID: action.id,
        templates: {
          Day1: null,
          Day2: null,
          Day3: null,
          Day4: null,
          Day5: null,
          Day6: null,
          Day7: null,
        },
      }
    case EDIT_PROGRAM: 
      return {
        userID: action.userID,
        programID: action.programID,
        programName: action.programName, 
        templates: action.templates
      }
    case USE_PROGRAM:
      return {
        userID: action.userID,
        programID: action.programID,
        programName: action.programName, 
        exportObject: action.exportObject
      }
    case ADD_TEMPLATE: 
      return {
        ...state,
        templates: templates(state.templates, action)
      }
    default: 
      return state
  }
} 

export default program