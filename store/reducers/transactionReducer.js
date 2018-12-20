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

    default:
      return state;
  }
};

export default reducer;
