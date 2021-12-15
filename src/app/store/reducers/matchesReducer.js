import { MATCH_LOADING, MATCH_FAIL, MATCH_SUCCESS, CONTACT_SUCCESS } from "../actions/types";

const initialState = {
  matches: null,
  isLoading: false,
  isError: false,
  thisPage: 1,
  limit: null,
};

export default function store(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case MATCH_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case MATCH_SUCCESS:
      return {
        ...state,
        matches: payload.results,
        thisPage: payload.thisPage,
        limit: payload.limit,
        isLoading: false,
        isError: false,
      };
    case CONTACT_SUCCESS:
      return {
        ...state
      };
    case MATCH_FAIL:
      return {
        ...state,
        matches: null,
        isLoading: false,
        isError: true,
      };
    default:
      return state;
  }
}
