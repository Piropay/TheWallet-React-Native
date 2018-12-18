import React from "react";
import { createSwitchNavigator } from "react-navigation";

import MainTabNavigator from "./MainTabNavigator";
import StarterNavigator from "./StarterNavigator";

export default createSwitchNavigator({
  Starter: StarterNavigator,
  Main: MainTabNavigator
});
