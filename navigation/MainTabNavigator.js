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
import BudgetDetails from "../components/BudgetDetails";
import AddTransactionView from "../components/AddTransactionView";
import BudgetsView from "../components/BudgetsView";
import Login from "../components/Login";
import Profile from "../components/Profile";
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

    UpdateProfile: UpdateProfile,
    Login: Login,
    Profile: Profile,
    Goals: Goals,
    Deposit: Deposit,
    GoalsView: GoalsView,
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

LinksStack.navigationOptions = {
  tabBarLabel: "Links",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-link" : "md-link"}
    />
  )
};

const ProfileStack = createStackNavigator({
  Profile: Profile,
  Report: Report
});

ProfileStack.navigationOptions = {
  tabBarLabel: false,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "md-person" : "md-person"}
    />
  )
};

export default createMaterialBottomTabNavigator(
  {
    HomeStack,
    LinksStack,
    ProfileStack
  },
  {
    activeColor: "#D5C157",
    inactiveColor: "#fff",
    barStyle: { backgroundColor: "#258779" }
  }
);
