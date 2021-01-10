import React from 'react'
import { Switch, Route } from 'react-router-dom'

import HomeView from 'pages/home/view'
import JobView from 'pages/job/view'

const Routes = () => (
  <Switch>
    <Route exact path="/" component={HomeView} />
    <Route exact path="/job/:jobId" component={JobView} />
  </Switch>
)

export default Routes
