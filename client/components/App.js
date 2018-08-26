import React from 'react';
import {Projects} from '../components'
import {HashRouter as Router, Route, Link} from 'react-router-dom'

const App = () => {
  return (
    <Router>
      <div id="main">
        <Route path="/" component={Projects} />
      </div>
    </Router>
  )
}

export default App;
