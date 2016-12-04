import { createStore} from 'redux'
import throttle from 'lodash/throttle'
import reducer from '../reducers/root'
import { loadState, saveState } from './localStorage'

const addLoggingToDispatch = (store) => {
  const rawDispatch = store.dispatch; 
  return (action) => {
    console.group(action.type);
    console.log('%c prev state', 'color:gray', store.getState());
    console.log('%c action', 'color:blue', action);
    const returnValue = rawDispatch(action); 
    console.log('%c next state', 'color:green', store.getState()); 
    console.groupEnd(action.type); 
    return returnValue; 
  }
}
 
const configureStore = () => {
  const preloadedState = loadState(); 
  const store = createStore(reducer, preloadedState)
  store.dispatch = addLoggingToDispatch(store);
  store.subscribe(throttle(() => {
    saveState(store.getState()); 
  }, 1000));

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }
  
  return store; 
}

export default configureStore
