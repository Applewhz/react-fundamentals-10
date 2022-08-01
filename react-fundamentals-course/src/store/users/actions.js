import actionType from "./types";

const userAction = {
    addNewUser: (data) => ({
        type: actionType.ADD_NEW_USER,
        payload: {
            data
        }
    }),

    addNewUserSuccess: (data, status) => ({
        type: actionType.ADD_NEW_USER_SUCCESS,
        payload: {
            data,
            status
        }
    }),

    addNewUserFailure: (error, status) => ({
        type: actionType.ADD_NEW_USER_FAILURE,
        payload: {
            error,
            status
        }
    }),

    login: () => ({
        type: actionType.LOGIN
    }),

    logout: () => ({
        type: actionType.LOGOUT
    }),

    userLogin: (data) => ({
        type: actionType.USER_LOGIN,
        payload: {
            data
        }
    }),

    userLoginSuccess: (data, status) => ({
        type: actionType.USER_LOGIN_SUCCESS,
        payload: {
            data,
            status
        }
    }),

    userLoginFailure: (error, status) => ({
        type: actionType.USER_LOGIN_FAILURE,
        payload: {
            error,
            status
        }
    }),

    registerNewUserDetails: () => ({
        type: actionType.REGISTER_NEW_USER
    }),

    userDetails: () => ({
        type: actionType.GET_USER_DETAILS,
    }),

    getUserDetailsSuccess: (data, status) => ({
        type: actionType.GET_USER_DETAILS_SUCCESS,
        payload: {
            data,
            status
        }
    }),

    getUserDetailsFailure: (error, status) => ({
        type: actionType.GET_USER_DETAILS_FAILURE,
        payload: {
            error,
            status
        }
    }),
}

export default userAction;