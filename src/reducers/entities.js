import { 
  LOGIN_USER, 
  GET_ALL_USER_WORKOUTS_SUCCESS, 
  GET_ALL_USER_TEMPLATES_SUCCESS, 
  GET_ALL_USER_EXERCISES_SUCCESS, 
  SEARCH_ALL_EXERCISES_SUCCESS, 
  PUT_NEW_USER_EXERCISE_SUCCESS, 
  PUT_NEW_USER_TEMPLATE_SUCCESS,
  PUT_NEW_EXERCISE_SUCCESS,
  GET_ALL_USER_PROGRAMS_SUCCESS, 
  PUT_NEW_USER_PROGRAM_SUCCESS,
  UPDATE_USER_PROGRAM_SUCCESS
} from '../constants/ActionTypes'

import _ from 'underscore'

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
    case PUT_NEW_USER_TEMPLATE_SUCCESS:
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
  case PUT_NEW_USER_EXERCISE_SUCCESS: 
    return {
      ...state, 
      ...action.response.entities.exercises
    }
    default: 
      return state; 
  }
}

const programs = (state, action) => {
  switch (action.type) {
  case GET_ALL_USER_PROGRAMS_SUCCESS:
    if (!action.response.result.length) {
      return state; 
    } else {
      return {
        ...state,
        ...action.response.entities.programs
      }      
    }
  case PUT_NEW_USER_PROGRAM_SUCCESS: 
  case UPDATE_USER_PROGRAM_SUCCESS: 
    return {
      ...state, 
      ...action.response.entities.programs
    }
    default: 
      return state; 
  }
}


const allExercises = (state, action) => {
  switch (action.type) {
  case SEARCH_ALL_EXERCISES_SUCCESS:
  case PUT_NEW_EXERCISE_SUCCESS:
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

const entities = (state = { users: {}, exercises: {}, workouts: {}, templates: {}, allExercises: {}, programs: {} }, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        users: users(state.users, action)
      }
    case GET_ALL_USER_WORKOUTS_SUCCESS: 
      return {
        ...state, 
        workouts: workouts(state.workouts, action)
      }
    case GET_ALL_USER_TEMPLATES_SUCCESS:
    case PUT_NEW_USER_TEMPLATE_SUCCESS:
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
    case SEARCH_ALL_EXERCISES_SUCCESS: 
    case PUT_NEW_EXERCISE_SUCCESS:
      return {
        ...state, 
        allExercises: allExercises(state.allExercises, action)
      }
    case GET_ALL_USER_PROGRAMS_SUCCESS: 
    case PUT_NEW_USER_PROGRAM_SUCCESS:
    case UPDATE_USER_PROGRAM_SUCCESS:
      return {
        ...state, 
        programs: programs(state.programs, action)
      }
    default:
      return state
  }
}

export default entities


////////////////////////////////////////////////////////////////////////////////
////////////// SELECTORS 

// USER PROFILE
export const getExercisesObjectsArray = (state, exercises) => {
  return exercises.map(exerciseID => state.exercises[`${exerciseID}`])
}

export const getWorkoutsObjectsArray = (state, workouts) => {
  return workouts.map(workoutID => state.workouts[`${workoutID}`])
}

export const getTemplatesObjectsArray = (state, templates) => {
  return templates.map(templateID => state.templates[`${templateID}`])
}

export const getProgramsObjectsArray = (state, programs) => {
  return programs.map(programID => state.programs[`${programID}`])
}

// TEMPLATE 
export const getExercisesFromTemplate = (state, template) => {
  return state.templates[template].exercises; 
}

export const getExerciseSearchResults = (state, searchResults) => {
  return searchResults.map(result => state.allExercises[`${result}`])
}

export const getUserExercise = (state, exerciseID) => {
  const userExercise = state.exercises[`${exerciseID}`]
  let result = null; 
  if (userExercise) {
    result = userExercise; 
  }
  return result; 
}

export const getUserExercisesMiddleware = (state) => {
  return state.exercises
}

// WORKOUT
export const getUserExercisesInWorkout = (state, exercises) => {
  const UserExercisesInWorkout = {}; 
  exercises.forEach((exerciseID) => {
    UserExercisesInWorkout[`${exerciseID}`] = state.exercises[`${exerciseID}`]; 
  }); 
  return UserExercisesInWorkout; 
}

export const getWorkoutDataForExercise = (state, exerciseID, workoutsArray) => {
  // console.log(workoutsArray); 
  const workoutData = workoutsArray.map((workout) => {
    const workoutObject = state.workouts[`${workout}`]; 
    // console.log(workoutObject); 
    const exerciseData = _.findWhere(workoutObject.exercises, {id: exerciseID})
    // console.log(exerciseData); 
    return {
      workout,
      workoutDate: workoutObject.workoutDate, 
      exerciseData
    }
  })
  // console.log(workoutData); 
  return workoutData; 
}

// PROGRAM
export const getTemplatesInProgramMiddleware = (state, weekObject) => {
  let exercisesArray = []; 
  let result = {}
  Object.keys(weekObject).forEach((day) => {
    let templateID = weekObject[day]
    if (templateID !== null) {
      let exercises = state.templates[templateID].exercises
      exercises.forEach((exercise) => {
        exercisesArray.push(exercise.id)
      })
      result[day] = {
        templateID: templateID,
        exercises: exercises
      }
    }
  })
  return result; 
}