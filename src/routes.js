import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './components/App'
import LandingPage from './containers/LandingPage'
import UserProfile from './containers/UserProfile'


export default <Route path="/" component={App}>
  <IndexRoute component={LandingPage} />
  <Route path="/User(/:username)"
         component={UserProfile} />
</Route>
