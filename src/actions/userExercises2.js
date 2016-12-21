import * as exercisesAPI from '../api/userExercises'
import { normalize } from 'normalizr'

export const GET_ALL_USER_EXERCISES_REQUEST = 'GET_ALL_USER_EXERCISES_REQUEST'
export const getAllUserExercisesRequest = (id) => {
  return {
    type: GET_ALL_USER_EXERCISES_REQUEST,
    id,
  }
}

export const GET_ALL_USER_EXERCISES_SUCCESS = 'GET_ALL_USER_EXERCISES_SUCCESS'
export const getAllUserExercisesSuccess = (id, response) => {
  return {
    type: GET_ALL_USER_EXERCISES_SUCCESS,
    id,
    response,
  }
}

export const GET_ALL_USER_EXERCISES_FAILURE = 'GET_ALL_USER_EXERCISES_SUCCESS'
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
    return userExercises.didInvalidate
  }
}

export const getAllUserExercisesConditional = (id) => (dispatch, getState) => {
  if (shouldGetUserExercises(getState(), id)) {
    return dispatch(getAllUserExercises(id))
  }
}