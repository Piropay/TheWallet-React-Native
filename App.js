import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { AppLoading, Asset, Font, Icon } from "expo";
import AppNavigator from "./navigation/AppNavigator";
import { Provider } from "react-redux";
import Location from "./components/Location";
import * as actionCreators from "./store/actions";
import { checkForExpiredToken } from "./store/actions/authActions";
import ActionButton from "react-native-action-button";
import { Icon as BIcon, Root } from "native-base";
import { Constants } from "expo";

// Store
import store from "./store";
class App extends React.Component {
  state = {
    isLoadingComplete: false
  };

  componentDidMount() {
    console.log("hi");

    store.dispatch(checkForExpiredToken());
  }

  render() {
    console.disableYellowBox = true;

    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <Provider store={store}>
          <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <Root>
              <Location />
              <AppNavigator />
            </Root>
          </View>
        </Provider>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require("./assets/images/robot-dev.png"),
        require("./assets/images/robot-prod.png"),
        require("./assets/images/jama3t.png"),
        require("./assets/images/logo2.png")
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf"),
        "pacifico-regular": require("./assets/fonts/Pacifico-Regular.ttf"),
        "quicksand-regular": require("./assets/fonts/Quicksand-Regular.otf"),
        "quicksand-bold": require("./assets/fonts/Quicksand-Bold.otf")
      })
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch",
    backgroundColor: "#2B2B2B",
    justifyContent: "center"
  },

  text: { color: "#fff" }
});
