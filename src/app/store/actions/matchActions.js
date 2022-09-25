import {
  MATCH_LOADING,
  MATCH_SUCCESS,
  MATCH_FAIL,
  CONTACT_SUCCESS,
} from "./types";
import { getRequest } from "../../../core/network";
import { matches } from "../../../constants/endPoints.json";
import { notification } from "antd";

export const getMatches = (data) => (dispatch) => {
  dispatch({ type: MATCH_LOADING });
  getRequest(data, undefined, matches.getMatch)
    .then((response) => {
      const { data } = response;
      return dispatch({
        type: MATCH_SUCCESS,
        payload: {
          results: data.results,
          thisPage: data.thisPage,
          limit: data.limit,
          count: data.count,
        },
      });
    })
    .catch((err) => {
      return dispatch({
        type: MATCH_FAIL,
      });
    });
};

export const contactMatch = (data) => (dispatch, getState) => {

  dispatch({ type: MATCH_LOADING });
  getRequest(data, undefined, matches.contactMatch)
    .then((response) => {     
      notification.success({ message: "Email Sent!" });
      var state = getState().matches
      console.log(state)
      return dispatch({
        type: CONTACT_SUCCESS,
        payload: {
          results: state?.matches,
          thisPage: state?.thisPage,
          limit: state?.limit,
          count: state?.count,
        },
      });
    })
    .catch((err) => {
      return dispatch({
        type: MATCH_FAIL,
      });
    });
};
