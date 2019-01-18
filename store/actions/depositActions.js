import * as actionTypes from "./actionTypes";

import axios from "axios";
import { Toast } from "native-base";
const instance = axios.create({
  baseURL: "http://192.168.100.39/api/deposit/"
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
        dispatch(console.log(err.response.data));
      });
  };
};

export const addDeposit = (deposit, goal_id, navigation) => {
  return dispatch => {
    instance
      .post("create/", {
        amount: deposit,
        goal: goal_id
      })
      .then(res => res.data)
      .then(deposit => {
        dispatch({
          type: actionTypes.ADD_DEPOSIT,
          payload: deposit
        });
      })
      .then(() =>
        Toast.show({
          text: "Deposit added!",
          buttonText: "Okay",
          duration: 6000,
          type: "success",
          buttonTextStyle: { color: "#000" },
          buttonStyle: {
            backgroundColor: "#F1C04F",
            alignSelf: "center"
          }
        })
      )
      .catch(err => {
        console.log(err.response.data);
      });
  };
};

export const deleteDeposit = (deposit, goalId) => {
  return dispatch => {
    instance
      .delete(`${deposit.id}/delete/`, {
        data: {
          amount: deposit.amount,
          goal: goalId
        }
      })
      .then(res => res.data)
      .then(depositID => {
        dispatch({
          type: actionTypes.DELETE_DEPOSIT,
          payload: depositID
        });
        dispatch({
          type: actionTypes.ADD_TO_GOAL,
          payload: deposit
        });
      })

      .catch(err => {
        console.log(err.response.data);
      });
  };
};

export const updateDeposit = (deposit_id, deposit, goal_id, navigation) => {
  return dispatch => {
    instance
      .put(`${deposit_id}/update/`, {
        amount: deposit,
        goal: goal_id
      })
      .then(res => res.data)
      .then(deposit => {
        dispatch({
          type: actionTypes.UPDATE_DEPOSIT,
          payload: { deposit, deposit_id }
        });
      })
      .then(() =>
        Toast.show({
          text: "Deposit Updated!",
          buttonText: "Okay",
          duration: 6000,
          type: "success",
          buttonTextStyle: { color: "#000" },
          buttonStyle: {
            backgroundColor: "#F1C04F",
            alignSelf: "center"
          }
        })
      )
      .catch(err => {
        console.log(err.response.data);
      });
  };
};
