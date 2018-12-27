import axios from "axios";
import jwt_decode from "jwt-decode";

import * as actionTypes from "./actionTypes";
import { fetchBudgets } from "./budgetActions";
import { fetchDeposits } from "./depositActions";
import { fetchGoals } from "./goalActions";
import { fetchTransactions } from "./transactionActions";
import { fetchExpenses } from "./userInfo";
import { AsyncStorage } from "react-native";
import { StackActions, NavigationActions } from "react-navigation";
import { Toast } from "native-base";

const instance = axios.create({
  baseURL: "http://192.168.8.105/api/"
});

const setAuthToken = token => {
  if (token) {
    return AsyncStorage.setItem("token", token)
      .then(
        () => (axios.defaults.headers.common.Authorization = `jwt ${token}`)
      )
      .catch(err => alert(err));
  } else {
    return AsyncStorage.removeItem("token")
      .then(() => {
        delete axios.defaults.headers.common.Authorization;
      })
      .catch(err => alert(err));
  }
};

export const checkForExpiredToken = () => {
  return dispatch => {
    return AsyncStorage.getItem("token").then(token => {
      if (token) {
        const currentTime = Date.now() / 1000;
        const user = jwt_decode(token);
        if (user.exp >= currentTime) {
          setAuthToken(token).then(() => dispatch(setCurrentUser(user)));
        }
      }
    });
  };
};

export const login = (userData, navigation, type) => {
  return dispatch => {
    instance
      .post("login/", userData)
      .then(res => res.data)
      .then(user => {
        const decodedUser = jwt_decode(user.token);
        setAuthToken(user.token).then(() =>
          dispatch(setCurrentUser(decodedUser))
        );
        if (type === "login") {
          navigation.navigate("Home");
        } else {
          navigation.navigate("SetIncome");
        }
      })

      .catch(err => {
        if (err.response.data.username) {
          Toast.show({
            text: "Username: " + err.response.data.username,
            buttonText: "Okay",
            duration: 6000,
            type: "warning",
            buttonTextStyle: { color: "#000" },
            buttonStyle: {
              backgroundColor: "#F1C04F",
              alignSelf: "center"
            }
          });
        }
        if (err.response.data.password) {
          Toast.show({
            text: "Password: " + err.response.data.password,
            buttonText: "Okay",
            duration: 6000,
            type: "warning",
            buttonTextStyle: { color: "#000" },
            buttonStyle: {
              backgroundColor: "#F1C04F",
              alignSelf: "center"
            }
          });
        }
        if (err.response.data.non_field_errors) {
          Toast.show({
            text: err.response.data.non_field_errors,
            buttonText: "Okay",
            duration: 6000,
            type: "warning",
            buttonTextStyle: { color: "#000" },
            buttonStyle: {
              backgroundColor: "#F1C04F",
              alignSelf: "center"
            }
          });
        }
      });
  };
};

export const signup = (userData, navigation) => {
  return dispatch => {
    instance
      .post("register/", userData)
      .then(res => res.data)
      .then(() => {
        dispatch(login(userData, navigation, "signup"));
      })
      .catch(err => {
        if (err.response.data.username) {
          Toast.show({
            text: "Username: " + err.response.data.username,
            buttonText: "Okay",
            duration: 6000,
            type: "warning",
            buttonTextStyle: { color: "#000" },
            buttonStyle: {
              backgroundColor: "#F1C04F",
              alignSelf: "center"
            }
          });
        }
        if (err.response.data.password) {
          Toast.show({
            text: "Password: " + err.response.data.password,
            buttonText: "Okay",
            duration: 6000,
            type: "warning",
            buttonTextStyle: { color: "#000" },
            buttonStyle: {
              backgroundColor: "#F1C04F",
              alignSelf: "center"
            }
          });
        }
        if (err.response.data.non_field_errors) {
          Toast.show({
            text: err.response.data.non_field_errors,
            buttonText: "Okay",
            duration: 6000,
            type: "warning",
            buttonTextStyle: { color: "#000" },
            buttonStyle: {
              backgroundColor: "#F1C04F",
              alignSelf: "center"
            }
          });
        }
      });
  };
};

export const logout = navigation => {
  navigation.navigate("HomePage");

  setAuthToken();
  return setCurrentUser(null);
};

const setCurrentUser = user => {
  return dispatch => {
    if (user) {
      dispatch({ type: actionTypes.SET_CURRENT_USER, payload: user });
      dispatch(fetchBudgets());
      dispatch(fetchProfile());
      dispatch(fetchTransactions());
      dispatch(fetchGoals());
      dispatch(fetchExpenses());
      dispatch(fetchDeposits());
    } else {
      dispatch({ type: actionTypes.LOGOUT_USER, payload: user });
    }
  };
};

export const updateProfile = (profile, navigation) => {
  return dispatch => {
    instance
      .put(`profile/update/`, {
        phoneNo: profile.phoneNo,
        dob: profile.dob,
        gender: profile.gender,
        income: profile.income,
        balance: profile.balance,
        savings: profile.savings,
        longitude: profile.longitude,
        latitude: profile.latitude,
        accuracy: profile.accuracy,
        automated: profile.automated
      })
      .then(res => res.data)
      .then(profile => {
        dispatch({
          type: actionTypes.UPDATE_PROFILE,
          payload: profile
        });
      })

      .catch(err => {
        dispatch(console.log(err.response.data.data));
      });
  };
};

export const updateBalance = (profile, navigation) => {
  return dispatch => {
    instance
      .put(`profile/update/`, {
        phoneNo: profile.phoneNo,
        dob: profile.dob,
        gender: profile.gender,
        income: profile.income,
        balance: profile.balance,
        savings: profile.savings,
        automated: profile.automated
      })
      .then(res => res.data)
      .then(profile => {
        dispatch({
          type: actionTypes.UPDATE_PROFILE,
          payload: profile
        });
        navigation.navigate("Expanses");
      })

      .catch(err => {
        dispatch(console.log(err.response.data.data));
      });
  };
};

export const fetchProfile = () => {
  return dispatch => {
    instance
      .get(`profile/`)
      .then(res => {
        return res.data;
      })
      .then(profile => {
        return dispatch({ type: actionTypes.FETCH_PROFILE, payload: profile });
      })

      .catch(err => {
        //dispatch(console.log(err.response.data));
      });
  };
};

export const setErrors = errors => ({
  type: actionTypes.SET_ERROR,
  payload: errors
});
