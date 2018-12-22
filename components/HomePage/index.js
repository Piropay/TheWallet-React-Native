import React, { Component } from "react";
import { connect } from "react-redux";

import { StyleSheet, View, StatusBar, Image, ScrollView } from "react-native";
import { Thumbnail, Card, Button, Content, Text, H1 } from "native-base";
import * as actionCreators from "../../store/actions";

// Style
import styles from "./styles";

class HomePage extends Component {
  componentDidMount() {}
  componentDidUpdate() {
    console.log(this.props.profile);
    try {
      if (this.props.fetched) {
        if (this.props.profile.income !== null)
          this.props.navigation.navigate("Home");
        else {
          this.props.navigation.navigate("SetIncome");
        }
      }
    } catch (e) {
    } finally {
    }
  }
  static navigationOptions = {
    header: null
  };
  render() {
    return (
      <ScrollView
        contentContainerStyle={{ top: 40, alignItems: "center" }}
        style={{ backgroundColor: "transparent" }}
      >
        <Image
          style={{
            alignSelf: "center",
            height: 230,
            width: 230
          }}
          source={require("../../assets/images/logo2.png")}
          resizeMode="contain"
        />
        <Image
          style={{
            alignSelf: "center",
            height: 250,
            width: 250
          }}
          source={require("../../assets/images/jama3t.png")}
          resizeMode="contain"
        />
        <Button
          rounded
          block
          dark
          style={styles.login}
          onPress={() => this.props.navigation.navigate("Login")}
        >
          <Text style={styles.text}>Login</Text>
        </Button>
        <Button
          rounded
          block
          dark
          style={styles.signup}
          onPress={() => this.props.navigation.navigate("Signup")}
        >
          <Text style={styles.text}>Signup</Text>
        </Button>
      </ScrollView>
    );
  }
}
const mapStateToProps = state => ({
  user: state.auth.user,
  profile: state.auth.profile,
  isAuthenticated: state.auth.isAuthenticated,
  income: state.userInfo.income,
  fetched: state.auth.fetched
});

const mapDispatchToProps = dispatch => ({
  fetchBudgets: () => dispatch(actionCreators.fetchBudgets()),
  checkForExpiredToken: () => dispatch(actionCreators.checkForExpiredToken())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
