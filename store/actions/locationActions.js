import * as actionTypes from "./actionTypes";

export const getCurrentPositionThunk = options => dispatch => {
  dispatch({ type: actionTypes.REDUX_SAGA_LOCATION_ACTION_REQUEST });
  navigator.geolocation.getCurrentPosition(
    position => {
      dispatch({
        type: actionTypes.REDUX_SAGA_LOCATION_ACTION_SET_POSITION,
        payload: position
      });
    },
    error =>
      dispatch({
        type: actionTypes.REDUX_SAGA_LOCATION_ACTION_SET_ERROR,
        error
      }),
    options
  );
};

export const watchCurrentPositionThunk = options => dispatch => {
  dispatch({ type: actionTypes.REDUX_SAGA_LOCATION_ACTION_REQUEST });
  navigator.geolocation.watchPosition(
    position => {
      dispatch({
        type: actionTypes.REDUX_SAGA_LOCATION_ACTION_SET_POSITION,
        payload: position
      });
    },
    error =>
      dispatch({
        type: actionTypes.REDUX_SAGA_LOCATION_ACTION_SET_ERROR,
        error
      }),
    options
  );
};
