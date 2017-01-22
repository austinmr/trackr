// REACT-REDUX
import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

// REDUCERS
import entities, * as fromEntities from './entities'
import user from './user'
import allExercises from './allExercises'
import template from './template'
import workout from './workout'
import program from './program'
import results from './results'
import performance from './performance'


const app = combineReducers({
  routing,
  entities,
  user,
  allExercises,
  template,
  workout,
  program,
  results, 
  performance, 
})

export default app


////////////////////////////////////////////////////////////////////////////////
////////////// SELECTORS

// USER PROFILE
export const getWorkoutsObjectsArray = (state) => 
  fromEntities.getWorkoutsObjectsArray(state.entities, state.user.workouts.items)

export const getExercisesObjectsArray = (state) => 
  fromEntities.getExercisesObjectsArray(state.entities, state.user.exercises.items)

export const getTemplatesObjectsArray = (state) => 
  fromEntities.getTemplatesObjectsArray(state.entities, state.user.templates.items)

export const getProgramsObjectsArray = (state) => 
  fromEntities.getProgramsObjectsArray(state.entities, state.user.programs.items)

// TEMPLATE
export const getExercisesFromTemplate = (state) => 
  fromEntities.getExercisesFromTemplate(state.entities, state.workout.template)

export const getExerciseSearchResults = (state) => 
  fromEntities.getExerciseSearchResults(state.entities, state.allExercises.searchResults)

export const getUserExercise = (state, exerciseID) => 
  fromEntities.getUserExercise(state.entities, exerciseID)

export const getUserExercises = (state) => 
  fromEntities.getUserExercise(state.entities, state.user.exercises.items)

// WORKOUT
export const getUserExercisesInWorkoutMiddleware = (state, exercises) => 
  fromEntities.getUserExercisesInWorkout(state.entities, exercises)

export const getWorkoutDataForExerciseMiddleware = (state, exerciseID, workoutsArray) => 
  fromEntities.getWorkoutDataForExercise(state.entities, exerciseID, workoutsArray)

export const getUserExercisesInWorkout = (state) => {
  const exercises = state.workout.exercises.map(exercise => exercise.id)
  return fromEntities.getUserExercisesInWorkout(state.entities, exercises)
}

export const getUserExercisesMiddleware = (state) => 
  fromEntities.getUserExercisesMiddleware(state.entities)

// PROGRAM
export const getTemplatesInProgramMiddleware = (state, templates) => {
  return fromEntities.getTemplatesInProgramMiddleware(state.entities, templates)
}
