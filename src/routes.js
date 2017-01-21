import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './components/App'
import LandingPage from './containers/LandingPage'
import LandingPage2 from './containers/LandingPage2'
import UserProfile from './containers/UserProfile/UserProfile'
import Template from './containers/Template/Template'
import Workout from './containers/Workout/Workout'
import Results from './containers/Performance/Results'
import Performance from './containers/Performance/Performance'
import Planner from './containers/Planner/WeeklyPlanner'
import Export from './containers/Planner/Export'

export default <Route path="/" component={App}>
  <IndexRoute component={UserProfile}/>
  <Route path="/User(/:username)"
         component={UserProfile} />
  <Route path="/Template(/:username)"
         component={Template} />
  <Route path="/Workout(/:username)"
         component={Workout} />
  <Route path="/Results(/:workoutID)"
         component={Results} />
  <Route path="/Performance(/:userID)"
         component={Performance} />
  <Route path="/Planner(/:planID)"
         component={Planner} />
  <Route path="/Export(/:planID)"
         component={Export} />
  <Route path="/Landing(/:planID)"
         component={LandingPage2} />
</Route>
