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
import AutomatedBudgets from "../components/Budgets/AutomatedBudgets";
import Expanses from "../components/MandatoryUserInfo";
import CreateBudgets from "../components/Budgets";
import Automation from "../components/Automation";

import SetIncome from "../components/SetIncome";
export default createStackNavigator(
  {
    HomePage: HomePage,
    Signup: Signup,
    Login: Login,
    SetIncome: SetIncome,
    Automated: AutomatedBudgets,
    CreateBudgets: CreateBudgets,
    Expanses: Expanses,
    Automation: Automation
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
