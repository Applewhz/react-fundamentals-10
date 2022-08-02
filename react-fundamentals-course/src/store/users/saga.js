import { put, takeLeading } from 'redux-saga/effects';
import axiosInstance from '../AxiosConfig';
import userAction from './actions';
import actionType from './types';

function* addNewUserGenerator({ payload }) {
    console.log(payload)
    try {
        const resp = yield postUserRegistrationDetails(payload.data);
        yield put(userAction.addNewUserSuccess(resp.successful, 'SUCCESS'));
        console.log('add New status: good')
    } catch (error) {
        console.log('addNewUser saga error: ', error);
        yield put(userAction.addNewUserFailure(error, 'ERROR'));
    }
}

const postUserRegistrationDetails = async (newUserDetails) => {
    return (
        axiosInstance.post('/register', newUserDetails)
    );
};

export function* watchUserRegistrationSaga() {
    yield takeLeading(actionType.ADD_NEW_USER, addNewUserGenerator);
}

function* userLoginGenerator({ payload }) {
    // console.log(payload.data)
    try {
        const resp = yield postUserLoginDetails(payload.data)
        yield put(userAction.userLoginSuccess(resp.data, 'SUCCESS'))
        console.log('SUCCESS!!!!', resp)
        // console.log('over here', resp.data)
        // console.log('in UserLogin saga: ', resp.data.user)
    } catch (error) {
        // console.log('userLogin saga error: ', error);
        yield put(userAction.userLoginFailure(error, 'ERROR'));
    }
}

const postUserLoginDetails = async (userDetails) => {
    return (
        axiosInstance.post('/login', userDetails)
    )
}

export function* watchUserLoginSaga() {
    yield takeLeading(actionType.USER_LOGIN, userLoginGenerator)
}

function* userLogoutGenerator() {
    try {
        yield postUserLogout(localStorage.token)
        yield put(userAction.logout())
        localStorage.clear()
    } catch (error) {
        yield put(userAction.userLoginFailure(error, 'ERROR'));
    }
}

const postUserLogout = async (userAuth) => {
    return (
        axiosInstance.delete('/logout', userAuth)
    )
}

export function* watchUserLogoutSaga() {
    yield takeLeading(actionType.LOGOUT, userLogoutGenerator)
}

function* userDetailsGenerator() {
    try {
        const resp = yield getUserDetails();
        console.log('User Details:', resp)
        yield put(userAction.getUserDetailsSuccess(resp.data.result, 'SUCCESS'))
        console.log('in UserDetail saga: ', resp.data.result)
    } catch (error) {
        console.log('UserDetail saga error: ', error);
        yield put(userAction.getUserDetailsFailure(error, 'ERROR'));
    }
}

const getUserDetails = async () => {
    return (
        axiosInstance.get('/users/me', {
            headers: { Authorization: `${localStorage.token}` },
        })
    )
}

export function* watchUserDetailsSaga() {
    yield takeLeading(actionType.GET_USER_DETAILS, userDetailsGenerator)
}