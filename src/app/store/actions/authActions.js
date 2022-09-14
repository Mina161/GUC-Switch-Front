import { LOGIN, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS } from "./types";
import { getRequest, postRequest } from "../../../core/network";
import { auth as authEnpoint } from "../../../constants/endPoints.json";
import { notification } from "antd";

export const loadUser = () => async (dispatch, getState) => {
  dispatch({
    type: LOGIN,
  });
  let user = localStorage.getItem("switchingAppUser");

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

export const logout = () => async (dispatch, getState) => {
  localStorage.removeItem("switchingAppUser");
  return dispatch({
    type: LOGOUT_SUCCESS,
  });
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
      notification.error({message: "GUC ID already exists"})
      return dispatch({
        type: LOGIN_FAIL,
      });
    });
};
