import actionType from "./types";

const coursesAction = {
    getCourseList: () => ({
        type: actionType.GET_COURSE_LIST,
    }),

    getCourseListSuccess: (data, status) => ({
        type: actionType.GET_COURSE_LIST_SUCCESS,
        payload: {
            data,
            status
        }
    }),

    getCourseListFailure: (error, status) => ({
        type: actionType.GET_COURSE_LIST_FAILURE,
        payload: {
            error,
            status
        }
    }),

    getCourseDetail: (data) => ({
        type: actionType.GET_COURSE_DETAIL,
        payload: {
            data
        }
    }),

    getCourseDetailSuccess: (data, status) => ({
        type: actionType.GET_COURSE_DETAIL_SUCCESS,
        payload: {
            data,
            status
        }
    }),

    getCourseDetailFailure: (error, status) => ({
        type: actionType.GET_COURSES_DETAIL_FAILURE,
        payload: {
            error,
            status
        }
    }),

    postNewCourse: (data) => ({
        type: actionType.POST_NEW_COURSE,
        payload: {
            data
        }
    }),

    postNewCourseSuccess: (data, status) => ({
        type: actionType.POST_NEW_COURSE_SUCCESS,
        payload: {
            data,
            status
        }
    }),

    postNewCourseFailure: (error, status) => ({
        type: actionType.POST_NEW_COURSE_FAILURE,
        payload: {
            error,
            status
        }
    }),

    createNewCourse: () => ({
        type: actionType.CREATE_NEW_COURSE
    }),

    deleteCourse: (data) => ({
        type: actionType.DELETE_COURSE,
        payload: {
            data
        },
    }),

    deleteCourseSuccess: (data, status) => ({
        type: actionType.DELETE_COURSE_SUCCESS,
        payload: {
            data,
            status
        }
    }),

    deleteCourseFailure: (error, status) => ({
        type: actionType.DELETE_COURSE_FAILURE,
        payload: {
            error,
            status
        }
    }),

    updateCurrentCourse: () => ({
        type: actionType.UPDATE_CURRENT_COURSE,
    }),

    updateCourse: (id, data) => ({
        type: actionType.UPDATE_COURSE,
        payload: {
            id,
            data
        },
    }),

    updateCourseSuccess: (data, status) => ({
        type: actionType.UPDATE_COURSE_SUCCESS,
        payload: {
            data,
            status
        }
    }),

    updateCourseFailure: (error, status) => ({
        type: actionType.UPDATE_COURSE_FAILURE,
        payload: {
            error,
            status
        }
    }),
}

export default coursesAction;