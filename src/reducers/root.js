import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

const app = combineReducers({
  routing,
})

export default app