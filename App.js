import React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { AppLoading, Asset, Font, Icon } from "expo";
import AppNavigator from "./navigation/AppNavigator";
import { Provider } from "react-redux";
import { checkForExpiredToken } from "./store/actions/authActions";
import ActionButton from "react-native-action-button";
import { Icon as BIcon, Root } from "native-base";
// Store
import store from "./store";
class App extends React.Component {
  state = {
    isLoadingComplete: false
  };

  componentDidMount() {
    store.dispatch(checkForExpiredToken());
  }

  render() {
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
            <StatusBar
              barStyle="light-content"
              hidden={false}
              backgroundColor="#2B2B2B"
            />
            {/* not functional yet */}
            {/* <ActionButton
                position="center"
                offsetY={20}
                buttonColor="rgba(231,76,60,1)"
                style={{ zIndex: 1 }}
              >
                <ActionButton.Item
                  buttonColor="#9b59b6"
                  title="Add Goals"
                  onPress={() =>
                    this.props.navigation.navigate("Goals", {
                      budget: budget
                    })
                  }
                >
                  <BIcon
                    name="md-create"
                    style={{
                      fontSize: 20,
                      height: 22,
                      color: "white"
                    }}
                  />
                </ActionButton.Item>

                <ActionButton.Item
                  buttonColor="#1abc9c"
                  title="Add Budgets"
                  onPress={() => this.props.navigation.navigate("userBudgets")}
                >
                  <BIcon
                    name="add-to-list"
                    type="Entypo"
                    style={{
                      fontSize: 20,
                      height: 22,
                      color: "white"
                    }}
                  />
                </ActionButton.Item>
              </ActionButton>
             */}
            <Root>
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
