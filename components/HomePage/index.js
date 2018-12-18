import React, { Component } from "react";
import { connect } from "react-redux";

import { StyleSheet, View, StatusBar, Image, ScrollView } from "react-native";
import { Thumbnail, Card, Button, Content, Text } from "native-base";

// Style
import styles from "./styles";

class HomePage extends Component {
  componentDidMount() {}
  static navigationOptions = {
    header: null
  };
  render() {
    return (
      <ScrollView style={{ backgroundColor: "transparent" }}>
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

export default HomePage;
