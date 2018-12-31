import * as actionTypes from "../actions/actionTypes";

const initialState = {
  transactions: [],
  loading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_TRANSACTIONS:
      return {
        ...state,
        transactions: action.payload
      };
    case actionTypes.ADD_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.concat(action.payload)
      };
    case actionTypes.UPDATE_TRANSACTION:
      var newTransaction = state.transactions.find(transaction => {
        if (transaction.id === action.payload.transaction_id)
          return transaction;
      });

      if (newTransaction) {
        newTransaction.amount = action.payload.transaction.amount;
        newTransaction.user = action.payload.transaction.user;
        newTransaction.label = action.payload.transaction.label;
        newTransaction.budget = action.payload.transaction.budget;
        newTransaction.date = action.payload.transaction.date;
      }
      tran = [...state.transactions];
      return {
        ...state,
        transactions: tran
      };

    default:
      return state;
  }
};

export default reducer;
