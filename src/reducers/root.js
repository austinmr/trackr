import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import user from './user'
import templates from './templates'

const app = combineReducers({
  routing,
  user,
  templates,
})

export default app