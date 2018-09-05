import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import {createLogger} from 'redux-logger'
// import axios from 'axios';
// import socket from './socket'
import {fetchProjects, fetchTasks} from './operations'
import reducer from './reducers'

// initial state
const init_state = {
  projects: [
    {
      id: 8,
      name: 'project-1',
      tasks: [
        {name: 'task-1'},
        {name: 'task-2'},
      ]
    },
    {
      id: 9,
      name: 'project-2',
      tasks: []
    }
  ],
  // loading: false,
  // error: false
}

// 1. create store (for root component)
// This is the only thing in store/ that requires redux!!
// action, operations, and reducers are just pure fuctions !!!
export default createStore(
  reducer,
  init_state,
  applyMiddleware(
    thunkMiddleware,
    createLogger())
  );

  // 2. forward operations (api for connected components)
export {fetchProjects, fetchTasks}
