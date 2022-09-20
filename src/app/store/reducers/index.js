import { combineReducers } from "redux";
import authReducer from "./authReducer";
import requestsReducer from "./requestsReducer";
import matchesReducer from "./matchesReducer";
import passwordReducer from "./passwordReducer";

export default combineReducers({
    auth: authReducer,
    requests: requestsReducer,
    matches: matchesReducer,
    passReset: passwordReducer
});