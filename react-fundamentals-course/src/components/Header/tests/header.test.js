import React from 'react'
import { cleanup, render } from '@testing-library/react'
import { Header } from '../Header.jsx'
import { Provider } from 'react-redux'
import store from '../../../store/index'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
// import configureMockStore from 'redux-mock-store'
// import createSagaMiddleware from 'redux-saga'
// import {mockSaga} from 'redux-saga-mock'

// const sagaMiddleware = createSagaMiddleware()
// const mockInitialStore = configureMockStore(sagaMiddleware)
afterEach(cleanup)
const getHeader = (mockStore) => {
  return (
    <Provider store={mockStore}>
        <Router>
            <Header />
        </Router>
    </Provider>
  )
}

describe('Header', () => {
  it('renders Header component', async () => {
    const mockUserStore = ({
      ...store
    })
    mockUserStore.getState().user.userDetails = {name: "tester" }
    localStorage.setItem('token', 'mock token')
    const {getByTestId, debug, getByText} = render(getHeader(mockUserStore))
    getByTestId('header-logo')
    getByText('tester')
    debug()
    localStorage.clear()
  })
})