import * as templatesAPI from '../api/userTemplates'
import { normalize } from 'normalizr'

import { 
  GET_ALL_USER_TEMPLATES_REQUEST, 
  GET_ALL_USER_TEMPLATES_SUCCESS, 
  GET_ALL_USER_TEMPLATES_FAILURE,
  PUT_NEW_USER_TEMPLATE_REQUEST,
  PUT_NEW_USER_TEMPLATE_SUCCESS,
  PUT_NEW_USER_TEMPLATE_FAILURE,
} from '../constants/ActionTypes'

export const getAllUserTemplatesRequest = (id) => {
  return {
    type: GET_ALL_USER_TEMPLATES_REQUEST,
    id,
  }
}

export const getAllUserTemplatesSuccess = (id, response) => {
  return {
    type: GET_ALL_USER_TEMPLATES_SUCCESS,
    id,
    response,
  }
}

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

function shouldGetUserTemplates(state) {
  const userTemplates = state.user.templates
  if (!userTemplates.items) {
    return true
  } else if (userTemplates.isFetching) {
    return false
  } else {
    return !userTemplates.isValid
  }
}

export const getAllUserTemplatesConditional = (id) => (dispatch, getState) => {
  if (shouldGetUserTemplates(getState(), id)) {
    return dispatch(getAllUserTemplates(id))
  }
}

export const putNewUserTemplateRequest = () => {
  return {
    type: PUT_NEW_USER_TEMPLATE_REQUEST,
  }
}

export const putNewUserTemplateSuccess = (response) => {
  return {
    type: PUT_NEW_USER_TEMPLATE_SUCCESS,
    response
  }
}

export const putNewTemplateFailure = (error) => {
  return {
    type: PUT_NEW_USER_TEMPLATE_FAILURE,
    error
  }
}

export const putNewUserTemplate = (userID, templateID, templateName, template, templateType, templatePlanName, templatePlanID) => (dispatch) => {
  dispatch(putNewUserTemplateRequest())
  console.log('templatePlanName in actions: ', templatePlanName); 
  return templatesAPI.putNewUserTemplate(userID, templateID, templateName, template, templateType, templatePlanName, templatePlanID).then((response) => {
    const normalizedResponse = normalize(response.Attributes, templatesAPI.template)
    console.log('RESPONSE\n')
    console.log(response); 
    console.log(
      'normalized response', 
      normalizedResponse
    ); 
    dispatch(putNewUserTemplateSuccess(normalizedResponse))
  }).catch((err) => {
    console.log(err); 
  }); 
}