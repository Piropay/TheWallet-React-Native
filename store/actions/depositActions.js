import * as actionTypes from "./actionTypes";

import axios from "axios";
const instance = axios.create({
  baseURL: "http://68.183.217.91/api/deposit/"
});

export const fetchDeposits = () => {
  return dispatch => {
    instance
      .get("list/")
      .then(res => {
        return res.data;
      })
      .then(deposits => {
        dispatch({
          type: actionTypes.FETCH_DEPOSITS,
          payload: deposits
        });
      })
      .catch(err => {
        dispatch(console.log(err.response));
      });
  };
};

export const addDeposit = (deposit, goal_id, navigation) => {
  return dispatch => {
    instance
      .post("create/", {
        label: deposit.label,
        amount: deposit.amount,
        goal: goal_id
      })
      .then(res => res.data)
      .then(deposit => {
        dispatch({
          type: actionTypes.ADD_DEPOSIT,
          payload: deposit
        });
      })
      .then(() => navigation.navigate("Goals"))
      .catch(err => {
        dispatch(console.log(err.response));
      });
  };
};

export const updateDeposit = (deposit_id, goal_id, deposit, navigation) => {
  return dispatch => {
    axios
      .put(`${deposit_id}/update/`, {
        amount: deposit.amount,
        label: deposit.label,
        goal: goal_id
      })
      .then(res => res.data)
      .then(deposit => {
        dispatch({
          type: actionTypes.UPDATE_DEPOSIT,
          payload: deposit
        });
      })
      .catch(err => {
        dispatch(console.log(err.response));
      });
  };
};
