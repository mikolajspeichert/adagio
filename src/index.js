import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import store from './store'
import HomePage from './containers/HomePage'

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

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
)
