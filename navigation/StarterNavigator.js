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
export default createStackNavigator(
  {
    Home: HomePage,
    Signup: Signup,
    Login: Login,
    Main: MainTabNavigator
  },
  {
    initialRouteName: "Home",
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
