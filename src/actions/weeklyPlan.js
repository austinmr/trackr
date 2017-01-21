import { getTemplatesInPlanMiddleware, getUserExercisesMiddleware } from '../reducers/root'
import { formatVolumeDeloadExerciseObject, formatWeightDeloadExerciseObject } from './deload'
import { calculateWeight } from '../utils/calculators'
import { v4 } from 'uuid'
import { 
  CREATE_WEEKLY_PLAN, 
  EDIT_WEEKLY_PLAN, 
  USE_WEEKLY_PLAN, 
  SAVE_WEEKLY_PLAN, 
  ADD_TEMPLATE 
} from '../constants/ActionTypes'

export const createWeeklyPlan = (userID) => {
  return {
    type: CREATE_WEEKLY_PLAN,
    id: v4(),
    userID, 
  }
}

export const editWeeklyPlan = (userID, planID, planName, templates) => {
  return {
    type: EDIT_WEEKLY_PLAN,
    userID, 
    planID,
    planName,
    templates, 
  }
}

export const useWeeklyPlan = (userID, planID, planName, exportObject) => {
  return {
    type: USE_WEEKLY_PLAN,
    userID, 
    planID,
    planName,
    exportObject, 
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

// export const createExportFromPlanMiddleware = (userID, planID, planName, templates, deload) => {
//   return (dispatch, getState) => {
//     console.log('firing middleware call')
//     console.log('DELOAD: ', deload, '\n\n'); 

//     const state = getState(); 
//     let templateExercises = getTemplatesInPlanMiddleware(state, templates)
//     console.log(templateExercises); 
//     let userExercises = getUserExercisesMiddleware(state)
//     console.log(userExercises); 
//     // Object.keys(templateExercises).forEach((day) => {
//     //   day.exercises.map((exercise) => {
//     //     formatExerciseObject(exercise, userExercises)
//     //   })
//     // })
//     Object.keys(templateExercises).forEach((day) => {
//       console.log(day); 
//       templateExercises[day].exercises = templateExercises[day].exercises.map((exercise) => {
//         return formatExerciseObject(exercise, userExercises)
//       })
//     })
//     console.log('FORMATTED\n\n')
//     console.log(templateExercises)
//     // let exercises = getExercisesInPlanMiddleware(state, templates)
//     // const userExercisesPlan = getUserExercisesInPlanMiddleware(state, exercises); 
//     // console.log(userExercisesWorkout);
//     dispatch(useWeeklyPlan(userID, planID, planName, templateExercises)); 
//   }
// }

export const createExportFromPlanMiddleware = (userID, planID, planName, templates, deload) => {
  return (dispatch, getState) => {
    const state = getState(); 
    let templateExercises = getTemplatesInPlanMiddleware(state, templates)
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
    dispatch(useWeeklyPlan(userID, planID, planName, templateExercises)); 
  }
}

export const saveWeeklyPlan = (weeklyPlanID, weeklyPlan) => {
  return {
    type: SAVE_WEEKLY_PLAN,
    weeklyPlanID,
    weeklyPlan,
  }
}

export const addTemplateToWeeklyPlan = (templateID, day) => {
  return {
    type: ADD_TEMPLATE,
    templateID,
    day,
  }
}