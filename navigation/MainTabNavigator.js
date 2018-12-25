import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import mandatoryInfo from "../components/MandatoryUserInfo";
import UpdateProfile from "../components/UpdateProfile";
import userBudgets from "../components/Budgets";
import BudgetDetails from "../components/BudgetDetails/index.1";
import AddTransactionView from "../components/AddTransactionView";
import BudgetsView from "../components/BudgetsView";
import Login from "../components/Login";
import Profile from "../components/Profile";
import ProfileView from "../components/Profile/newProfile";

import Goals from "../components/Goal";
import Deposit from "../components/Deposit";
import GoalsView from "../components/GoalView";
import Report from "../components/Report";
import AutomatedBudgets from "../components/Budgets/AutomatedBudgets";
import UpdateBudget from "../components/Budgets/UpdateBudget";

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    mandatoryInfo: mandatoryInfo,
    Login: Login,
    Profile: Profile,
    AutomatedBudgets: AutomatedBudgets,
    Report: Report,
    userBudgets: userBudgets,
    Budgets: BudgetsView
  },
  {
    initialRouteName: "Home",
    navigationOptions: {
      headerTintColor: "#fff",
      headerStyle: {
        fontWeight: "bold",
        backgroundColor: "transparent",
        borderBottomWidth: 0
      },
      headerTextStyle: {
        fontWeight: "bold"
      }
    },
    cardStyle: {
      backgroundColor: "#2B2B2B"
    }
  }
);

HomeStack.navigationOptions = {
  title: "Home",
  tabBarLabel: "Home",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-information-circle${focused ? "" : "-outline"}`
          : "md-information-circle"
      }
    />
  )
};

const LinksStack = createStackNavigator(
  {
    Budgets: BudgetsView,
    userBudgets: userBudgets,
    Add: AddTransactionView,
    BudgetDetails: BudgetDetails,
    UpdateBudget: UpdateBudget
  },
  {
    navigationOptions: {
      headerTintColor: "#fff",
      headerStyle: {
        fontWeight: "bold",
        backgroundColor: "transparent",
        borderBottomWidth: 0
      },
      headerTextStyle: {
        fontWeight: "bold",
        fontFamily: "pacifico-regular"
      }
    },
    cardStyle: {
      backgroundColor: "#2B2B2B"
    }
  }
);

LinksStack.navigationOptions = {
  tabBarLabel: "Budgets",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-link" : "md-link"}
    />
  )
};

const GoalsStack = createStackNavigator(
  {
    GoalsView: GoalsView,
    Deposit: Deposit,
    Goals: Goals
  },
  {
    navigationOptions: {
      headerTintColor: "#fff",
      headerStyle: {
        fontWeight: "bold",
        backgroundColor: "#2b2b2b",

        borderBottomWidth: 0
      },
      headerTextStyle: {
        fontWeight: "bold",
        fontFamily: "pacifico-regular"
      }
    },
    cardStyle: {
      backgroundColor: "#2B2B2B"
    }
  }
);

GoalsStack.navigationOptions = {
  tabBarLabel: "Goals",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-link" : "md-link"}
    />
  )
};

const ProfileStack = createStackNavigator(
  {
    // Profile: Profile,
    Profile: ProfileView,
    UpdateProfile: UpdateProfile,
    Report: Report
  },
  {
    navigationOptions: {
      headerTintColor: "#fff",
      headerStyle: {
        fontWeight: "bold",
        backgroundColor: "transparent"
      },
      headerTextStyle: {
        fontWeight: "bold",
        fontFamily: "pacifico-regular"
      }
    },
    cardStyle: {
      backgroundColor: "#2B2B2B"
    }
  }
);

ProfileStack.navigationOptions = {
  tabBarLabel: false,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "md-person" : "md-person"}
    />
  )
};

import { Component } from "react";
import { View, Text } from "react-native";

export default createMaterialBottomTabNavigator(
  {
    HomeStack,
    GoalsStack,
    LinksStack,
    ProfileStack
  },
  {
    activeColor: "#D5C157",
    inactiveColor: "#fff",
    barStyle: { backgroundColor: "#258779" }
  }
);
