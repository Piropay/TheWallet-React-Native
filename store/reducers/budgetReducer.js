import * as actionTypes from "../actions/actionTypes";

const initialState = {
  budgets: [],
  totalUserBudget: 0,
  loading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_BUDGETS:
      let totalUserBudget = 0;
      action.payload.forEach(
        budget => (totalUserBudget += parseFloat(budget.amount))
      );
      return {
        ...state,
        budgets: action.payload,
        totalUserBudget,
        loading: false
      };
    case actionTypes.ADD_BUDGET:
      return {
        ...state,
        budgets: state.budgets.concat(action.payload)
      };
    case actionTypes.SET_BUDGETS_LOADING:
      return {
        ...state,
        loading: true
      };
    case actionTypes.UPDATE_BUDGET:
      var newBudget = state.budgets.find(
        budget => budget.id === action.payload.id
      );

      if (newBudget) {
        newBudget.amount = action.payload.amount;
        newBudget.label = action.payload.label;
        newBudget.category = action.payload.category;
        newBudget.balance = action.payload.balance;
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
