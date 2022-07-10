import actionType from "./types";

const initialState = {
    users: [],
    userDetails: [],
    token: "",
    isAuth: false,
    infoRetrieved: false,
    loading: false,
    error: null,
    isCreated: false,
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.LOGIN:
            return {
                ...state,
                isAuth: true,
            };
        case actionType.LOGOUT:
            return {
                ...state,
                isAuth: false,
                infoRetrieved: false,
                userDetails: [],
                token: "",
            };
        case actionType.REGISTER_NEW_USER:
            return {
                ...state,
                isCreated: false,
            };
        case actionType.ADD_NEW_USER:
            return {
                ...state,
                loading: true,
            };
        case actionType.ADD_NEW_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isCreated: true,
            };
        case actionType.ADD_NEW_USER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case actionType.USER_LOGIN:
            return {
                ...state,
                loading: true,
            };
        case actionType.USER_LOGIN_SUCCESS:
            localStorage.setItem("token", action.payload.data.result);
            return {
                ...state,
                userDetails: action.payload.data.user,
                loading: false,
                isAuth: true,
                token: action.payload.data.result,
            };
        case actionType.USER_LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case actionType.GET_USER_DETAILS:
            return {
                ...state,
                loading: true,
            };
        case actionType.GET_USER_DETAILS_SUCCESS:
            return {
                ...state,
                userDetails: action.payload.data,
                infoRetrieved: true,
                loading: false,
            };
        case actionType.GET_USER_DETAILS_FAILURE:
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

export default usersReducer;