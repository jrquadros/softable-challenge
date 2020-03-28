import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Home } from './pages/Home'
import { StartupInfo } from './pages/StartupInfo'
import { Results } from './pages/Results'

export function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/startup/:id" component={StartupInfo} />
        <Route path="/results/" component={Results} />
        <Route path="/" render={() => <Home />} />
      </Switch>
    </BrowserRouter>
  )
}
