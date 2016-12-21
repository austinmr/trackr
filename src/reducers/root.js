import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import user from './user'
import allExercises, * as fromAllExercises from './allExercises'
import entities, * as fromEntities from './entities'
import template from './templates'
import workout from './workouts'
import results from './results'

// Refactoring out 
// import dbExercises, * as fromdbExercises from './dbExercises'
// import userExercises, * as fromUserExercises from './userExercises'


const app = combineReducers({
  routing,
  user,
  template,
  workout,
  entities,
  allExercises,
  results
})

export default app

export const getExercisesFromTemplate = (state) => 
  fromEntities.getExercisesFromTemplate(state.entities, state.workout.template)

export const getTemplatesObjectArray = (state) => 
  fromEntities.getTemplatesObjectArray(state.entities)

export const getWorkoutsObjectsArray = (state) => 
  fromEntities.getWorkoutsObjectsArray(state.entities, state.user.workouts.items)

export const getExercisesObjectsArray = (state) => 
  fromEntities.getExercisesObjectsArray(state.entities, state.user.exercises.items)

export const getTemplatesObjectsArray = (state) => 
  fromEntities.getTemplatesObjectsArray(state.entities, state.user.templates.items)

// export const getUserExercisesInWorkout = (state) => 
//   fromUserExercises.getUserExercisesInWorkout(state.userExercises, state.workout.exercises)

// export const getUserExercisesInWorkoutMiddleware = (state, exercises) => 
//   fromUserExercises.getUserExercisesInWorkout(state.userExercises, exercises)

// export const getExerciseSearchList = (state) => 
//   fromdbExercises.getExerciseSearchList(state.dbExercises)

// export const getUserExercise = (state, id) => 
//   fromUserExercises.getUserExercise(state.userExercises, id)