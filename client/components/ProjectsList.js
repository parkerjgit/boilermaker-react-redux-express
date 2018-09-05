import React from 'react'

const ProjectsList = (props) => {
  const { projects } = props
  return (
    <div>
        <div>I'm a list</div>
        {projects.map(project => (
          <div>
            <div>I'm {project.name}</div>
            {/* <div>Here are my tasks: {JSON.stringify(project.tasks)}</div> */}
            <ul>
              {project.tasks.map(task => (
                <li>{task.name}</li>
              ))}
            </ul>
          </div>
        ))}
    </div>
  )
}

export default ProjectsList
