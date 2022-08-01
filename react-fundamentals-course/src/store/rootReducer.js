import { combineReducers } from 'redux';
import coursesReducer from './courses/reducer';
import authorsReducer from './authors/reducer';
import usersReducer from './users/reducer';

export const rootReducer = combineReducers({
    user: usersReducer,
    authors: authorsReducer,
    courses: coursesReducer
})