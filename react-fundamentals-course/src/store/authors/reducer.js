import actionType from "./types";

const initialState = {
    authorList: [],
    loading: false,
    error: null,
};

const authorsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.GET_AUTHOR_LIST:
            return {
                ...state,
                loading: true,
            };
        case actionType.GET_AUTHOR_LIST_SUCCESS:
            return {
                ...state,
                authorList: action.payload.data,
                loading: false,
            };
        case actionType.GET_AUTHOR_LIST_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case actionType.CREATE_NEW_AUTHOR:
            return {
                ...state,
                loading: true,
            };
        case actionType.CREATE_NEW_AUTHOR_SUCCESS:
            return {
                ...state,
                authorList: action.payload.data,
                loading: false,
            };
        case actionType.CREATE_NEW_AUTHOR_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case actionType.DELETE_AUTHOR:
            return {
                ...state,
                loading: true,
            };
        case actionType.DELETE_AUTHOR_SUCCESS:
            return {
                ...state,
                authorList: action.payload.data,
                loading: false,
            };
        case actionType.DELETE_AUTHOR_FAILURE:
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

export default authorsReducer;