const templateSet = (state, action) => {
  switch (action.type) {
    case 'ADD_TEMPLATE_SET': 
      return [
        ...state,
        action.id,

      ]
    default: 
      return state 
  }
}

const templateExercise = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_TEMPLATE_SET': 
      if (state.id !== action.exerciseId) {
        return state
      }

      return {
        ...state,
        sets: templateSet(state.sets, action)
      }
    case 'DUPLICATE_TEMPLATE_SET': 
      if (state.id !== (action.exerciseId) ) {
        return state
      }

      return {
        ...state,
        sets: templateSet(state.sets, action)
      }
    default: 
      return state 
  }
}

const templateExercises = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TEMPLATE_EXERCISE':
      return [
        ...state, 
        {
        id: action.id, 
        exercise: action.exercise, 
        sets: []
        }
      ]
    case 'ADD_TEMPLATE_SET':
      return state.map(e => templateExercise(e, action))
    default: 
      return state
  }
}

const templates = (state = {}, action ) => {
  switch (action.type) {
    case 'CREATE_TEMPLATE':
      return {
        id: action.id,
        username: action.username,
        date: action.date,
        exercises: [],
      }
    default: 
      return state
  }
} 

export default templates