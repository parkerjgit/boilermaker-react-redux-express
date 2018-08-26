import React from 'react'

const ProjectsGallery = (props) => {
  const { projects } = props
  return (
    <div>
        <div>I'm a gallery</div>
        {projects.map(project => (
          <div>I'm {project.name}</div>
        ))}
    </div>
  )
}

export default ProjectsGallery
