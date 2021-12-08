import { LOGIN, LOGIN_SUCCESS, LOGIN_FAIL } from "./types";
import { postRequest } from "../../../core/network";
import { auth as authEnpoint } from "../../../constants/endPoints.json";
import { notification } from "antd";

export const loadUser = () => async (dispatch, getState) => {
  dispatch({
    type: LOGIN,
  });
  let user = localStorage.getItem("user");

  if (user) {
    user = JSON.parse(user);
    console.log("user", user);
    return dispatch({
      type: LOGIN_SUCCESS,
      payload: user,
    });
  } else {
    return dispatch({
      type: LOGIN_FAIL,
    });
  }
};

export const login = (data) => (dispatch) => {
  dispatch({ type: LOGIN });
  postRequest(data, undefined, undefined, authEnpoint.login)
    .then((response) => {
      const { data } = response;
      return dispatch({
        type: LOGIN_SUCCESS,
        payload: data,
      });
    })
    .catch((err) => {
      notification.error({message: "Wrong ID or Password"})
      return dispatch({
        type: LOGIN_FAIL,
      });
    });
};

export const signup = (data) => (dispatch) => {
  dispatch({ type: LOGIN });
  postRequest(data, undefined, undefined, authEnpoint.signup)
    .then((response) => {
      const { data } = response;
      return dispatch({
        type: LOGIN_SUCCESS,
        payload: data,
      });
    })
    .catch((err) => {
      notification.error({message: "Wrong Data"})
      return dispatch({
        type: LOGIN_FAIL,
      });
    });
};
