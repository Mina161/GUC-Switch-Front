import { GENERATEREQ, GENERATEREQ_SUCCESS, GENERATEREQ_FAIL, RESET, RESET_SUCCESS, RESET_FAIL } from "../actions/types";

const initialState = {
    isLoading: false,
    isError: false,
    isDone: false
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
                isDone: false
            };
        case GENERATEREQ_SUCCESS:
        case RESET_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false,
                isDone:true
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