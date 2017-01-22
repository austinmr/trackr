// CONSTANTS 
import { 
  GET_ALL_USER_PROGRAMS_REQUEST, 
  GET_ALL_USER_PROGRAMS_SUCCESS, 
  GET_ALL_USER_PROGRAMS_FAILURE,
  PUT_NEW_USER_PROGRAM_REQUEST,
  PUT_NEW_USER_PROGRAM_SUCCESS,
  PUT_NEW_USER_PROGRAM_FAILURE,
  UPDATE_USER_PROGRAM_REQUEST,
  UPDATE_USER_PROGRAM_SUCCESS,
  UPDATE_USER_PROGRAM_FAILURE
} from '../constants/ActionTypes'

// APIs + MIDDLEWARE
import * as programsAPI from '../api/userPrograms'

// DEPENDENCIES
import { normalize } from 'normalizr'
import { v4 } from 'uuid'


////////////////////////////////////////////////////////////////////////////////
////////////// GET ALL USER PROGRAMS
export const getAllUserProgramsRequest = (id) => {
  return {
    type: GET_ALL_USER_PROGRAMS_REQUEST,
    id,
  }
}

export const getAllUserProgramsSuccess = (id, response) => {
  return {
    type: GET_ALL_USER_PROGRAMS_SUCCESS,
    id,
    response,
  }
}

export const getAllUserProgramsFailure = (id) => {
  return {
    type: GET_ALL_USER_PROGRAMS_FAILURE,
    id,
  }
}

export const getAllUserPrograms = (id) => (dispatch) => {
  dispatch(getAllUserProgramsRequest(id))
  return programsAPI.getAllUserPrograms(id).then((response) => {
    const normalizedResponse = normalize(response.Items, programsAPI.arrayOfPrograms)
    console.log(response); 
    console.log(response.Items); 
    console.log(
      'normalized response', 
      normalizedResponse
    ); 
    dispatch(getAllUserProgramsSuccess(id, normalizedResponse))
  }).catch((err) => {
    console.log(err); 
  }); 
}

function shouldGetUserPrograms(state) {
  const userPrograms = state.user.programs
  if (!userPrograms || !userPrograms.items) {
    return true
  } else if (userPrograms.isFetching) {
    return false
  } else {
    return !userPrograms.isValid
  }
}

export const getAllUserProgramsConditional = (id) => (dispatch, getState) => {
  if (shouldGetUserPrograms(getState(), id)) {
    return dispatch(getAllUserPrograms(id))
  }
}


export const putNewUserProgramRequest = () => {
  return {
    type: PUT_NEW_USER_PROGRAM_REQUEST,
  }
}

export const putNewUserProgramSuccess = (response) => {
  return {
    type: PUT_NEW_USER_PROGRAM_SUCCESS,
    response
  }
}

export const putNewProgramFailure = (error) => {
  return {
    type: PUT_NEW_USER_PROGRAM_FAILURE,
    error
  }
}

export const putNewUserProgram = (userID, programID, programName, programTemplates) => (dispatch) => {
  dispatch(putNewUserProgramRequest())
  return programsAPI.putNewUserProgram(userID, programID, programName, programTemplates).then((response) => {
    const normalizedResponse = normalize(response.Attributes, programsAPI.program)
    console.log('RESPONSE\n')
    console.log(response); 
    console.log(
      'normalized response', 
      normalizedResponse
    ); 
    dispatch(putNewUserProgramSuccess(normalizedResponse))
  }).catch((err) => {
    console.log(err); 
  }); 
}

export const updateUserProgramRequest = () => {
  return {
    type: UPDATE_USER_PROGRAM_REQUEST,
  }
}

export const updateUserProgramSuccess = (response) => {
  return {
    type: UPDATE_USER_PROGRAM_SUCCESS,
    response
  }
}

export const updateProgramFailure = (error) => {
  return {
    type: UPDATE_USER_PROGRAM_FAILURE,
    error
  }
}

export const updateUserProgram = (userID, programID, programName, programTemplates) => (dispatch) => {
  dispatch(updateUserProgramRequest())
  return programsAPI.updateUserProgram(userID, programID, programName, programTemplates).then((response) => {
    const normalizedResponse = normalize(response.Attributes, programsAPI.program)
    console.log('RESPONSE\n')
    console.log(response); 
    console.log(
      'normalized response', 
      normalizedResponse
    ); 
    dispatch(updateUserProgramSuccess(normalizedResponse))
  }).catch((err) => {
    console.log(err); 
  }); 
}

export const putBlankUserProgram = (userID, programName) => (dispatch) => {
  dispatch(putNewUserProgramRequest())
  const programID = v4(); 
  return programsAPI.putBlankUserProgram(userID, programID, programName).then((response) => {
    const normalizedResponse = normalize(response.Attributes, programsAPI.program)
    console.log('RESPONSE\n')
    console.log(response); 
    console.log(
      'normalized response', 
      normalizedResponse
    ); 
    dispatch(putNewUserProgramSuccess(normalizedResponse))
  }).catch((err) => {
    console.log(err); 
  }); 
}