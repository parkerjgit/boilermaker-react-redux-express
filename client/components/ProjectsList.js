import React from 'react'

const ProjectsList = (props) => {
  const { projects } = props
  return (
    <div>
        <div>I'm a list</div>
        {projects.map(project => (
          <div>I'm {project.name}</div>
        ))}
    </div>
  )
}

export default ProjectsList
