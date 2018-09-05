import axios from 'axios';
import {setProjects, setLoading, setError, addTask} from './actions'

const fetchProjects = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const {data: projects} = await axios.get('/api/projects');
    dispatch(setProjects(projects))
    dispatch(setLoading(false))
  } catch (error) {
    dispatch(setError(true))
  }
}

const fetchTasks = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const {data: tasks} = await axios.get('/api/tasks');
    tasks.forEach(task => {
      dispatch(addTask(task))
    })
    dispatch(setLoading(false))
  } catch (error) {
    dispatch(setError(true))
  }
}

export {fetchProjects, fetchTasks}
