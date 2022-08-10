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
      ...store,
      user: {
          userDetails: [{
        isAuth: true,
        name: 'tester',
        email: 'tester@email.com',
        token: 'Mock token here',
        role: 'user',
      }]
    },
    })
    const {getByTestId, debug} = render(getHeader(mockUserStore))
    // const testImage = document.querySelector("img") as HTMLImageElement;
    // expect(logo.img.src).toEqual(logopath);
    getByTestId('header-logo')
    debug()
  })
})