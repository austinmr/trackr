import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import user from './user'
import * as fromUserExercises from './userExercises'
import allExercises, * as fromAllExercises from './allExercises'
import entities, * as fromEntities from './entities'
import template from './templates'
import workout from './workouts'
import results from './results'
import performance from './performance'
import weeklyPlan from './weeklyPlan'


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
  results, 
  performance, 
  weeklyPlan
})

export default app

export const getExercisesFromTemplate = (state) => 
  fromEntities.getExercisesFromTemplate(state.entities, state.workout.template)

export const getWorkoutsObjectsArray = (state) => 
  fromEntities.getWorkoutsObjectsArray(state.entities, state.user.workouts.items)

export const getExercisesObjectsArray = (state) => 
  fromEntities.getExercisesObjectsArray(state.entities, state.user.exercises.items)

export const getTemplatesObjectsArray = (state) => 
  fromEntities.getTemplatesObjectsArray(state.entities, state.user.templates.items)

export const getExerciseSearchResults = (state) => 
  fromEntities.getExerciseSearchResults(state.entities, state.allExercises.searchResults)

export const getUserExercise = (state, exerciseID) => 
  fromEntities.getUserExercise(state.entities, exerciseID)

export const getUserExercises = (state) => 
  fromEntities.getUserExercise(state.entities, state.user.exercises.items)

export const getUserExercisesInWorkoutMiddleware = (state, exercises) => 
  fromEntities.getUserExercisesInWorkout(state.entities, exercises)

export const getWorkoutDataForExerciseMiddleware = (state, exerciseID, workoutsArray) => 
  fromEntities.getWorkoutDataForExercise(state.entities, exerciseID, workoutsArray)

export const getUserExercisesInWorkout = (state) => {
  const exercises = state.workout.exercises.map(exercise => exercise.id)
  console.log('EXERCISES IN ROOT REDUCER:', exercises); 
  return fromEntities.getUserExercisesInWorkout(state.entities, exercises)
}

// export const getUserExercise = (state, exerciseID) => 
//   fromUserExercises.getUserExercise(state.user.exercises, exerciseID)


// export const getUserExercisesInWorkoutMiddleware = (state, exercises) => 
//   fromUserExercises.getUserExercisesInWorkout(state.userExercises, exercises)

// export const getExerciseSearchList = (state) => 
//   fromdbExercises.getExerciseSearchList(state.dbExercises)

