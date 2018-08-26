import React from 'react'
import { connect } from 'react-redux'
import { setProjects, fetchProjects } from '../store'
import { ProjectsGallery, ProjectsList } from '../components';

class Projects extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    // this.props.setProjects([{name: 'project3'}]);
    this.props.fetchProjects();
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
      <React.Fragment>
        <ProjectsGallery projects={projects} />
        <ProjectsList projects={projects} />
      </React.Fragment>
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
  setProjects: (projects) => dispatch(setProjects(projects)),
  fetchProjects: () => dispatch(fetchProjects())
})

export default connect(mapState, mapDispatch)(Projects);
