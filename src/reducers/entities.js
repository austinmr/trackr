import { LOGIN_USER, SAVE_TEMPLATE, RECEIVE_ALL_USER_WORKOUTS, GET_ALL_USER_WORKOUTS_SUCCESS, GET_ALL_USER_TEMPLATES_SUCCESS, GET_ALL_USER_EXERCISES_SUCCESS, SEARCH_ALL_EXERCISES_SUCCESS } from '../constants/ActionTypes'

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

function workouts(state, action) {
  switch(action.type) {
    case GET_ALL_USER_WORKOUTS_SUCCESS:
    if (!action.response.result.length) {
      return state; 
    } else {
      return {
        ...state,
        ...action.response.entities.workouts
      }      
    }
    default:
      return state
  }
}

const templates = (state, action) => {
  switch (action.type) {
    case SAVE_TEMPLATE:
      return {
        ...state.templates,
        [action.id]: {
          ...action.template,
        }
      }
    case GET_ALL_USER_TEMPLATES_SUCCESS:
      if (!action.response.result.length) {
        return state; 
      } else {
        return {
          ...state,
          ...action.response.entities.templates
        }      
      }
    default: 
      return state; 
  }
}

const exercises = (state, action) => {
  switch (action.type) {
  case GET_ALL_USER_EXERCISES_SUCCESS:
    if (!action.response.result.length) {
      return state; 
    } else {
      return {
        ...state,
        ...action.response.entities.exercises
      }      
    }
    default: 
      return state; 
  }
}

const allExercises = (state, action) => {
  switch (action.type) {
  case SEARCH_ALL_EXERCISES_SUCCESS:
    if (!action.response.result.length) {
      return state; 
    } else {
      return {
        ...state,
        ...action.response.entities.exercises
      }      
    }
    default: 
      return state; 
  }
}

const entities = (state = { users: {}, exercises: {}, workouts: {}, templates: {}, allExercises: {} }, action) => {
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
    case GET_ALL_USER_WORKOUTS_SUCCESS: 
      return {
        ...state, 
        workouts: workouts(state.workouts, action)
      }
    case GET_ALL_USER_TEMPLATES_SUCCESS:
      return {
        ...state, 
        templates: templates(state.templates, action)
      }
    case GET_ALL_USER_EXERCISES_SUCCESS:
      return {
        ...state, 
        exercises: exercises(state.exercises, action)
      }
    case SEARCH_ALL_EXERCISES_SUCCESS: 
      return {
        ...state, 
        allExercises: allExercises(state.allExercises, action)
      }
    default:
      return state
  }
}

export default entities

export const getExercisesFromTemplate = (state, template) => {
  return state.templates[template].exercises; 
}

// export const getTemplatesObjectArray = (state) => {
//   return Object.keys(state.templates).map((key) => state.templates[key])
// }

export const getWorkoutsObjectsArray = (state, workouts) => {
  return workouts.map(workoutID => state.workouts[`${workoutID}`])
}

export const getTemplatesObjectsArray = (state, templates) => {
  return templates.map(templateID => state.templates[`${templateID}`])
}

export const getExercisesObjectsArray = (state, exercises) => {
  return exercises.map(exerciseID => state.exercises[`${exerciseID}`])
}