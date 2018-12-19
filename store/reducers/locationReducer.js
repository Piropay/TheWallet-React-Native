import * as actionTypes from "../actions/actionTypes";

export default function locationReducer(
  state = {
    position: null,
    error: null,
    fetching: false
  },
  action
) {
  switch (action.type) {
    case actionTypes.REDUX_SAGA_LOCATION_ACTION_REQUEST: {
      return {
        ...state,
        fetching: true
      };
    }

    case actionTypes.REDUX_SAGA_LOCATION_ACTION_SET_POSITION: {
      console.log(action.payload);
      return {
        ...state,
        position: action.payload,
        error: null,
        fetching: false
      };
    }

    case actionTypes.REDUX_SAGA_LOCATION_ACTION_SET_ERROR: {
      const { error } = action;

      return {
        ...state,
        error: error,
        fetching: false
      };
    }

    default: {
      return state;
    }
  }
}
