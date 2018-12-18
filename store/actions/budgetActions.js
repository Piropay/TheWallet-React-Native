import * as actionTypes from "./actionTypes";

import axios from "axios";
const instance = axios.create({
  baseURL: "http://68.183.217.91/api/budget/"
});

export const fetchBudgets = () => {
  return dispatch => {
    instance
      .get("list/")
      .then(res => res.data)
      .then(budgets => {
        dispatch({ type: actionTypes.FETCH_BUDGETS, payload: budgets });
      })
      .catch(err => {
        dispatch(console.log(err.response));
      });
  };
};

export const addBudget = (budget, navigation) => {
  return dispatch => {
    instance
      .post("create/", {
        label: budget.label,
        category: budget.category,
        amount: budget.amount
      })
      .then(res => res.data)
      .then(budget => {
        dispatch({
          type: actionTypes.ADD_BUDGET,
          payload: budget
        });
      })
      // .then(() => navigation.navigate("Budgets"))
      .catch(err => {
        dispatch(console.log(err.response));
      });
  };
};

// export const addBudgets = budgets => {
//   return {
//     type: actionTypes.ADD_BUDGETS,
//     payload: budgets
//   };
// };

export const updateBudget = (budget, budget_id, navigation) => {
  return dispatch => {
    instance
      .put(`${budget_id}/update/`, {
        category: budget.category,
        amount: budget.amount,
        label: budget.label,
        balance: budget.balance
      })
      .then(res => res.data)
      .then(budget => {
        dispatch({
          type: actionTypes.UPDATE_BUDGET,
          payload: budget
        });
      })
      .catch(err => {
        dispatch(console.log(err.response));
      });
  };
};

// export const updateBudget = (budget, amount) => {
//   return dispatch => {
//     dispatch({
//       type: actionTypes.UPDATE_BUDGET,
//       payload: { id: budget, amount: amount }
//     });
//   };
// };
