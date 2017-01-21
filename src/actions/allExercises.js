import { v4 } from 'uuid'
import { normalize } from 'normalizr'
import * as allExercisesAPI from '../api/allExercises'
import { addExercise } from './templates'

import { 
  SEARCH_ALL_EXERCISES_REQUEST, 
  SEARCH_ALL_EXERCISES_SUCCESS, 
  SEARCH_ALL_EXERCISES_FAILURE,
  PUT_NEW_EXERCISE_REQUEST,
  PUT_NEW_EXERCISE_SUCCESS,
  PUT_NEW_EXERCISE_FAILURE,
} from '../constants/ActionTypes'


export const searchAllExercisesRequest = (id) => {
  return {
    type: SEARCH_ALL_EXERCISES_REQUEST,
    id,
  }
}

export const searchAllExercisesSuccess = (id, response) => {
  return {
    type: SEARCH_ALL_EXERCISES_SUCCESS,
    id,
    response,
  }
}

export const searchAllUserExercisesFailure = (id) => {
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

function shouldSearchAllExercises(state) {
  const allExercises = state.allExercises;
 if (allExercises.isFetching) {
    return false;
  } else {
    return true;
  }
}

export const searchAllExercisesConditional = (id) => (dispatch, getState) => {
  if (shouldSearchAllExercises(getState(), id)) {
    return dispatch(searchAllExercises(id))
  }
}

export const putNewExerciseRequest = (id, exerciseName) => {
  return {
    type: PUT_NEW_EXERCISE_REQUEST,
    id, 
    exerciseName
  }
}

export const putNewExerciseSuccess = (response) => {
  return {
    type: PUT_NEW_EXERCISE_SUCCESS,
    response
  }
}

export const putNewExerciseFailure = (exerciseName) => {
  return {
    type: PUT_NEW_EXERCISE_FAILURE,
    exerciseName
  }
}

export const putNewExercise = (exerciseName) => (dispatch) => {
  const id = v4(); 
  dispatch(putNewExerciseRequest(id, exerciseName))
  return allExercisesAPI.putNewExercise(id, exerciseName).then((response) => {
    // console.log(response); 
    // console.log(response.Attributes); 
    const exercise = response.Attributes; 
    const { exerciseID, exerciseName } = exercise; 
    const normalizedResponse = normalize(exercise, allExercisesAPI.exercise)
    console.log(
      'normalized response', 
      normalizedResponse
    ); 
    dispatch(putNewExerciseSuccess(normalizedResponse))
    dispatch(addExercise(exerciseID, exerciseName)); 
  }).catch((err) => {
    console.log(err); 
  }); 
}

