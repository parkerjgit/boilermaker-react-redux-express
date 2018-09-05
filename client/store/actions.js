import TYPES from './types'

const setProjects = (projects) => ({
  type: TYPES.PROJECTS.SET,
  projects
})
const setLoading = (loading) => ({
  type: TYPES.PROJECTS.LOADING,
  loading
})
const setError = (error) => ({
  type: TYPES.PROJECTS.LOADING,
  error
})

const addTask = (task) => ({
  type: TYPES.TASKS.ADD,
  task
})

const setTasks = (project, tasks) => ({
  type: TYPES.TASKS.SET,
  project,
  tasks
})

export {
  setProjects,
  setLoading,
  setError,
  setTasks,
  addTask
}
