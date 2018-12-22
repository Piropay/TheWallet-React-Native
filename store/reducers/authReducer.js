import * as actionTypes from "../actions/actionTypes";

const initialState = {
  user: null,
  profile: null,
  isAuthenticated: false,
  fetched: false,
  error: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true
      };
    case actionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case actionTypes.UPDATE_PROFILE:
      return {
        ...state,
        profile: action.payload
      };
    case actionTypes.FETCH_PROFILE:
      return {
        ...state,
        profile: action.payload,
        fetched: true
      };
    case actionTypes.LOGOUT_USER:
      return {
        ...state,
        user: null,
        profile: null,
        isAuthenticated: false,
        fetched: false,
        error: {}
      };
    default:
      return state;
  }
};

export default reducer;
