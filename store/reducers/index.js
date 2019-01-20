import { combineReducers } from "redux";
import AuthReducer from "./authReducer";
import userInfoReducer from "./userInfoReducer";
// Reducers

import transactionReducer from "./transactionReducer";
import budgetReducer from "./budgetReducer";
import depositReducer from "./depositReducer";
import goalReducer from "./goalReducer";
import locationReducer from "./locationReducer";

export default combineReducers({
  auth: AuthReducer,
  userInfo: userInfoReducer,
  transaction: transactionReducer,
  budget: budgetReducer,
  deposit: depositReducer,
  goal: goalReducer,
  location: locationReducer
});
