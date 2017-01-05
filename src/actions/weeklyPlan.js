import { CREATE_WEEKLY_PLAN, SAVE_WEEKLY_PLAN, ADD_TEMPLATE } from '../constants/ActionTypes'
import { v4 } from 'uuid'

export const createWeeklyPlan = (userID) => {
  return {
    type: CREATE_WEEKLY_PLAN,
    id: v4(),
    userID, 
  }
}

export const saveWeeklyPlan = (weeklyPlanID, weeklyPlan) => {
  return {
    type: SAVE_WEEKLY_PLAN,
    weeklyPlanID,
    weeklyPlan,
  }
}

export const addTemplateToWeeklyPlan = (templateID, day) => {
  return {
    type: ADD_TEMPLATE,
    templateID,
    day,
  }
}