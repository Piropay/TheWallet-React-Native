import * as actionTypes from "./actionTypes";
import axios from "axios";

const instance = axios.create({
  baseURL: "http://68.183.217.91/api/expense/"
});

export const addExpenses = (expense, navigation) => {
  return dispatch => {
    instance
      .post("create/", {
        label: expense.label,
        amount: expense.amount
      })
      .then(res => res.data)
      .then(expense => {
        dispatch({
          type: actionTypes.ADD_EXPENSES,
          payload: expense
        });
      })
      .catch(err => {
        dispatch(console.log(err.response));
      });
  };
};

export const fetchExpenses = () => {
  return dispatch => {
    instance
      .get("list/")
      .then(res => res.data)
      .then(expenses => {
        dispatch({ type: actionTypes.FETCH_EXPENSES, payload: expenses });
      })
      .catch(err => {
        dispatch(console.log(err.response.data));
      });
  };
};

export const getBalance = (income, expenses, navigation) => {
  let totalExpense = 0;
  let balance = 0;
  for (let index = 0; index < expenses.length; index++) {
    totalExpense += parseFloat(expenses[index].amount);
  }
  balance = parseFloat(income) - totalExpense;

  return {
    type: actionTypes.GET_BALANCE,
    payload: balance
  };
};
