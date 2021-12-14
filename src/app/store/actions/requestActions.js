import { REQUEST_LOADING, REQUEST_SUCCESS, REQUEST_FAIL } from "./types";
import {
  getRequest,
  delRequest,
  putRequest,
  postRequest,
} from "../../../core/network";
import { request } from "../../../constants/endPoints.json";
import { notification } from "antd";

export const readRequest = (data) => (dispatch) => {
  dispatch({ type: REQUEST_LOADING });
  getRequest(data, undefined, request)
    .then((response) => {
      const { data } = response;
      return dispatch({
        type: REQUEST_SUCCESS,
        payload: data,
      });
    })
    .catch((err) => {
      return dispatch({
        type: REQUEST_FAIL,
      });
    });
};

export const addRequest = (data) => (dispatch) => {
  dispatch({ type: REQUEST_LOADING });
  postRequest(data, undefined, undefined, request)
    .then((response) => {
      const { data } = response;
      return dispatch({
        type: REQUEST_SUCCESS,
        payload: data,
      });
    })
    .catch((err) => {
      notification.error({ message: "Failed to post request" });
      return dispatch({
        type: REQUEST_FAIL,
      });
    });
};

export const deleteRequest = (data) => (dispatch) => {
  dispatch({ type: REQUEST_LOADING });
  delRequest(data, undefined, request)
    .then((response) => {
      notification.success({ message: "Request Deleted Successfully" });
      return dispatch({
        type: REQUEST_SUCCESS,
        payload: null,
      });
    })
    .catch((err) => {
      notification.error({ message: "Failed to delete request" });
      return dispatch({
        type: REQUEST_FAIL,
      });
    });
};

export const updateRequest = (data) => (dispatch) => {
  dispatch({ type: REQUEST_LOADING });
  putRequest(data, undefined, undefined, request)
    .then((response) => {
      const { data } = response;
      return dispatch({
        type: REQUEST_SUCCESS,
        payload: data,
      });
    })
    .catch((err) => {
      notification.error({ message: "Failed to update request" });
      return dispatch({
        type: REQUEST_FAIL,
      });
    });
};
