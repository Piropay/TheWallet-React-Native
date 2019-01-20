import * as actionTypes from "../actions/actionTypes";

const initialState = {
  budgets: [],
  totalUserBudget: 0,
  loading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_BUDGETS:
      var totalUserBudget = 0;
      action.payload.forEach(
        budget => (totalUserBudget += parseFloat(budget.amount))
      );
      return {
        ...state,
        budgets: action.payload,
        totalUserBudget
      };
    case actionTypes.ADD_BUDGET:
      var totalUserBudget = state.totalUserBudget;
      action.payload.forEach(
        budget => (totalUserBudget += parseFloat(budget.amount))
      );
      return {
        ...state,
        budgets: state.budgets.concat(action.payload),
        totalUserBudget
      };
    case actionTypes.DELETE_BUDGET:
      var deletedBudget = state.budgets.find(
        budget => budget.id === action.payload.id
      );
      return {
        ...state,
        budgets: state.budgets.filter(
          budget => budget.id !== action.payload.id
        ),
        totalUserBudget:
          state.totalUserBudget - parseFloat(deletedBudget.amount)
      };
    case actionTypes.UPDATE_BUDGET:
      var newBudget = state.budgets.find(
        budget => budget.id === action.payload.id
      );
      var totalUserBudget = state.totalUserBudget;
      if (newBudget) {
        totalUserBudget += action.payload.amount - newBudget.amount;
        newBudget.amount = action.payload.amount;
        newBudget.label = action.payload.label;
        newBudget.category = action.payload.category;
        newBudget.balance = action.payload.balance;
      }
      bud = [...state.budgets];
      return {
        ...state,
        budgets: bud,
        totalUserBudget
      };
    case actionTypes.ADD_TO_BUDGET:
      var newBudget = state.budgets.find(
        budget => budget.id === action.payload.budget
      );
      if (newBudget) {
        newBudget.balance =
          parseFloat(newBudget.balance) + parseFloat(action.payload.amount);
      }
      bud = [...state.budgets];
      return {
        ...state,
        budgets: bud
      };
    case actionTypes.SUBTRACT_BUDGET:
      var newBudget = state.budgets.find(
        budget => budget.id === action.payload.budget
      );
      if (newBudget) {
        newBudget.balance = newBudget.balance - action.payload.amount;
      }
      bud = [...state.budgets];
      return {
        ...state,
        budgets: bud
      };
    default:
      return state;
  }
};

export default reducer;
