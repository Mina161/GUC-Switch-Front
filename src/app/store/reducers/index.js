import { combineReducers } from "redux";
import authReducer from "./authReducer";
import requestsReducer from "./requestsReducer";
import matchesReducer from "./matchesReducer";

export default combineReducers({
    auth: authReducer,
    requests: requestsReducer,
    matches: matchesReducer,
});