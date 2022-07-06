import { put, takeLeading } from 'redux-saga/effects';
import axiosInstance from '../AxiosConfig';
import coursesAction from './actions';
import actionType from './types';

function* getCoursesGenerator() {
    try {
        const resp = yield getCourses();
        console.log('Course List: ', resp)
        yield put(coursesAction.getCourseListSuccess(resp.data.result, 'SUCCESS'));
        console.log('CourseList status: good', resp.data.result)
    } catch (error) {
        console.log('Courses saga error: ', error);
        yield put(coursesAction.getCourseListFailure(error, 'ERROR'));
    }
}

const getCourses = async () => {
    return (
        axiosInstance.get('/courses/all')
    );
};

export function* watchCoursesSaga() {
    yield takeLeading(actionType.GET_COURSE_LIST, getCoursesGenerator);
}

function* getCourseDetailGenerator({ payload }) {
    console.log('Course Detail: ', payload.data)
    try {
        const resp = yield getCourseDetail(payload.data)
        yield put(coursesAction.getCourseDetailSuccess(resp.data.result, 'SUCCESS'))
        console.log('Course Detail: ', resp.data.result)
    } catch (error) {
        console.log('CourseDetail saga error: ', error);
        yield put(coursesAction.getCourseDetailFailure(error, 'ERROR'));
    }
}

const getCourseDetail = async (id) => {
    return (
        axiosInstance.get(`/courses/${id}`)
    )
}

export function* watchCourseDetailSaga() {
    yield takeLeading(actionType.GET_COURSE_DETAIL, getCourseDetailGenerator)
}

function* createNewCourseGenerator({ payload }) {
    console.log('New Course: ', payload.data)
    try {
        yield createNewCourse(payload.data)
        const resp = yield getCourses();
        yield put(coursesAction.postNewCourseSuccess(resp.data.result, 'SUCCESS'))
        console.log('New Course List: ', resp.data.result)
    } catch (error) {
        console.log('New Course saga error: ', error);
        yield put(coursesAction.postNewCourseFailure(error, 'ERROR'));
    }
}

const createNewCourse = async (newCourse) => {
    return (
        axiosInstance.post(`/courses/add`, newCourse, {
            headers: { Authorization: `${localStorage.token}` },
        })
    )
}

export function* watchNewCourseSaga() {
    yield takeLeading(actionType.POST_NEW_COURSE, createNewCourseGenerator)
}


function* deleteCourseGenerator({ payload }) {
    console.log('delete Course generator', payload.data)
    try {
        yield deleteCourse(payload.data);
        const resp = yield getCourses();
        yield put(coursesAction.deleteCourseSuccess(resp.data.result, 'SUCCESS'));
        console.log('Delete Course saga status: good', resp.data.result)
    } catch (error) {
        console.log('Delete Course saga error: ', error);
        yield put(coursesAction.deleteCourseFailure(error, 'ERROR'));
    }
}

const deleteCourse = async (courseId) => {
    return (
        axiosInstance.delete(`/courses/${courseId}`, {
            headers: { Authorization: `${localStorage.token}` },
        })
    );
};

export function* watchDeleteCourseSaga() {
    yield takeLeading(actionType.DELETE_COURSE, deleteCourseGenerator);
}

function* updateCourseGenerator({ payload }) {
    console.log('Update Course generator id', payload.id)
    console.log('Update Course generator data', payload.data)
    try {
        yield updateCourse(payload.id, payload.data);
        const resp = yield getCourses();
        yield put(coursesAction.updateCourseSuccess(resp.data.result, 'SUCCESS'));
        console.log('Update Course saga status: good', resp.data.result)
    } catch (error) {
        console.log('Update Course saga error: ', error);
        yield put(coursesAction.updateCourseFailure(error, 'ERROR'));
    }
}

const updateCourse = async (courseId, courseDetails) => {
    return (
        axiosInstance.put(`/courses/${courseId}`, courseDetails, {
            headers: { Authorization: `${localStorage.token}` },
        })
    );
};

export function* watchUpdateCourseSaga() {
    yield takeLeading(actionType.UPDATE_COURSE, updateCourseGenerator);
}