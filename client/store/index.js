import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import logger from 'redux-logger'
import axios from 'axios';
// import socket from './socket'

// STATE
const init_state = {
  projects: [],
  loading: false,
  error: false
}

// ACTIONS
const ACTIONS = {
  PROJECTS: {
    SET: 0,
    ADD: 1,
    FETCH: 2,
    LOADING: 3,
    ERROR: 4
  }
}

// ACTION/THUNK CREATORS (export these)
export const setProjects = (projects) => ({
  type: ACTIONS.PROJECTS.SET,
  projects
})
export const setLoading = (loading) => ({
  type: ACTIONS.PROJECTS.LOADING,
  loading
})
export const setError = (error) => ({
  type: ACTIONS.PROJECTS.LOADING,
  error
})

export const fetchProjects = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const {data: projects} = await axios.get('/api/projects');
    dispatch(setProjects(projects))
    dispatch(setLoading(false))
  } catch (error) {
    dispatch(setError(true))
  }
}

// export const addProject = (project) => async (dispatch) => {
//   const res = axios('api/projects')
// }

// REDUCER
const reducer = (state = init_state, action) => {
  console.log(`--- reducing: ${JSON.stringify(action)}`)
  if (action.type === ACTIONS.PROJECTS.SET) {
    console.log(action)
    return {
      ...state,
      projects: action.projects,
      loading: false
    }
  } else if (action.type === ACTIONS.PROJECTS.ADD) {
    return {
      ...state,
      projects: [...state.projects, action.project]
    }
  } else if (action.type === ACTIONS.PROJECTS.LOADING) {
    return {
      ...state,
      loading: action.loading
    }
  } else if (action.type === ACTIONS.PROJECTS.ERROR) {
    return {
      ...state,
      error: action.error
    }
  }
  return state
}

export default createStore(
  reducer,
  applyMiddleware(thunkMiddleware, logger));
