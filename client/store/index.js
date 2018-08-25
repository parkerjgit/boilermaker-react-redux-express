import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import logger from 'redux-logger'
import axios from 'axios';
// import socket from './socket'


// STATE
const init_state = {
  projects: [],
  loading: true
}

// ACTIONS
const ACTIONS = {
  PROJECTS: {
    SET: 0,
    ADD: 1,
    FETCH: 2
  }
}

// ACTION/THUNK CREATORS (export these)
export const setProjects = (projects) => ({
  type: ACTIONS.PROJECTS.SET,
  projects
})

export const fetchProjects = () => async (dispatch) => {
  const {data: projects} = await axios.get('/api/projects');
  dispatch(setProjects(projects))
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
      projects: [...state.projects, action.project],
      loading: false
    }
  }
  return state
}

export default createStore(
  reducer,
  applyMiddleware(thunkMiddleware, logger));
