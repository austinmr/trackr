import * as workoutsAPI from '../api/userWorkouts'
import { normalize } from 'normalizr'

export const GET_ALL_USER_WORKOUTS_REQUEST = 'GET_ALL_USER_WORKOUTS_REQUEST'
export const getAllUserWorkoutsRequest = (id) => {
  return {
    type: GET_ALL_USER_WORKOUTS_REQUEST,
    id,
  }
}

export const GET_ALL_USER_WORKOUTS_SUCCESS = 'GET_ALL_USER_WORKOUTS_SUCCESS'
export const getAllUserWorkoutsSuccess = (id, response) => {
  return {
    type: GET_ALL_USER_WORKOUTS_SUCCESS,
    id,
    response
  }
}

export const GET_ALL_USER_WORKOUTS_FAILURE = 'GET_ALL_USER_WORKOUTS_SUCCESS'
export const getAllUserWorkoutsFailure = (id) => {
  return {
    type: GET_ALL_USER_WORKOUTS_FAILURE,
    id,
  }
}

export const getAllUserWorkouts = (id) => (dispatch) => {
  dispatch(getAllUserWorkoutsRequest(id))
  return workoutsAPI.getAllUserWorkouts(id).then((response) => {
    const normalizedResponse = normalize(response.Items, workoutsAPI.arrayOfWorkouts)
    console.log(response); 
    console.log(response.Items); 
    console.log(
      'normalized response', 
      normalizedResponse
    ); 

    dispatch(getAllUserWorkoutsSuccess(id, normalizedResponse))
    }).catch((err) => {
      console.log(err); 
    }); 
}

const isObjectEmpty = (object) => {
  return !Object.keys(object).length 
}

function shouldGetUserWorkouts(state) {
  const userWorkouts = state.user.templates
  if (isObjectEmpty(userWorkouts.items)) {
    return true
  } else if (userWorkouts.isFetching) {
    return false
  } else {
    return userWorkouts.isValid
  }
}

export const getAllUserTemplatesConditional = (id) => (dispatch, getState) => {
  if (shouldGetUserWorkouts(getState(), id)) {
    return dispatch(getAllUserWorkouts(id))
  }
}