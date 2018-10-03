import React from 'react'
import { Switch, Route } from 'react-router-dom'
import HomePage from '../HomePage'

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={HomePage} />
        {/* <Route path="/settings" component={Settings} /> */}
        {/* <Route path="/track/:name" component={Player} /> */}
        {/* <Route path="/practice" component={Player} /> */}
      </Switch>
    )
  }
}

export default App
