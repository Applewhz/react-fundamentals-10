import actionType from "./types";

const initialState = {
    courseList: [],
    courseDetail: [],
    loading: false,
    error: null,
    createNewCourseStatus: false,
    isUpdated: true,
    isDeleted: false,
};

const coursesReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.GET_COURSE_LIST:
            return {
                ...state,
                loading: true,
                isDeleted: false,
            };
        case actionType.GET_COURSE_LIST_SUCCESS:
            return {
                ...state,
                courseList: action.payload.data,
                loading: false,
            };
        case actionType.GET_COURSE_LIST_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case actionType.GET_COURSE_DETAIL:
            return {
                ...state,
                loading: true,
            };
        case actionType.GET_COURSE_DETAIL_SUCCESS:
            return {
                ...state,
                courseDetail: action.payload.data,
                loading: false,
            };
        case actionType.GET_COURSES_DETAIL_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case actionType.CREATE_NEW_COURSE:
            return {
                ...state,
                createNewCourseStatus: false,
            };
        case actionType.POST_NEW_COURSE:
            return {
                ...state,
                loading: true,
            };
        case actionType.POST_NEW_COURSE_SUCCESS:
            return {
                ...state,
                courseList: action.payload.data,
                loading: false,
                createNewCourseStatus: true,
            };
        case actionType.POST_NEW_COURSE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case actionType.DELETE_COURSE:
            return {
                ...state,
                loading: true,
            };
        case actionType.DELETE_COURSE_SUCCESS:
            return {
                ...state,
                courseList: action.payload.data,
                isDeleted: true,
                loading: false,
            };
        case actionType.DELETE_COURSE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case actionType.UPDATE_CURRENT_COURSE:
            return {
                ...state,
                isUpdated: false,
            };
        case actionType.UPDATE_COURSE:
            return {
                ...state,
                loading: true,
            };
        case actionType.UPDATE_COURSE_SUCCESS:
            return {
                ...state,
                courseList: action.payload.data,
                isUpdated: true,
                loading: false,
            };
        case actionType.UPDATE_COURSE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return {
                ...state,
            };
    }
};

export default coursesReducer;