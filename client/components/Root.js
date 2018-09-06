// import React from 'react';
import {Projects} from '../components'
// import {HashRouter as Router, Route, Link} from 'react-router-dom'

// const App = () => {
//   return (
//     <Router>
//       <div id="main">
//         <Route path="/" component={Projects} />
//       </div>
//     </Router>
//   )
// }

// export default App;

// --

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'

// import Home from './Home'
import {Login, Signup} from '../components/Auth'
// import UserList from './User/UserList'
// import UserDetail from './User/UserDetail'
// import StoryList from './Story/StoryList'
// import StoryDetail from './Story/StoryDetail'
// import Navbar from './Navbar'
// import Footer from './Footer'

// import { fetchUsers } from '../redux/users'
// import { fetchStories } from '../redux/stories'
// import { fetchCurrentUser } from '../redux/auth'

/* -----------------    COMPONENT     ------------------ */

class Root extends Component {
  // componentDidMount () {
  //   this.props.fetchInitialData()
  // }
  render () {
    return (
      <Router>
        <div id='main' className='container-fluid'>
          {/* <Navbar /> */}
          {/* <Route exact path='/' component={Home} /> */}
          <Route exact path="/" component={Projects} />
          <Route path='/login' component={Login} />
          <Route path='/signup' component={Signup} />
          {/* <Route exact path='/users' component={UserList} />
          <Route path='/users/:id' component={UserDetail} />
          <Route exact path='/stories' component={StoryList} />
          <Route path='/stories/:id' component={StoryDetail} /> */}
          {/* <Footer /> */}
        </div>
      </Router>
    )
  }
}

/* -----------------    CONTAINER     ------------------ */

// const mapState = null

// const mapDispatch = dispatch => ({
//   fetchInitialData: () => {
//     dispatch(fetchUsers())
//     dispatch(fetchStories())
//     dispatch(fetchCurrentUser())
//   }
// })

// export default connect(mapState, mapDispatch)(Root)

export default Root

