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

    default:
      return state;
  }
};

export default reducer;
