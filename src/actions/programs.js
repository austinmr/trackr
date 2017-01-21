// CONSTANTS 
import { 
  CREATE_PROGRAM, 
  EDIT_PROGRAM, 
  USE_PROGRAM, 
  ADD_TEMPLATE 
} from '../constants/ActionTypes'

// APIs + MIDDLEWARE
import { getTemplatesInProgramMiddleware, getUserExercisesMiddleware } from '../reducers/root'
import { formatVolumeDeloadExerciseObject, formatWeightDeloadExerciseObject } from './deload'

// DEPENDENCIES
import { calculateWeight } from '../utils/calculators'
import { v4 } from 'uuid'

// BASIC ACTION CREATORS
export const createProgram = (userID) => {
  return {
    type: CREATE_PROGRAM,
    id: v4(),
    userID, 
  }
}

export const editProgram = (userID, programID, programName, templates) => {
  return {
    type: EDIT_PROGRAM,
    userID, 
    programID,
    programName,
    templates, 
  }
}

export const useProgram = (userID, programID, programName, exportObject) => {
  return {
    type: USE_PROGRAM,
    userID, 
    programID,
    programName,
    exportObject, 
  }
}

// export const saveWeeklyPlan = (weeklyPlanID, weeklyPlan) => {
//   return {
//     type: SAVE_WEEKLY_PLAN,
//     weeklyPlanID,
//     weeklyPlan,
//   }
// }

export const addTemplateToProgram = (templateID, day) => {
  return {
    type: ADD_TEMPLATE,
    templateID,
    day,
  }
}

const formatExerciseObject = (exercise, userExercises) => {
  const userExerciseObject = userExercises[`${exercise.id}`]; 
  const currentOneRepMax = parseInt(userExerciseObject.oneRepMax); 

  return {
    ...exercise, 
    currentOneRepMax: currentOneRepMax,
    sets: exercise.sets.map((set => {
      const weight = calculateWeight(currentOneRepMax, set.reps)
      return {
        ...set, 
        id: v4(),
        targetReps: set.reps,
        completedReps: 0,
        weight: weight
      }
    }))
  }
}

export const createExportFromProgramMiddleware = (userID, programID, programName, templates, deload) => {
  return (dispatch, getState) => {
    const state = getState(); 
    let templateExercises = getTemplatesInProgramMiddleware(state, templates)
    let userExercises = getUserExercisesMiddleware(state)

    let format; 
    if (deload === 'Volume') {
      format = formatVolumeDeloadExerciseObject; 
    } else if (deload === 'Weight') {
      format = formatWeightDeloadExerciseObject
    } else {
      format = formatExerciseObject;
    }

    Object.keys(templateExercises).forEach((day) => {
      templateExercises[day].exercises = templateExercises[day].exercises.map((exercise) => {
        return format(exercise, userExercises)
      })
    })
    dispatch(useProgram(userID, programID, programName, templateExercises)); 
  }
}