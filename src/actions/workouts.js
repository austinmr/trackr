import { CREATE_WORKOUT_FROM_TEMPLATE, ADD_SET_REPS, REQUEST_ALL_USER_WORKOUTS, RECEIVE_ALL_USER_WORKOUTS, SAVE_WORKOUT } from '../constants/ActionTypes'
import { v4 } from 'uuid'
import { calculateWeight, calculate1RM, calculateAverage1RM, setCompletion, totalExerciseWeight } from '../utils/calculators'
import { getUserExercisesInWorkoutMiddleware } from '../reducers/root'
import { updateUserExercises, invalidateUserExercises } from './userExercises'
import { updateUserExercisesFromWorkout } from '../api/userExercises'
import { setWorkoutResults } from './results'
import { putNewUserWorkout } from './userWorkouts'

const createDate = () => {
  let now = new Date(); 
  return now; 
}

export function requestAllUserWorkouts(id) {
  return {
    type: REQUEST_ALL_USER_WORKOUTS,
    id
  }
}

export function receiveAllUserWorkouts(id, workouts) {
  return {
    type: RECEIVE_ALL_USER_WORKOUTS,
    id,
    workouts
  }
}

export function saveWorkout(id) {
  return {
    type: SAVE_WORKOUT,
    id
  }
} 

const formatExerciseObject = (exercise, userExercises) => {
  // console.log(exercise); 
  // console.log(userExercises); 
  const userExerciseObject = userExercises[`${exercise.id}`]; 
  // console.log(userExerciseObject)
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

export const createWorkoutFromTemplate = (userID, username, template, userExercises) => {
  const templateID = template.templateID
  const exercises = template.exercises.map(exercise => formatExerciseObject(exercise, userExercises))
  return {
    type: CREATE_WORKOUT_FROM_TEMPLATE,
    id: v4(),
    date: createDate(),
    exercises: exercises, 
    userID,
    username,
    template,
    templateID: templateID
  }
}

export const createWorkoutFromTemplateMiddleware = (userID, username, template, exercises) => {
  return (dispatch, getState) => {
    // console.log('firing middleware call')
    const state = getState(); 
    const userExercisesWorkout = getUserExercisesInWorkoutMiddleware(state, exercises); 
    // console.log(userExercisesWorkout);
    dispatch(createWorkoutFromTemplate(userID, username, template, userExercisesWorkout)); 
  }
}

export const addSetReps = (exerciseID, setID, reps) => {
  return {
    type: ADD_SET_REPS,
    exerciseID,
    setID,
    reps
  }
}

const individualSetTracker = (exercises) => {
  return exercises.map((exercise) => {
    return {
      ...exercise, 
      sets: exercise.sets.map((set) => {
        let completed = false; 
        if (set.completedReps >= set.targetReps) {
          completed = true; 
        } 
        let completedOneRepMax = 0; 
        if (set.completedReps > 0) {
          completedOneRepMax = Math.round(calculate1RM(set.weight, set.completedReps)); 
        }
        let totalWeight = set.weight * set.completedReps; 
        return {
          ...set, 
          completed: completed,
          completedOneRepMax: completedOneRepMax,
          totalWeight: totalWeight
        }
      })
    }
  })
}

const individualExerciseTracker = (exercises) => {
  return exercises.map((exercise) => {
    let averageOneRepMax = Math.round(calculateAverage1RM(exercise.sets));
    let {completed, percentageCompleted } = setCompletion(exercise.sets); 
    let totalWeight = totalExerciseWeight(exercise.sets); 
    return {
      ...exercise, 
      averageOneRepMax: averageOneRepMax,
      completed: completed,
      percentageCompleted: percentageCompleted,
      totalWeight: totalWeight,
      setCount: exercise.sets.length
    }
  })
}

const individualUserExercise = (workout, userExercises) => {
  // console.log('ALL USER EXERCISES: ', userExercises); 
  workout.exercises.forEach((exercise) => {
    // Update individual exercise record 
    // console.log('EXERCISE ID: ', exercise.id); 
    const userExercise = userExercises[`${exercise.id}`]; 
    // console.log(userExercise); 
    // If current average is 3% greater than current max and completed all sets for most recent workout
    const currentMax = userExercise.oneRepMax; 
    if ( (exercise.averageOneRepMax / currentMax) >= 1.03 && userExercise.MRW.complete ) {
      userExercise.oneRepMax = currentMax + 5;
      userExercises.newRecords = userExercises.newRecords || []; 
      userExercises.newRecords.push(exercise.id); 
    }

    let MRW = {}
    MRW.avgMax = exercise.averageOneRepMax; 
    MRW.complete = exercise.completed;
    MRW.workoutDate = new Date(); 
    MRW.workoutID = workout.id; 
    MRW.workoutLog = userExercise.MRW.workoutLog || [];
    let previousWorkoutID = userExercise.MRW.workoutID || false; 
    if (previousWorkoutID) {
      MRW.workoutLog.push(previousWorkoutID); 
    }
    userExercise.MRW = MRW; 
  })
  return userExercises; 
}



export const trackWorkout = (workout, userExercises) => {
  return (dispatch) => {
    // Map through individual sets and determine if all reps were completed and calculate sets 1RM. 
    workout.exercises = individualSetTracker(workout.exercises); 

    // Map through individual exercises and designate completed (Boolean) and averageOneRepMax properties
    workout.exercises = individualExerciseTracker(workout.exercises); 

    // Map through individual userExercise records, update based on the new workout data. 
    userExercises = individualUserExercise(workout, userExercises); 

    // Store workout results in respective DynamoDB tables
    console.log('\n\n USER EXERCISES OBJECT \n\n'); 
    console.log(userExercises); 
    console.log('\n\n\n\n')
    updateUserExercisesFromWorkout(userExercises);
    dispatch(putNewUserWorkout(workout)); 

    //TODO: Dispatch results 
    dispatch(setWorkoutResults(workout, userExercises)); 
    //TODO: Dispatch invalid userExercises
    dispatch(invalidateUserExercises(workout.userID)); 
  }
}


//////////////
/// WEEKLY WORKOUT GENERATOR 
//
/////////////

export const createWorkoutFromPlan = (userID, username, template, userExercises) => {
  const templateID = template.templateID
  const exercises = template.exercises.map(exercise => formatExerciseObject(exercise, userExercises))
  return {
    type: CREATE_WORKOUT_FROM_TEMPLATE,
    id: v4(),
    date: createDate(),
    exercises: exercises, 
    userID,
    username,
    template,
    templateID: templateID
  }
}

export const createWorkoutFromPlanMiddleware = (userID, username, plan, exercises) => {
  return (dispatch, getState) => {
    // console.log('firing middleware call')
    const state = getState(); 
    const userExercisesWorkout = getUserExercisesInPlanMiddleware(state, exercises); 
    // console.log(userExercisesWorkout);
    dispatch(createWorkoutFromTemplate(userID, username, plan, userExercisesWorkout)); 
  }
}


// export function fetchAllUserWorkouts(id) {
//   return dispatch => {
//     dispatch(requestAllUserWorkouts(id))
//     const params = {
//       TableName: "Users_Workouts",
//       KeyConditionExpression: "UserID = :user",
//       ExpressionAttributeValues: {
//           ":user":id
//       }
//     }

//     const queryObjectPromise = docClient.query(params).promise(); 
//     return queryObjectPromise.then((data) => {
//       console.log(data.Items); 
//       const workouts = {}; 
//       data.Items.forEach((item) => {
//         workouts[`${item.WorkoutID}`] = item
//       }); 

//       dispatch(receiveAllUserWorkouts(id, workouts))

//     }).catch((err) => {
//       console.log(err); 
//     }); 
//   }
// }