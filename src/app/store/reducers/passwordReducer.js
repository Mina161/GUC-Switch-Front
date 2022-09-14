import {
    GENERATEREQ,
    GENERATEREQ_SUCCESS,
    GENERATEREQ_FAIL,
    RESET,
    RESET_SUCCESS,
    RESET_FAIL
} from "./types";

const initialState = {
    isLoading: false,
    isError: false
};

export default function store(state = initialState, action) {
    const {
        type,
        payload
    } = action;

    switch (type) {
        case GENERATEREQ:
        case RESET:
            return {
                ...state,
                isLoading: true,
            };
        case GENERATEREQ_SUCCESS:
        case RESET_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false,
            };
        case GENERATEREQ_FAIL:
        case RESET_FAIL:
            return {
                ...state,
                isLoading: false,
                isError: true,
            };
        default:
            return state;
    }
}