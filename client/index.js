import './assets/index.css';
import React from 'react'
import ReactDOM from 'react-dom'
import {Root} from './components'

import { Provider } from 'react-redux'
import store from './store/index'

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('app')
)

