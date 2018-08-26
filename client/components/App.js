import React from 'react';
// import Gallery from './Gallery'
import {Gallery} from '../components'
import {HashRouter as Router, Route, Link} from 'react-router-dom'

const App = () => {
  return (
    <Router>
      <div id="main">
        {/* <Gallery /> */}
        <Route path="/" component={Gallery} />
      </div>
    </Router>
  )
}

export default App;
