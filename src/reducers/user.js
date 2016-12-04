var profile = {
  workouts: [],
  templates: [], 
}

const user = (state = profile, action) => {
  switch (action.type) {
    case 'LOGIN_USER':
      return {
        ...state,
        loggedIn: true,
        id: action.id,
        username: action.username,
        workouts: [], 
        templates: []
      }
      default:
        return state
    }
  }

export default user