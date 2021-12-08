import { LOGIN, LOGIN_FAIL, LOGIN_SUCCESS } from "../actions/types";

const initialState = {
  user: null,
  isLoading: false,
  isError: false,
};

export default function store(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOGIN:
      return {
        ...state,
        isLoading: true,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("user", JSON.stringify(action.payload));

      return {
        ...state,
        user: payload,
        isLoading: false,
        isError: false,
      };
    case LOGIN_FAIL:
      localStorage.removeItem("user");
      return {
        ...state,
        user: null,
        isLoading: false,
        isError: true,
      };
    default:
      return state;
  }
}
