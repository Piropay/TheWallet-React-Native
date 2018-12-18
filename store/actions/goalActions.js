import * as actionTypes from "./actionTypes";

import axios from "axios";
const instance = axios.create({
  baseURL: "http://68.183.217.91/api/goal/"
});

export const fetchGoals = () => {
  return dispatch => {
    instance
      .get("list/")
      .then(res => res.data)
      .then(goals => {
        dispatch({ type: actionTypes.FETCH_GOALS, payload: goals });
      })
      .catch(err => {
        dispatch(console.log(err.response.data));
      });
  };
};

export const addGoal = (goal, navigation) => {
  let date =
    goal.end_date.getFullYear() +
    "-" +
    (goal.end_date.getMonth() + 1) +
    "-" +
    goal.end_date.getDate();
  return dispatch => {
    instance
      .post("create/", {
        label: goal.label,
        end_date: date,
        amount: goal.amount,
        balance: goal.amount
      })
      .then(res => res.data)
      .then(goal => {
        dispatch({
          type: actionTypes.ADD_GOAL,
          payload: goal
        });
      })
      //   .then(() => navigation.navigate("GoalsView"))
      .catch(err => {
        dispatch(console.log(err.response.data));
      });
  };
};

// export const addBudgets = budgets => {
//   return {
//     type: actionTypes.ADD_BUDGETS,
//     payload: budgets
//   };
// };

export const updateGoal = (goal, navigation) => {
  return dispatch => {
    instance
      .put(`${goal.id}/update/`, {
        end_date: goal.end_date,
        amount: goal.amount,
        label: goal.label
      })
      .then(res => res.data)
      .then(goal => {
        dispatch({
          type: actionTypes.UPDATE_GOAL,
          payload: goal
        });
      })
      .catch(err => {
        dispatch(console.log(err.response.data));
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
