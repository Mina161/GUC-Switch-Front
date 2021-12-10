import { REQUEST_LOADING, REQUEST_FAIL, REQUEST_SUCCESS } from "../actions/types";

const initialState = {
  request: null,
  isLoading: false,
  isError: false,
};

export default function store(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case REQUEST_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case REQUEST_SUCCESS:
      return {
        ...state,
        request: payload,
        isLoading: false,
        isError: false,
      };
    case REQUEST_FAIL:
      return {
        ...state,
        request: null,
        isLoading: false,
        isError: true,
      };
    default:
      return state;
  }
}
