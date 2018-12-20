import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import HomePage from "../components/HomePage";
import Signup from "../components/Signup";
import Login from "../components/Login";
import MainTabNavigator from "../navigation/MainTabNavigator";
import SetIncome from "../components/SetIncome";
export default createStackNavigator(
  {
    HomePage: HomePage,
    Signup: Signup,
    Login: Login,
    SetIncome: SetIncome
  },
  {
    initialRouteName: "HomePage",
    navigationOptions: {
      header: null,

      headerStyle: {
        backgroundColor: "transparent"
      },
      headerTintColor: "#fff",
      headerTextStyle: {
        fontWeight: "bold"
      }
    },
    cardStyle: {
      backgroundColor: "#2B2B2B"
    }
  }
);
