import actionType from "./types";

const authorsAction = {
    getAuthorList: () => ({
        type: actionType.GET_AUTHOR_LIST,
    }),

    getAuthorListSuccess: (data, status) => ({
        type: actionType.GET_AUTHOR_LIST_SUCCESS,
        payload: {
            data,
            status
        }
    }),

    getAuthorListFailure: (error, status) => ({
        type: actionType.GET_AUTHOR_LIST_FAILURE,
        payload: {
            error,
            status
        }
    }),

    postNewAuthor: (data) => ({
        type: actionType.CREATE_NEW_AUTHOR,
        payload: {
            name: data
        },
    }),

    postNewAuthorSuccess: (data, status) => ({
        type: actionType.CREATE_NEW_AUTHOR_SUCCESS,
        payload: {
            data,
            status
        }
    }),

    postNewAuthorFailure: (error, status) => ({
        type: actionType.CREATE_NEW_AUTHOR_FAILURE,
        payload: {
            error,
            status
        }
    }),

    deleteAuthor: (data) => ({
        type: actionType.DELETE_AUTHOR,
        payload: {
            data
        },
    }),

    deleteAuthorSuccess: (data, status) => ({
        type: actionType.DELETE_AUTHOR_SUCCESS,
        payload: {
            data,
            status
        }
    }),

    deleteAuthorFailure: (error, status) => ({
        type: actionType.DELETE_AUTHOR_FAILURE,
        payload: {
            error,
            status
        }
    }),

}

export default authorsAction;