import { createStore} from 'redux'
import reducer from '../reducers/root'
 
const configureStore = () => {
  const store = createStore(reducer)
  return store; 
}

export default configureStore
