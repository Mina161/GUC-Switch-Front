import { GENERATEREQ, GENERATEREQ_SUCCESS, GENERATEREQ_FAIL, RESET, RESET_SUCCESS, RESET_FAIL } from "./types";
import { getRequest, postRequest } from "../../../core/network";
import { password } from "../../../constants/endPoints.json";
import { notification } from "antd";

export const requestReset = (data) => (dispatch) => {
    dispatch({ type: GENERATEREQ });
    postRequest(data, undefined, undefined, password.forgot)
      .then((response) => {
        const { data } = response;
        notification.success({message: "Email Sent!"})
        return dispatch({
          type: GENERATEREQ_SUCCESS,
          payload: data,
        });
      })
      .catch((err) => {
        notification.error({message: "Email already sent or User not found"})
        return dispatch({
          type: GENERATEREQ_FAIL,
        });
      });
  };

  export const resetPass = (data, history) => (dispatch) => {
    dispatch({ type: RESET });
    postRequest(data, undefined, undefined, password.reset)
      .then((response) => {
        const { data } = response;
        notification.success({message: "Password Reset!"})
        history.push('/')
        return dispatch({
          type: RESET_SUCCESS,
          payload: data,
        });
      })
      .catch((err) => {
        notification.error({message: "Something went wrong"})
        return dispatch({
          type: RESET_FAIL,
        });
      });
  };