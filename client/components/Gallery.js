import React from 'react'
import {connect} from 'react-redux'
import {setProjects, fetchProjects} from '../store'

class Gallery extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    // this.props.setProjects([{name: 'project3'}]);
    this.props.fetchProjects();
  }
  render() {
    console.log(`--- rendering with props: ${JSON.stringify(this.props)}`)

    if (this.props.projects.length === 0) return null;

    return (
    <div>
      <div>I'm a gallery</div>
      {this.props.projects.map(project => (
        <div>I'm {project.name}</div>
      ))}
    </div>
  )}
}

// Map state to props (getters)
const mapState = state => ({
  projects: state.projects,
  loading: state.loading
})

// Map action(dispatch) to props (setters and queries)
const mapDispatch = dispatch => ({
  setProjects: (projects) => dispatch(setProjects(projects)),
  fetchProjects: () => dispatch(fetchProjects())
})

export default connect(mapState, mapDispatch)(Gallery);
