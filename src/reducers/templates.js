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