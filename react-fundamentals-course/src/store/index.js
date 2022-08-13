import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './saga';
import { rootReducer } from './rootReducer';

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware]

const store = compose(applyMiddleware(...middleware))(createStore)(rootReducer);

sagaMiddleware.run(rootSaga)

export default store