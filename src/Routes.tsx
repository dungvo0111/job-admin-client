import React from 'react'
import { Switch, Route } from 'react-router-dom'

import HomeView from 'pages/home/view'

const Routes = () => (
  <Switch>

    <Route exact path="/" component={HomeView} />

  </Switch>
)

export default Routes
