import { CREATE_WEEKLY_PLAN, SAVE_WEEKLY_PLAN, ADD_TEMPLATE } from '../constants/ActionTypes'

const templates = (state = {}, action) => {
  switch (action.type) {
    case ADD_TEMPLATE: 
      return {
        ...state,
        [`${action.day}`]: action.templateID
      }
    default: 
      return state 
  }
}

const weeklyPlan = (state = {}, action ) => {
  switch (action.type) {
    case CREATE_WEEKLY_PLAN:
      return {
        userID: action.userID,
        weeklyPlanID: action.id,
        templates: {
          Day1: null,
          Day2: null,
          Day3: null,
          Day4: null,
          Day5: null,
          Day6: null,
          Day7: null,
        },
      }
    case ADD_TEMPLATE: 
      return {
        ...state,
        templates: templates(state.templates, action)
      }
    default: 
      return state
  }
} 

export default weeklyPlan