import { CREATE_DELOAD_FROM_TEMPLATE } from '../constants/ActionTypes'
import { v4 } from 'uuid'
import { calculateWeight, roundByFives } from '../utils/calculators'
import { getUserExercisesInWorkoutMiddleware } from '../reducers/root'
import { updateUserExercises, invalidateUserExercises } from './userExercises'
import { updateUserExercisesFromWorkout } from '../api/userExercises'
import { setWorkoutResults } from './results'
import { putNewUserWorkout } from './userWorkouts'

const createDate = () => {
  let now = new Date(); 
  return now; 
}

////////////////////////////////////////////////////////////////
///// VOLUME DELOAD
/////
////////////////////////////////////////////////////////////////

export const formatVolumeDeloadExerciseObject = (exercise, userExercises) => {
  const userExerciseObject = userExercises[`${exercise.id}`]; 
  const currentOneRepMax = parseInt(userExerciseObject.oneRepMax); 

  return {
    ...exercise, 
    currentOneRepMax: currentOneRepMax,
    sets: exercise.sets.map((set => {
      const weight = calculateWeight(currentOneRepMax, set.reps)
      let deloadReps = Math.floor(set.reps * .60); 
      return {
        ...set, 
        id: v4(),
        targetReps: deloadReps,
        completedReps: 0,
        weight: weight
      }
    }))
  }
}

export const createVolumeDeloadFromTemplate = (userID, username, template, userExercises) => {
  const templateID = template.templateID
  const exercises = template.exercises.map(exercise => formatVolumeDeloadExerciseObject(exercise, userExercises))
  return {
    type: CREATE_DELOAD_FROM_TEMPLATE,
    id: v4(),
    date: createDate(),
    exercises: exercises, 
    userID,
    username,
    template,
    templateID: templateID,
    deload: 'Volume'
  }
}

export const createVolumeDeloadFromTemplateMiddleware = (userID, username, template, exercises) => {
  return (dispatch, getState) => {
    const state = getState(); 
    const userExercisesWorkout = getUserExercisesInWorkoutMiddleware(state, exercises); 
    dispatch(createVolumeDeloadFromTemplate(userID, username, template, userExercisesWorkout)); 
  }
}

////////////////////////////////////////////////////////////////
///// WEIGHT DELOAD
/////
////////////////////////////////////////////////////////////////

export const formatWeightDeloadExerciseObject = (exercise, userExercises) => {
  const userExerciseObject = userExercises[`${exercise.id}`]; 
  const currentOneRepMax = parseInt(userExerciseObject.oneRepMax); 

  return {
    ...exercise, 
    currentOneRepMax: currentOneRepMax,
    sets: exercise.sets.map((set => {
      const weight = calculateWeight(currentOneRepMax, set.reps)
      let deloadWeight = Math.floor(weight * .60) 
      deloadWeight -= deloadWeight % 5; 
      return {
        ...set, 
        id: v4(),
        targetReps: set.reps,
        completedReps: 0,
        weight: deloadWeight
      }
    }))
  }
}

export const createWeightDeloadFromTemplate = (userID, username, template, userExercises) => {
  const templateID = template.templateID
  const exercises = template.exercises.map(exercise => formatWeightDeloadExerciseObject(exercise, userExercises))
  return {
    type: CREATE_DELOAD_FROM_TEMPLATE,
    id: v4(),
    date: createDate(),
    exercises: exercises, 
    userID,
    username,
    template,
    templateID: templateID,
    deload: 'Weight'
  }
}

export const createWeightDeloadFromTemplateMiddleware = (userID, username, template, exercises) => {
  return (dispatch, getState) => {
    const state = getState(); 
    const userExercisesWorkout = getUserExercisesInWorkoutMiddleware(state, exercises); 
    dispatch(createWeightDeloadFromTemplate(userID, username, template, userExercisesWorkout)); 
  }
}