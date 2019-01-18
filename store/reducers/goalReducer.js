import * as actionTypes from "../actions/actionTypes";

const initialState = {
  goals: [],
  loading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_GOALS:
      return {
        ...state,
        goals: action.payload
      };
    case actionTypes.ADD_GOAL:
      return {
        ...state,
        goals: state.goals.concat(action.payload)
      };
    case actionTypes.ADD_TO_GOAL:
      var newGoal = state.goals.find(goal => goal.id === action.payload.goal);

      if (newGoal) {
        newGoal.balance =
          parseFloat(newGoal.balance) + parseFloat(action.payload.amount);
      }
      goa = [...state.goals];
      return {
        ...state,
        goals: goa
      };
    case actionTypes.DELETE_GOAL:
      return {
        ...state,
        goals: state.goals.filter(goal => goal.id !== action.payload.id)
      };
    case actionTypes.UPDATE_GOAL:
      return {
        ...state,
        goals: state.goals.filter(goal => {
          if (goal.id === action.payload.id) {
            goal.amount = action.payload.amount;
            goal.balance = action.payload.balance;
            goal.label = action.payload.label;
            goal.end_date = action.payload.end_date;
            return goal;
          }
          return goal;
        })
      };
    default:
      return state;
  }
};

export default reducer;
