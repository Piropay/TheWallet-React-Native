import * as actionTypes from "../actions/actionTypes";

const initialState = {
  deposits: [],
  loading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_DEPOSITS:
      return {
        ...state,
        deposits: action.payload
      };
    case actionTypes.ADD_DEPOSIT:
      return {
        ...state,
        deposits: state.deposits.concat(action.payload)
      };
    case actionTypes.UPDATE_DEPOSIT:
      var newDeposit = state.deposits.find(deposit => {
        if (deposit.id === action.payload.deposit_id) return deposit;
      });

      if (newDeposit) {
        newDeposit.amount = action.payload.deposit.amount;
        newDeposit.goal = action.payload.deposit.goal;
      }
      dep = [...state.deposits];
      return {
        ...state,
        deposits: dep
      };
    case actionTypes.DELETE_DEPOSIT:
      return {
        ...state,
        deposits: state.deposits.filter(deposit => {
          console.log(deposit.id);
          deposit.id !== action.payload;
        })
      };
    default:
      return state;
  }
};

export default reducer;
