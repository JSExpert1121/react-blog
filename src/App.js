import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'

import configureStore from 'store/config'
import AppRouter from 'containers/router'

import './styles.scss'

const store = configureStore()

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <AppRouter />
      </Router>
    </Provider>
  )
}

export default App
