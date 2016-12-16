import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import user from './user'
import userExercises, * as fromUserExercises from './userExercises'
import template from './templates'
import workout from './workouts'
import results from './results'
import entities, * as fromEntities from './entities'

const app = combineReducers({
  routing,
  user,
  template,
  workout,
  entities,
  userExercises,
  results
})

export default app

export const getExercisesFromTemplate = (state) => 
  fromEntities.getExercisesFromTemplate(state.entities, state.workout.template)

export const getTemplatesObjectArray = (state) => 
  fromEntities.getTemplatesObjectArray(state.entities)

export const getUserExercisesInWorkout = (state) => 
  fromUserExercises.getUserExercisesInWorkout(state.userExercises, state.workout.exercises)

export const getUserExercisesInWorkoutMiddleware = (state, exercises) => 
  fromUserExercises.getUserExercisesInWorkout(state.userExercises, exercises)
