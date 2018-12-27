import * as actionTypes from "./actionTypes";

import axios from "axios";
import { Toast } from "native-base";
const instance = axios.create({
  baseURL: "http://192.168.8.105/api/transaction/"
});

export const fetchTransactions = () => {
  return dispatch => {
    instance
      .get("list/")
      .then(res => {
        return res.data;
      })
      .then(transactions => {
        dispatch({
          type: actionTypes.FETCH_TRANSACTIONS,
          payload: transactions
        });
      })
      .catch(err => {
        dispatch(console.log(err.response.data));
      });
  };
};

export const addTransaction = (transaction, budget_id, navigation) => {
  return dispatch => {
    instance
      .post("create/", {
        label: transaction.label,
        amount: transaction.amount,
        budget: budget_id
      })
      .then(res => res.data)
      .then(transaction => {
        dispatch({
          type: actionTypes.ADD_TRANSACTION,
          payload: transaction
        });
        dispatch({
          type: actionTypes.SUBTRACT_BUDGET,
          payload: transaction
        });

        navigation.navigate("Budgets");
      })

      .catch(err => {
        //dispatch(console.log(err.response));
      });
  };
};

export const updateTransaction = (
  transaction_id,
  budget_id,
  transaction,
  navigation
) => {
  return dispatch => {
    axios
      .put(`${transaction_id}/update/`, {
        amount: transaction.amount,
        label: transaction.label,
        budget: budget_id
      })
      .then(res => res.data)
      .then(transaction => {
        dispatch({
          type: actionTypes.UPDATE_TRANSACTION,
          payload: transaction
        });
      })
      .catch(err => {
        // dispatch(console.log(err.response.data));
      });
  };
};
