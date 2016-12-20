import { LOGIN_USER, SAVE_TEMPLATE, RECEIVE_ALL_USER_WORKOUTS } from '../constants/ActionTypes'

const templates = (state, action) => {
  switch (action.type) {
    case SAVE_TEMPLATE:
      return {
        ...state.templates,
        [action.id]: {
          ...action.template,
        }
      }
    default: 
      return state; 
  }
}

const users = (state, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        [action.id]: {
          id: action.id, 
          username: action.username,
        }
      }
    default: 
      return state; 
  }
}

const exercises = (state, action) => {
  switch (action.type) {
    default: 
      return state; 
  }
}

function workouts(state, action) {
  switch(action.type) {
    case RECEIVE_ALL_USER_WORKOUTS:
      return Object.assign({}, state, action.workouts)      
    default:
      return state
  }
}

const entities = (state = { users: {}, exercises: {}, workouts: {}, templates: {} }, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        users: users(state.users, action)
      }
    case SAVE_TEMPLATE: 
      return {
        ...state,
        templates: templates(state.templates, action)
      }
    case RECEIVE_ALL_USER_WORKOUTS: 
      return {
        ...state, 
        workouts: workouts(state.workouts, action)
      }
    default:
      return state
  }
}

export default entities

export const getExercisesFromTemplate = (state, template) => {
  return state.templates[template].exercises; 
}

export const getTemplatesObjectArray = (state) => {
  return Object.keys(state.templates).map((key) => state.templates[key])
}