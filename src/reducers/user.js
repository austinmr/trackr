var profile = {
  loggedIn: false,
  workouts: [],
  templates: [], 
}

const user = (state = profile, action) => {
  switch (action.type) {
    case 'LOGIN_USER':
      return {
        ...state,
        id: action.id,
        username: action.username,
        loggedIn: true,
        workouts: [], 
        templates: []
      }
      default:
        return state
    }
  }

export default user