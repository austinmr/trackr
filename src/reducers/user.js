import { 
  LOGIN_USER, 
  GET_ALL_USER_WORKOUTS_SUCCESS, 
  GET_ALL_USER_TEMPLATES_SUCCESS, 
  GET_ALL_USER_EXERCISES_SUCCESS, 
  PUT_NEW_USER_EXERCISE_SUCCESS,
  PUT_NEW_USER_WORKOUT_SUCCESS,
  PUT_NEW_USER_TEMPLATE_SUCCESS, 
  GET_ALL_USER_PROGRAMS_SUCCESS,
  PUT_NEW_USER_PROGRAM_SUCCESS, 
} from '../constants/ActionTypes'

const emptyStateObject = {
  isFetching: false,
  isValid: false,
  items: []
}

// const profile = {
//   id: '7b0b8b9d-8cd3-4ab4-8830-88604bc8aad4',
//   username: 'Riti',
//   loggedIn: true,
//   workouts: emptyStateObject, 
//   templates: emptyStateObject,
//   exercises: emptyStateObject,
//   plans: emptyStateObject
// }

const profile = {
  id: '8cd3-7b0b8b9d-4ab4-8830-88604bc8aad4',
  username: 'Tester',
  loggedIn: true,
  workouts: emptyStateObject, 
  templates: emptyStateObject,
  exercises: emptyStateObject,
  plans: emptyStateObject,
  programs: emptyStateObject
}

function workouts (state = {
  isFetching: false,
  isValid: false,
  items: []
}, action) {
  switch (action.type) {
    case GET_ALL_USER_WORKOUTS_SUCCESS: 
      return {
        ...state,
        isFetching: false,
        isValid: true,
        items: [
          ...action.response.result
        ]
      }
    case PUT_NEW_USER_WORKOUT_SUCCESS: 
      return {
        ...state, 
        isValid: false
      }
    default:
      return state
  }
}

function templates (state = {
  isFetching: false,
  isValid: false,
  items: []
}, action) {
  switch (action.type) {
    case GET_ALL_USER_TEMPLATES_SUCCESS: 
      return {
        ...state,
        isFetching: false,
        isValid: true,
        items: [
          ...action.response.result
        ]
      }
    case PUT_NEW_USER_TEMPLATE_SUCCESS: 
      return {
        ...state, 
        items: [
        ...state.items,
        action.response.result
        ]
      }
    default:
      return state
  }
}

function exercises (state = {
  isFetching: false,
  isValid: false,
  items: []
}, action) {
  switch (action.type) {
    case GET_ALL_USER_EXERCISES_SUCCESS: 
      return {
        ...state,
        isFetching: false,
        isValid: true,
        items: [
          ...action.response.result
        ]
      }
    case PUT_NEW_USER_EXERCISE_SUCCESS: 
      return {
        items: [
          ...state.items, 
          action.response.result
        ]
      }
    default:
      return state
  }
}

function programs (state = {
  isFetching: false,
  isValid: false,
  items: []
}, action) {
  switch (action.type) {
    case GET_ALL_USER_PROGRAMS_SUCCESS: 
      return {
        ...state,
        isFetching: false,
        isValid: true,
        items: [
          ...action.response.result
        ]
      }
    case PUT_NEW_USER_PROGRAM_SUCCESS: 
      return {
        items: [
          ...state.items, 
          action.response.result
        ]
      }
    default:
      return state
  }
}

const user = (state = profile, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        id: action.id,
        username: action.username,
        loggedIn: true,
        workouts: {}, 
        templates: {},
        exercises: {}, 
        plans: {}
      }
    case PUT_NEW_USER_WORKOUT_SUCCESS: 
    case GET_ALL_USER_WORKOUTS_SUCCESS:
      return {
        ...state,
        workouts: workouts(state.workouts, action)
      }
    case PUT_NEW_USER_TEMPLATE_SUCCESS:
    case GET_ALL_USER_TEMPLATES_SUCCESS:
      return {
        ...state,
        templates: templates(state.templates, action)
      }
    case GET_ALL_USER_EXERCISES_SUCCESS:
    case PUT_NEW_USER_EXERCISE_SUCCESS: 
      return {
        ...state,
        exercises: exercises(state.exercises, action)
      }
    case GET_ALL_USER_PROGRAMS_SUCCESS:
    case PUT_NEW_USER_PROGRAM_SUCCESS:
      return {
        ...state,
        programs: programs(state.programs, action)
      }
      default:
        return state
    }
  }

export default user
