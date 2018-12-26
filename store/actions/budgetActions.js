import * as actionTypes from "./actionTypes";

import axios from "axios";
import { updateProfile } from "./authActions";
const instance = axios.create({
  baseURL: "http://68.183.217.91/api/budget/"
});

export const fetchBudgets = () => {
  return dispatch => {
    dispatch(setBudgetsLoading());
    instance
      .get("list/")
      .then(res => res.data)
      .then(budgets => {
        dispatch({ type: actionTypes.FETCH_BUDGETS, payload: budgets });
      })
      .catch(err => {
        dispatch(console.log(err.response.data));
      });
  };
};

// export const addBudget = (budget, navigation) => {
//   return dispatch => {
//     instance
//       .post("create/", {
//         label: budget.label,
//         category: budget.category,
//         amount: budget.amount
//       })
//       .then(res => res.data)
//       .then(budget => {
//         dispatch({
//           type: actionTypes.ADD_BUDGET,
//           payload: budget
//         });
//       })
//       .catch(err => {
//         console.log(err.response.data);
//       });
//   };
// };

export const addBudget = (budgets, navigation, type, profile) => {
  return dispatch => {
    return instance
      .post("create/", budgets)
      .then(res => res.data)
      .then(budgets => {
        dispatch({
          type: actionTypes.ADD_BUDGET,
          payload: budgets
        });
      })
      .then(() => {
        if (type === "auto") {
          profile = { ...profile, automated: true };
          dispatch(updateProfile(profile));
          navigation.navigate("Home");
        } else {
          navigation.navigate("BudgesView");
        }
      })

      .then(() => navigation.navigate("Home"))
      .catch(err => {
        console.log(err.response.data);
      });
  };
};

export const updateBudget = (budget, navigation) => {
  return dispatch => {
    instance
      .put(`${budget.id}/update/`, {
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
        navigation.goBack();
      })
      .catch(err => {
        dispatch(console.log(err.response.data));
      });
  };
};

export const setBudgetsLoading = () => ({
  type: actionTypes.SET_BUDGETS_LOADING
});

// export const updateBudget = (budget, amount) => {
//   return dispatch => {
//     dispatch({
//       type: actionTypes.UPDATE_BUDGET,
//       payload: { id: budget, amount: amount }
//     });
//   };
// };
