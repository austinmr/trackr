// CONSTANTS 
import { 
  ADD_SET_REPS, 
  CREATE_WORKOUT_FROM_TEMPLATE, 
} from '../constants/ActionTypes'

// APIs + MIDDLEWARE
import { updateUserExercisesFromWorkout } from '../api/userExercises'
import { getUserExercisesInWorkoutMiddleware } from '../reducers/root'
import { invalidateUserExercises } from './userExercises'
import { putNewUserWorkout } from './userWorkouts'
import { setWorkoutResults } from './results'

// DEPENDENCIES
import { calculateWeight, calculate1RM, calculateAverage1RM, setCompletion, totalExerciseWeight } from '../utils/calculators'
import { v4 } from 'uuid'


const createDate = () => {
  let now = new Date(); 
  return now; 
}

// BASIC ACTION CREATORS
export const addSetReps = (exerciseID, setID, reps) => {
  return {
    type: ADD_SET_REPS,
    exerciseID,
    setID,
    reps
  }
}

////////////////////////////////////////////////////////////////////////////////
////////////// CREATE WORKOUT FROM TEMPLATE 
// Requires format exercise object function and create workout from template middleware
////////////////////////////////////////////////////////////////////////////////
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
    templateID: templateID,
  }
}

export const createWorkoutFromTemplateMiddleware = (userID, username, template, exercises) => {
  return (dispatch, getState) => {
    const state = getState(); 
    const userExercisesWorkout = getUserExercisesInWorkoutMiddleware(state, exercises); 
    dispatch(createWorkoutFromTemplate(userID, username, template, userExercisesWorkout)); 
  }
}


////////////////////////////////////////////////////////////////////////////////
////////////// TRACK WORKOUT -> Workout Container
// Maps through sets and exercises of workout to analyze and save performance metrics 
////////////////////////////////////////////////////////////////////////////////
const individualSetTracker = (exercises, deload) => {

  return exercises.map((exercise) => {
    let currentOneRepMax = exercise.currentOneRepMax; 
    return {
      ...exercise, 
      sets: exercise.sets.map((set) => {

        // Determine if all target reps were completed for set 
        let completed = false; 
        if (set.completedReps >= set.targetReps) {
          completed = true; 
        } 

        // Calculate completed OneRepMax for set
        // NOTE: For tracking purposes, deloads will be entered as that exercises currentOneRepMax 
        let completedOneRepMax = 0; 
        if (deload) {
          completedOneRepMax = currentOneRepMax;
        } else if (set.completedReps > 0) {
          completedOneRepMax = Math.round(calculate1RM(set.weight, set.completedReps)); 
        }

        // NOTE: totalWeight will be accurate for deload weeks 
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
  workout.exercises.forEach((exercise) => {

    // Update individual exercise record 
    const userExercise = userExercises[`${exercise.id}`]; 

    // If current average is 3% greater than current max and completed all sets for most recent workout
    const currentMax = userExercise.oneRepMax; 
    userExercises.newRecords = userExercises.newRecords || []; 
    if ( (exercise.averageOneRepMax / currentMax) >= 1.03 && userExercise.MRW.complete ) {
      userExercise.oneRepMax = currentMax + 5;
      userExercises.newRecords.push(exercise.id); 
    }

    // Update Most Recent Workout object 
    let MRW = {}
    MRW.avgMax = exercise.averageOneRepMax; 
    MRW.complete = exercise.completed;
    MRW.workoutDate = new Date(); 
    MRW.workoutID = workout.id; 
    userExercise.MRW = MRW; 

    // Update workoutLog array to show all workout ids
    let workoutLog = userExercise.workoutLog || [];
    let previousWorkoutID = userExercise.MRW.workoutID || false; 
    if (previousWorkoutID) {
      workoutLog.push(previousWorkoutID); 
    }
    userExercise.workoutLog = workoutLog; 

  })
  return userExercises; 
}



export const trackWorkout = (workout, userExercises) => {
  return (dispatch) => {

    // Determine if workout is a deload 
    let deload = false; 
    if (workout.deload !== undefined) {
      deload = true; 
    }

    // Map through individual sets and determine if all reps were completed and calculate sets 1RM. 
    workout.exercises = individualSetTracker(workout.exercises, deload); 

    // Map through individual exercises and designate completed (Boolean) and averageOneRepMax properties
    workout.exercises = individualExerciseTracker(workout.exercises); 

    // Map through individual userExercise records, update based on the new workout data. 
    userExercises = individualUserExercise(workout, userExercises); 

    // Store workout results in respective DynamoDB tables
    // console.log('\n\n USER EXERCISES OBJECT \n\n'); 
    // console.log(userExercises); 
    // console.log('\n\n\n\n')
    updateUserExercisesFromWorkout(userExercises);
    dispatch(putNewUserWorkout(workout)); 

    dispatch(setWorkoutResults(workout, userExercises)); 
    dispatch(invalidateUserExercises(workout.userID)); 
  }
}