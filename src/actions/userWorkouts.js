import * as workoutsAPI from '../api/userWorkouts'
import { normalize } from 'normalizr'

import { 
  GET_ALL_USER_WORKOUTS_REQUEST, 
  GET_ALL_USER_WORKOUTS_SUCCESS, 
  GET_ALL_USER_WORKOUTS_FAILURE,
  PUT_NEW_USER_WORKOUT_REQUEST,
  PUT_NEW_USER_WORKOUT_SUCCESS,
  PUT_NEW_USER_WORKOUT_FAILURE,
} from '../constants/ActionTypes'

export const getAllUserWorkoutsRequest = (id) => {
  return {
    type: GET_ALL_USER_WORKOUTS_REQUEST,
    id,
  }
}

export const getAllUserWorkoutsSuccess = (id, response) => {
  return {
    type: GET_ALL_USER_WORKOUTS_SUCCESS,
    id,
    response
  }
}

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

function shouldGetUserWorkouts(state) {
  const userWorkouts = state.user.workouts
  if (!userWorkouts.items.length) {
    return true
  } else if (userWorkouts.isFetching) {
    return false
  } else {
    return !userWorkouts.isValid
  }
}

export const getAllUserWorkoutsConditional = (id) => (dispatch, getState) => {
  if (shouldGetUserWorkouts(getState(), id)) {
    return dispatch(getAllUserWorkouts(id))
  }
}

export const putNewUserWorkoutRequest = (userID, exerciseID, exerciseName, oneRepMax) => {
  return {
    type: PUT_NEW_USER_WORKOUT_REQUEST,
    userID, 
    exerciseID,
    exerciseName,
    oneRepMax,
  }
}

export const putNewUserWorkoutSuccess = (response) => {
  return {
    type: PUT_NEW_USER_WORKOUT_SUCCESS,
    response
  }
}

export const putNewUserWorkoutFailure = (userID, exerciseID, exerciseName, oneRepMax) => {
  return {
    type: PUT_NEW_USER_WORKOUT_FAILURE,
    userID, 
    exerciseID,
    exerciseName,
    oneRepMax,
  }
}

export const putNewUserWorkout = (workout) => (dispatch) => {
  dispatch(putNewUserWorkoutRequest(workout))
  return workoutsAPI.putNewUserWorkout(workout).then((response) => {
    dispatch(putNewUserWorkoutSuccess(response))
  }).catch((err) => {
    console.log(err); 
  }); 
}


