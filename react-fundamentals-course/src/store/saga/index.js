import { all } from 'redux-saga/effects'
import { watchUserRegistrationSaga, watchUserLoginSaga, watchUserDetailsSaga, watchUserLogoutSaga } from '../users/saga'
import { watchCoursesSaga, watchCourseDetailSaga, watchNewCourseSaga, watchDeleteCourseSaga, watchUpdateCourseSaga } from '../courses/saga'
import { watchAuthorsSaga, watchNewAuthorSaga, watchDeleteAuthorSaga } from '../authors/saga'

export default function* rootSaga() {
    yield all([
        watchUserRegistrationSaga(),
        watchUserLoginSaga(),
        watchCoursesSaga(),
        watchCourseDetailSaga(),
        watchNewCourseSaga(),
        watchAuthorsSaga(),
        watchNewAuthorSaga(),
        watchDeleteAuthorSaga(),
        watchUserDetailsSaga(),
        watchDeleteCourseSaga(),
        watchUpdateCourseSaga(),
        watchUserLogoutSaga()
    ])
}