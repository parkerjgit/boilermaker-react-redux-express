import TYPES from './types'
import {combineReducers} from 'redux'

// STATE

/*
                ______________
    state  --> |              |
               |   REDUCER    | --> New State
    action --> |______________|

*/

// Project reducer
const reducer = (state = {}, action) => {
  switch (action.type) {
    case TYPES.PROJECTS.SET:
      let rebuild = []
      action.projects.forEach(prj => {
        rebuild.push({
          id: prj.id,
          name: prj.name,
          tasks: []
        })
      })
      return {
        ...state,
        projects: [...state.projects, ...rebuild]
      }
    case TYPES.PROJECTS.ADD:
      return {
        ...state,
        projects: [...state.projects, action.project]
      }
    case TYPES.TASKS.ADD:
      // copy all projects
      let updated = [...state.projects];
      // add task to target project
      let [target] = updated.filter(prj => prj.id === action.task.projectId);
      target.tasks = [
        ...target.tasks,
        {
          name: action.task.name
        }
      ]
      // return copy of state with update projects
      return {
        ...state,
        projects: updated
      }
    case TYPES.PROJECTS.LOADING:
      return {
        ...state,
        loading: action.loading
      }
    case TYPES.PROJECTS.ERROR:
      return {
        ...state,
        error: action.error
      }
    default:
      return state;
  }
}

//   if (action.type === TYPES.PROJECTS.SET) {
//     console.log(action)

//   } else if (action.type === TYPES.PROJECTS.ADD) {

//   } else if (action.type === TYPES.TASKS.SET) {
//     const pid = state.projects.indexOf(action.project);
//     const projects = [].concat(
//       state.projects.slice(0,pid),
//       [...state.projects[pid], tasks: action.tasks],
//       state.projects.slice(pid+1)
//     )
//     return {
//       ...state,
//       projects
//     }
//   } else if (action.type === TYPES.PROJECTS.LOADING) {
//     return {
//       ...state,
//       loading: action.loading
//     }
//   } else if (action.type === TYPES.PROJECTS.ERROR) {
//     return {
//       ...state,
//       error: action.error
//     }
//   }
//   return state
// }


// task reducer -> [task]
const taskReducer = (state = {}, action) => {
  //console.log(`--- task reducing: ${JSON.stringify(action)}`)
  switch (action.type) {
    case TYPES.TASKS.ADD:
      let updated = [...state.projects];
      // add task to target project
      let [target] = updated.filter(prj => prj.id === action.task.projectId);
      target.tasks = [
        ...target.tasks,
        {
          name: action.task.name
        }
      ]
      // return copy of state with update projects
      return {
        ...state,
        projects: updated
      }
    default:
      return state
  }
}

//project reducer -> [project]
const projectReducer = (state = {}, action) => {
  // console.log(`-- proj reducing: ${JSON.stringify(action)}`)

  switch (action.type) {
    case TYPES.PROJECTS.SET:
      let rebuild = []
      action.projects.forEach(prj => {
        rebuild.push({
          id: prj.id,
          name: prj.name
        })
      })
      return {
        ...state,
        projects: [...state.projects, ...rebuild]
      }
    default:
      return state
  }
}

// export default combineReducers({
//   projectReducer,
//   taskReducer
// })

// export default combineReducers({
//   projects: combineReducers({
//     projectReducer,
//     tasks: taskReducer
//   }),
//   // loadingReducer,
//   // errorReducer
// })

export default reducer;
