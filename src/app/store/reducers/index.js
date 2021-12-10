import { combineReducers } from "redux";
import authReducer from "./authReducer";
import requestsReducer from "./requestsReducer"

export default combineReducers({
    auth: authReducer,
    requests: requestsReducer,
});