import * as allExercisesAPI from '../api/allExercises'
import { normalize } from 'normalizr'

export const SEARCH_ALL_EXERCISES_REQUEST = 'SEARCH_ALL_EXERCISES_REQUEST'
export const searchAllExercisesRequest = (id) => {
  return {
    type: SEARCH_ALL_EXERCISES_REQUEST,
    id,
  }
}

export const SEARCH_ALL_EXERCISES_SUCCESS = 'SEARCH_ALL_EXERCISES_SUCCESS'
export const searchAllExercisesSuccess = (id, response) => {
  return {
    type: SEARCH_ALL_EXERCISES_SUCCESS,
    id,
    response,
  }
}

export const SEARCH_ALL_EXERCISES_FAILURE = 'SEARCH_ALL_EXERCISES_FAILURE'
export const getAllUserExercisesFailure = (id) => {
  return {
    type: SEARCH_ALL_EXERCISES_FAILURE,
    id,
  }
}

export const searchAllExercises = (id) => (dispatch) => {
  dispatch(searchAllExercisesRequest(id))
  return allExercisesAPI.searchAllExercises(id).then((response) => {
    const normalizedResponse = normalize(response.Items, allExercisesAPI.arrayOfExercises)
    console.log(response); 
    console.log(response.Items); 
    console.log(
      'normalized response', 
      normalizedResponse
    ); 
    dispatch(searchAllExercisesSuccess(id, normalizedResponse))
  }).catch((err) => {
    console.log(err); 
  }); 
}

const isObjectEmpty = (object) => {
  return !Object.keys(object).length 
}

function shouldSearchAllExercises(state) {
  const allExercises = state.user.exercises
  if (isObjectEmpty(allExercises.items)) {
    return true
  } else if (allExercises.isFetching) {
    return false
  } else {
    return allExercises.isValid
  }
}

export const searchAllExercisesConditional = (id) => (dispatch, getState) => {
  if (shouldSearchAllExercises(getState(), id)) {
    return dispatch(searchAllUserExercises(id))
  }
}