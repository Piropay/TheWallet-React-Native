import * as actionTypes from "./actionTypes";
import axios from "axios";
import { Toast } from "native-base";

const instance = axios.create({
  baseURL: "http://192.168.100.32:8000/api/expense/"
});

export const addExpenses = (expenses, navigation) => {
  return dispatch => {
    instance
      .post("create/", expenses)
      .then(res => res.data)
      .then(expense => {
        dispatch({
          type: actionTypes.ADD_EXPENSES,
          payload: expense
        });
      })
      .then(() => navigation.navigate("Automation"))
      .catch(err => {
        dispatch(console.log(err.response));
      });
  };
};

export const deleteExpense = expense => {
  console.log(expense);

  return dispatch => {
    instance
      .delete(`${expense.id}/delete/`, { data: { id: expense.id } })
      .then(res => res.data)
      .then(expenseId => {
        dispatch({
          type: actionTypes.DELETE_EXPENSE,
          payload: expenseId
        });
      })

      .catch(err => {
        dispatch(console.log(err.response));
      });
  };
};

export const updateExpense = (expense_id, expense) => {
  return dispatch => {
    instance
      .put(`${expense_id}/update/`, expense)
      .then(res => res.data)
      .then(expense => {
        dispatch({
          type: actionTypes.UPDATE_EXPENSE,
          payload: expense
        });
      })
      .then(() =>
        Toast.show({
          text: "Expense Updated!",
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
