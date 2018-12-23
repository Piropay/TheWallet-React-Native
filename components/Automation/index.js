import React, { Component } from "react";
import { connect } from "react-redux";

import { StyleSheet, View, StatusBar, Image, ScrollView } from "react-native";
import { Thumbnail, Card, Button, Content, Text, H1 } from "native-base";
import * as actionCreators from "../../store/actions";

// Style
import styles from "./styles";

class Automation extends Component {
  static navigationOptions = {
    header: null
  };
  render() {
    let profile = this.props.profile;
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

        <Text style={styles.header}>
          Would you like to automate your budgets?
        </Text>
        <Button
          rounded
          block
          dark
          style={styles.login}
          onPress={() => {
            this.props.navigation.navigate("Automated");
          }}
        >
          <Text style={styles.text}>Yes</Text>
        </Button>
        <Button
          rounded
          block
          dark
          style={styles.signup}
          onPress={() => this.props.navigation.navigate("CreateBudgets")}
        >
          <Text style={styles.text}>No</Text>
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
)(Automation);
