import * as templatesAPI from '../api/userTemplates'
import { normalize } from 'normalizr'


export const GET_ALL_USER_TEMPLATES_REQUEST = 'GET_ALL_USER_TEMPLATES_REQUEST'
export const getAllUserTemplatesRequest = (id) => {
  return {
    type: GET_ALL_USER_TEMPLATES_REQUEST,
    id,
  }
}

export const GET_ALL_USER_TEMPLATES_SUCCESS = 'GET_ALL_USER_TEMPLATES_SUCCESS'
export const getAllUserTemplatesSuccess = (id, response) => {
  return {
    type: GET_ALL_USER_TEMPLATES_SUCCESS,
    id,
    response,
  }
}

export const GET_ALL_USER_TEMPLATES_FAILURE = 'GET_ALL_USER_TEMPLATES_SUCCESS'
export const getAllUserTemplatesFailure = (id) => {
  return {
    type: GET_ALL_USER_TEMPLATES_FAILURE,
    id,
  }
}

export const getAllUserTemplates = (id) => (dispatch) => {
  dispatch(getAllUserTemplatesRequest(id))
  return templatesAPI.getAllUserTemplates(id).then((response) => {
    const normalizedResponse = normalize(response.Items, templatesAPI.arrayOfTemplates)
    console.log(response); 
    console.log(response.Items); 
    console.log(
      'normalized response', 
      normalizedResponse
    ); 
    dispatch(getAllUserTemplatesSuccess(id, normalizedResponse))
  }).catch((err) => {
    console.log(err); 
  }); 
}

const isObjectEmpty = (object) => {
  return !Object.keys(object).length 
}

function shouldGetUserTemplates(state) {
  const userTemplates = state.user.templates
  if (isObjectEmpty(userTemplates.items)) {
    return true
  } else if (userTemplates.isFetching) {
    return false
  } else {
    return userTemplates.isValid
  }
}

export const getAllUserTemplatesConditional = (id) => (dispatch, getState) => {
  if (shouldGetUserTemplates(getState(), id)) {
    return dispatch(getAllUserTemplates(id))
  }
}