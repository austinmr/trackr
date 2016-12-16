import { CREATE_WORKOUT_FROM_TEMPLATE, ADD_SET_REPS } from '../constants/ActionTypes'
import { v4 } from 'uuid'
import { calculateWeight, calculate1RM, calculateAverage1RM, everySetComplete } from '../utils/calculators'
import { getUserExercisesInWorkoutMiddleware } from '../reducers/root'
import { updateUserExercises, invalidateUserExercises } from './userExercises'
import { setWorkoutResults } from './results'


////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////// 
////////////// DYNAMO 

import 'aws-sdk/dist/aws-sdk';
const AWS = window.AWS;
AWS.config.update({
  region: "us-west-1",
  endpoint: "dynamodb.us-west-1.amazonaws.com",
  accessKeyId: "AKIAJXC6MZ3RKYR7JSYA",
  secretAccessKey: "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"
});
AWS.config.setPromisesDependency(require('bluebird'));

// const dynamodb = new AWS.DynamoDB();
const docClient = new AWS.DynamoDB.DocumentClient();

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

const createDate = () => {
  let now = new Date(); 
  return now; 
}

const formatExerciseObject = (exercise, userExercises) => {
  const userExerciseObject = userExercises[`${exercise.id}`]; 
  const currentOneRepMax = userExerciseObject.OneRepMax; 

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
  return {
    type: CREATE_WORKOUT_FROM_TEMPLATE,
    id: v4(),
    date: createDate(),
    exercises: template.exercises.map(exercise => formatExerciseObject(exercise, userExercises)), 
    userID,
    username,
    template,
  }
}

export const createWorkoutFromTemplateMiddleware = (userID, username, template, exercises) => {
  return (dispatch, getState) => {
    const state = getState(); 
    const userExercisesWorkout = getUserExercisesInWorkoutMiddleware(state, exercises); 
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
        let completedOneRepMax = calculate1RM(set.weight, set.completedReps); 

        return {
          ...set, 
          completed: completed,
          completedOneRepMax: completedOneRepMax
        }
      })
    }
  })
}

const individualExerciseTracker = (exercises) => {
  return exercises.map((exercise) => {
    let averageOneRepMax = calculateAverage1RM(exercise.sets)
    let completed = everySetComplete(exercise.sets) 
    return {
      ...exercise, 
      averageOneRepMax: averageOneRepMax,
      completed: completed
    }
  })
}

const individualUserExercise = (workout, userExercises) => {
  workout.exercises.forEach((exercise) => {
    // Update individual exercise record 
    const userExercise = userExercises[`${exercise.id}`]; 

    // If current average is 3% greater than current max and completed all sets for most recent workout
    const currentMax = userExercise.OneRepMax; 
    if ( (exercise.averageOneRepMax / currentMax) >= 1.03 && userExercise.MRW.complete ) {
      userExercise.OneRepMax = currentMax + 5;  
    }

    let MRW = {}
    MRW.AvgMax = exercise.averageOneRepMax; 
    MRW.Complete = exercise.completed;
    MRW.WorkoutDate = new Date(); 
    MRW.WorkoutID = workout.id; 
    MRW.WorkoutLog = userExercise.MRW.WorkoutLog || [];
    let previousWorkoutID = userExercise.MRW.WorkoutID || false; 
    if (previousWorkoutID) {
      MRW.WorkoutLog.concat(previousWorkoutID); 
    }
    userExercise.MRW = MRW; 
  })
  return userExercises; 
}

export function putWorkout(workout) {
  const table = "Workouts";
  // console.log(workout)
  const params = {
    TableName: table, 
    Item: {
      "WorkoutID": workout.id,
      "UserID": workout.userID, 
      "Username": workout.username,
      "TemplateID": workout.templateID, 
      "Date": workout.date, 
      "Exercises": workout.exercises
    }
  }

  docClient.put(params, function(err, data) {
      if (err) {
          console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
      } else {
          console.log("Put workout succeeded:", JSON.stringify(data, null, 2));
      }
  });    
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
    // updateUserExercises(userExercises); 
    // putWorkout(workout); 

    console.log(workout, userExercises); 
    //TODO: Dispatch results 
    dispatch(setWorkoutResults(workout, userExercises)); 
    //TODO: Dispatch invalid userExercises
    dispatch(invalidateUserExercises(workout.userID)); 
  }

}