import * as exercisesAPI from '../api/userExercises'
import { normalize } from 'normalizr'

import { 
  GET_ALL_USER_EXERCISES_REQUEST, 
  GET_ALL_USER_EXERCISES_SUCCESS, 
  GET_ALL_USER_EXERCISES_FAILURE,
  PUT_NEW_USER_EXERCISE_REQUEST,
  PUT_NEW_USER_EXERCISE_SUCCESS,
  PUT_NEW_USER_EXERCISE_FAILURE,
} from '../constants/ActionTypes'

export const getAllUserExercisesRequest = (id) => {
  return {
    type: GET_ALL_USER_EXERCISES_REQUEST,
    id,
  }
}

export const getAllUserExercisesSuccess = (id, response) => {
  return {
    type: GET_ALL_USER_EXERCISES_SUCCESS,
    id,
    response,
  }
}

export const getAllUserExercisesFailure = (id) => {
  return {
    type: GET_ALL_USER_EXERCISES_FAILURE,
    id,
  }
}

export const getAllUserExercises = (id) => (dispatch) => {
  dispatch(getAllUserExercisesRequest(id))
  return exercisesAPI.getAllUserExercises(id).then((response) => {
    const normalizedResponse = normalize(response.Items, exercisesAPI.arrayOfExercises)
    console.log(response); 
    console.log(response.Items); 
    console.log(
      'normalized response', 
      normalizedResponse
    ); 
    dispatch(getAllUserExercisesSuccess(id, normalizedResponse))
  }).catch((err) => {
    console.log(err); 
  }); 
}

const isObjectEmpty = (object) => {
  return !Object.keys(object).length 
}

function shouldGetUserExercises(state) {
  const userExercises = state.user.exercises
  if (isObjectEmpty(userExercises.items)) {
    return true
  } else if (userExercises.isFetching) {
    return false
  } else {
    return !userExercises.isValid
  }
}

export const getAllUserExercisesConditional = (id) => (dispatch, getState) => {
  if (shouldGetUserExercises(getState(), id)) {
    return dispatch(getAllUserExercises(id))
  }
}

export const putNewUserExerciseRequest = (userID, exerciseID, exerciseName, oneRepMax) => {
  return {
    type: PUT_NEW_USER_EXERCISE_REQUEST,
    userID, 
    exerciseID,
    exerciseName,
    oneRepMax,
  }
}

export const putNewUserExerciseSuccess = (response) => {
  return {
    type: PUT_NEW_USER_EXERCISE_SUCCESS,
    response
  }
}

export const putNewExerciseFailure = (userID, exerciseID, exerciseName, oneRepMax) => {
  return {
    type: PUT_NEW_USER_EXERCISE_FAILURE,
    userID, 
    exerciseID,
    exerciseName,
    oneRepMax,
  }
}

export const putNewUserExercise = (userID, exerciseID, exerciseName, oneRepMax) => (dispatch) => {
  dispatch(putNewUserExerciseRequest(userID, exerciseID, exerciseName, oneRepMax))
  return exercisesAPI.putNewUserExercise(userID, exerciseID, exerciseName, oneRepMax).then((response) => {
    const normalizedResponse = normalize(response.Attributes, exercisesAPI.exercise)
    console.log('RESPONSE')
    console.log(response); 
    console.log(
      'normalized response', 
      normalizedResponse
    ); 
    dispatch(putNewUserExerciseSuccess(normalizedResponse))
  }).catch((err) => {
    console.log(err); 
  }); 
}

// export const updateUserExercisesFromWorkout = (userID, userExercises) => (dispatch) => {
//   exercisesAPI.updateUserExercisesFromWorkout(userID, userExercises); 
// }