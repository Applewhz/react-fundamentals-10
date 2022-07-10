import { put, takeLeading } from 'redux-saga/effects';
import axiosInstance from '../AxiosConfig';
import authorsAction from './actions';
import actionType from './types';

function* getAuthorListGenerator() {
    try {
        const resp = yield getAuthorList();
        yield put(authorsAction.getAuthorListSuccess(resp.data.result, 'SUCCESS'));
        // console.log('get Author List status: good', resp.data.result)
    } catch (error) {
        console.log('Authors saga error: ', error);
        yield put(authorsAction.getAuthorListFailure(error, 'ERROR'));
    }
}

const getAuthorList = async () => {
    return (
        axiosInstance.get('/authors/all')
    );
};

export function* watchAuthorsSaga() {
    yield takeLeading(actionType.GET_AUTHOR_LIST, getAuthorListGenerator);
}

function* createNewAuthorGenerator({ payload }) {
    console.log('creating new author generator', payload.name)
    try {
        yield createNewAuthor(payload.name);
        const resp = yield getAuthorList();
        yield put(authorsAction.postNewAuthorSuccess(resp.data.result, 'SUCCESS'));
        console.log('new Author List status: good', resp.data.result)
    } catch (error) {
        console.log('Authors saga error: ', error);
        yield put(authorsAction.postNewAuthorFailure(error, 'ERROR'));
    }
}

const createNewAuthor = async (newAuthor) => {
    console.log('IN CREATE AUTHOR', localStorage.token)
    return (
        axiosInstance.post('/authors/add', newAuthor, {
            headers: { Authorization: `${localStorage.token}` },
        })
    );
};

export function* watchNewAuthorSaga() {
    yield takeLeading(actionType.CREATE_NEW_AUTHOR, createNewAuthorGenerator);
}

function* deleteAuthorGenerator({ payload }) {
    // console.log('delete author generator', payload.data)
    try {
        yield deleteAuthor(payload.data);
        const resp = yield getAuthorList();
        yield put(authorsAction.deleteAuthorSuccess(resp.data.result, 'SUCCESS'));
        console.log('delete status: good', resp.data.result)
    } catch (error) {
        console.log('Delete Author saga error: ', error);
        yield put(authorsAction.deleteAuthorFailure(error, 'ERROR'));
    }
}

const deleteAuthor = async (authorId) => {
    return (
        axiosInstance.delete(`/authors/${authorId}`, {
            headers: { Authorization: `${localStorage.token}` },
        })
    );
};

export function* watchDeleteAuthorSaga() {
    yield takeLeading(actionType.DELETE_AUTHOR, deleteAuthorGenerator);
}