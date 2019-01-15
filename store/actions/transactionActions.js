import * as actionTypes from "./actionTypes";

import axios from "axios";
import { Toast } from "native-base";
const instance = axios.create({
  baseURL: "http://192.168.100.32:8000/api/transaction/"
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

export const deleteTransaction = (transaction, budget_id) => {
  return dispatch => {
    instance
      .delete(`${transaction.id}/delete/`, {
        data: {
          amount: transaction.amount,
          label: transaction.label,
          budget: budget_id
        }
      })
      .then(res => res.data)
      .then(transactionID => {
        dispatch({
          type: actionTypes.DELETE_TRANSACTION,
          payload: transactionID
        });
        dispatch({
          type: actionTypes.ADD_TO_BUDGET,
          payload: transaction
        });
      })

      .catch(err => {
        console.log(err.response.data);
      });
  };
};

export const updateTransaction = (
  transaction_id,
  transaction,
  budget_id,
  navigation
) => {
  return dispatch => {
    instance
      .put(`${transaction_id}/update/`, {
        amount: transaction.amount,
        label: transaction.label,
        budget: budget_id
      })
      .then(res => res.data)
      .then(transaction => {
        dispatch({
          type: actionTypes.UPDATE_TRANSACTION,
          payload: { transaction, transaction_id }
        });
      })
      .then(() =>
        Toast.show({
          text: "Transaction Updated!",
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
        // dispatch(console.log(err.response.data));
      });
  };
};
