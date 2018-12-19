import * as actionTypes from "./actionTypes";
import axios from "axios";

const instance = axios.create({
  baseURL: "http://192.168.1.60/api/expense/"
});

export const addIncome = income => {
  return {
    type: actionTypes.ADD_INCOME,
    payload: income
  };
};

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
      .then(() => navigation.navigate("Home"))
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
