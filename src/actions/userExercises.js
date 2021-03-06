// CONSTANTS 
import { 
  GET_ALL_USER_EXERCISES_REQUEST, 
  GET_ALL_USER_EXERCISES_SUCCESS, 
  GET_ALL_USER_EXERCISES_FAILURE,
  PUT_NEW_USER_EXERCISE_REQUEST,
  PUT_NEW_USER_EXERCISE_SUCCESS,
  PUT_NEW_USER_EXERCISE_FAILURE,
  INVALIDATE_USER_EXERCISES
} from '../constants/ActionTypes'

// APIs + MIDDLEWARE
import * as exercisesAPI from '../api/userExercises'

// DEPENDENCIES
import { normalize } from 'normalizr'


// BASIC ACTION CREATORS
export function invalidateUserExercises(id) {
  return {
    type: INVALIDATE_USER_EXERCISES,
    id
  }
}

////////////////////////////////////////////////////////////////////////////////
////////////// GET ALL USER EXERCISES  
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
    // console.log(
    //   'normalized response', 
    //   normalizedResponse
    // ); 
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

////////////////////////////////////////////////////////////////////////////////
////////////// PUT NEW USER EXERCISE
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

export const putNewExerciseFailure = (userID, exerciseID, exerciseName, oneRepMax, targetOneRepMax) => {
  return {
    type: PUT_NEW_USER_EXERCISE_FAILURE,
    userID, 
    exerciseID,
    exerciseName,
    oneRepMax,
    targetOneRepMax
  }
}

export const putNewUserExercise = (userID, exerciseID, exerciseName, oneRepMax, targetOneRepMax) => (dispatch) => {
  dispatch(putNewUserExerciseRequest(userID, exerciseID, exerciseName, oneRepMax))
  return exercisesAPI.putNewUserExercise(userID, exerciseID, exerciseName, oneRepMax, targetOneRepMax).then((response) => {
    const normalizedResponse = normalize(response.Attributes, exercisesAPI.exercise)
    // console.log(
    //   'normalized response', 
    //   normalizedResponse
    // ); 
    dispatch(putNewUserExerciseSuccess(normalizedResponse))
  }).catch((err) => {
    console.log(err); 
  }); 
}