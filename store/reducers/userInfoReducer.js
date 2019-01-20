import * as actionTypes from "../actions/actionTypes";

const initialState = {
  income: 0,
  expenses: [],
  balance: 0
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INCOME:
      return {
        ...state,
        income: action.payload,
        balance: action.payload
      };
    case actionTypes.FETCH_EXPENSES:
      return {
        ...state,
        expenses: action.payload
      };
    case actionTypes.ADD_EXPENSES:
      return {
        ...state,
        expenses: state.expenses.concat(action.payload)
      };
    case actionTypes.DELETE_EXPENSE:
      return {
        ...state,
        expenses: state.expenses.filter(
          expense => expense.id !== action.payload
        )
      };
    case actionTypes.UPDATE_EXPENSE:
      var newExpense = state.expenses.find(
        expense => expense.id === action.payload.id
      );

      if (newExpense) {
        newExpense.amount = action.payload.amount;
        newExpense.label = action.payload.label;
      }
      exp = [...state.expenses];
      return {
        ...state,
        expenses: exp
      };
    case actionTypes.GET_BALANCE:
      return {
        ...state,
        balance: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
