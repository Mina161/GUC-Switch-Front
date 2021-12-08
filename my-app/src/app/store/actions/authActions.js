import { LOGIN, LOGIN_SUCCESS, LOGIN_FAIL } from "./types";
import { postRequest } from "../../core/network";
import { auth as authEnpoint } from "../../../constants/endPoints.json";
import { notification } from "antd";

export const login = (dataForLogin) => (dispatch) => {
  dispatch({ type: LOGIN });
  postRequest(dataForLogin, undefined, undefined, authEnpoint.login)
    .then((response) => {
      const { data } = response.data;
      return dispatch({
        type: LOGIN_SUCCESS,
        payload: data,
      });
    })
    .catch((err) => {
      //   notification.error({ message: err?.response?.data?.error.message });
      console.error(err);
      return dispatch({
        type: LOGIN_FAIL,
      });
    });
};
