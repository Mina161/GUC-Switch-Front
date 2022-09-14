import { GENERATEREQ, GENERATEREQ_SUCCESS, GENERATEREQ_FAIL, RESET, RESET_SUCCESS, RESET_FAIL } from "./types";
import { getRequest, postRequest } from "../../../core/network";
import { auth as authEnpoint } from "../../../constants/endPoints.json";
import { notification } from "antd";

export const requestReset = (data) => (dispatch) => {
    dispatch({ type: GENERATEREQ });
    postRequest(data, undefined, undefined, authEnpoint.signup)
      .then((response) => {
        const { data } = response;
        return dispatch({
          type: GENERATEREQ_SUCCESS,
          payload: data,
        });
      })
      .catch((err) => {
        notification.error({message: "Something went wrong"})
        return dispatch({
          type: GENERATEREQ_FAIL,
        });
      });
  };

  export const resetPass = (data) => (dispatch) => {
    dispatch({ type: RESET });
    postRequest(data, undefined, undefined, authEnpoint.signup)
      .then((response) => {
        const { data } = response;
        return dispatch({
          type: RESET_SUCCESS,
          payload: data,
        });
      })
      .catch((err) => {
        notification.error({message: data})
        return dispatch({
          type: RESET_FAIL,
        });
      });
  };