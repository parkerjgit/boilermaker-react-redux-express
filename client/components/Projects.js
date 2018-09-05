import React from 'react'
import { connect } from 'react-redux'
import { fetchProjects, fetchTasks } from '../store'
import { ProjectsGallery, ProjectsList, Navbar } from '../components';
import {HashRouter as Router, Route, Link} from 'react-router-dom'

class Projects extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    // this.props.setProjects([{name: 'project3'}]);
    this.props.fetchProjects();
    this.props.fetchTasks();
  }
  render() {
    console.log(`--- rendering ProjectGallery with props: ${JSON.stringify(this.props)}`)
    const {projects, loading, error} = this.props

    // check for loading and error states
    if (loading) {
      return <div>loading...</div>
    }
    if (error) {
      return <div>error!</div>
    }

    return (
      <Router>
        <React.Fragment>
          <Navbar />
          {/* <ProjectsGallery projects={projects} />
          <ProjectsList projects={projects} /> */}
          <Route path="/projects/gallery" render = {() => <ProjectsGallery projects={projects} />} />
          <Route path="/projects/list" render = {() => <ProjectsList projects={projects} />} />
        </React.Fragment>
      </Router>
    )
  }
}

// Map state to props (getters)
const mapState = state => ({
  projects: state.projects,
  loading: state.loading,
  error: state.error
})

// Map action(dispatch) to props (setters and queries)
const mapDispatch = dispatch => ({
  // setProjects: (projects) => dispatch(setProjects(projects)),
  fetchProjects: () => dispatch(fetchProjects()),
  fetchTasks: () => dispatch(fetchTasks()),
})

export default connect(mapState, mapDispatch)(Projects);
