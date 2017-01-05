import * as plansAPI from '../api/userWeeklyPlans'
import { normalize } from 'normalizr'
import { v4 } from 'uuid'

import { 
  GET_ALL_USER_PLANS_REQUEST, 
  GET_ALL_USER_PLANS_SUCCESS, 
  GET_ALL_USER_PLANS_FAILURE,
  PUT_NEW_USER_PLAN_REQUEST,
  PUT_NEW_USER_PLAN_SUCCESS,
  PUT_NEW_USER_PLAN_FAILURE,
  UPDATE_USER_PLAN_REQUEST,
  UPDATE_USER_PLAN_SUCCESS,
  UPDATE_USER_PLAN_FAILURE
} from '../constants/ActionTypes'

export const getAllUserPlansRequest = (id) => {
  return {
    type: GET_ALL_USER_PLANS_REQUEST,
    id,
  }
}

export const getAllUserPlansSuccess = (id, response) => {
  return {
    type: GET_ALL_USER_PLANS_SUCCESS,
    id,
    response,
  }
}

export const getAllUserPlansFailure = (id) => {
  return {
    type: GET_ALL_USER_PLANS_FAILURE,
    id,
  }
}

export const getAllUserPlans = (id) => (dispatch) => {
  dispatch(getAllUserPlansRequest(id))
  return plansAPI.getAllUserPlans(id).then((response) => {
    const normalizedResponse = normalize(response.Items, plansAPI.arrayOfPlans)
    console.log(response); 
    console.log(response.Items); 
    console.log(
      'normalized response', 
      normalizedResponse
    ); 
    dispatch(getAllUserPlansSuccess(id, normalizedResponse))
  }).catch((err) => {
    console.log(err); 
  }); 
}

function shouldGetUserPlans(state) {
  const userPlans = state.user.plans
  if (!userPlans || !userPlans.items) {
    return true
  } else if (userPlans.isFetching) {
    return false
  } else {
    return !userPlans.isValid
  }
}

export const getAllUserPlansConditional = (id) => (dispatch, getState) => {
  if (shouldGetUserPlans(getState(), id)) {
    return dispatch(getAllUserPlans(id))
  }
}


export const putNewUserPlanRequest = () => {
  return {
    type: PUT_NEW_USER_PLAN_REQUEST,
  }
}

export const putNewUserPlanSuccess = (response) => {
  return {
    type: PUT_NEW_USER_PLAN_SUCCESS,
    response
  }
}

export const putNewPlanFailure = (error) => {
  return {
    type: PUT_NEW_USER_PLAN_FAILURE,
    error
  }
}

export const putNewUserPlan = (userID, weeklyPlanID, weeklyPlanName, planTemplates) => (dispatch) => {
  dispatch(putNewUserPlanRequest())
  return plansAPI.putNewUserPlan(userID, weeklyPlanID, weeklyPlanName, planTemplates).then((response) => {
    const normalizedResponse = normalize(response.Attributes, plansAPI.plan)
    console.log('RESPONSE\n')
    console.log(response); 
    console.log(
      'normalized response', 
      normalizedResponse
    ); 
    dispatch(putNewUserPlanSuccess(normalizedResponse))
  }).catch((err) => {
    console.log(err); 
  }); 
}

export const updateUserPlanRequest = () => {
  return {
    type: UPDATE_USER_PLAN_REQUEST,
  }
}

export const updateUserPlanSuccess = (response) => {
  return {
    type: UPDATE_USER_PLAN_SUCCESS,
    response
  }
}

export const updatePlanFailure = (error) => {
  return {
    type: UPDATE_USER_PLAN_FAILURE,
    error
  }
}

export const updateUserPlan = (userID, weeklyPlanID, weeklyPlanName, planTemplates) => (dispatch) => {
  dispatch(updateUserPlanRequest())
  return plansAPI.updateUserPlan(userID, weeklyPlanID, weeklyPlanName, planTemplates).then((response) => {
    const normalizedResponse = normalize(response.Attributes, plansAPI.plan)
    console.log('RESPONSE\n')
    console.log(response); 
    console.log(
      'normalized response', 
      normalizedResponse
    ); 
    dispatch(updateUserPlanSuccess(normalizedResponse))
  }).catch((err) => {
    console.log(err); 
  }); 
}

export const putBlankUserPlan = (userID, weeklyPlanName) => (dispatch) => {
  dispatch(putNewUserPlanRequest())
  const weeklyPlanID = v4(); 
  return plansAPI.putBlankUserPlan(userID, weeklyPlanID, weeklyPlanName).then((response) => {
    const normalizedResponse = normalize(response.Attributes, plansAPI.plan)
    console.log('RESPONSE\n')
    console.log(response); 
    console.log(
      'normalized response', 
      normalizedResponse
    ); 
    dispatch(putNewUserPlanSuccess(normalizedResponse))
  }).catch((err) => {
    console.log(err); 
  }); 
}