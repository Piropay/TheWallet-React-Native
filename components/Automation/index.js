import React, { Component } from "react";
import { connect } from "react-redux";

import { Image } from "react-native";
import { Button, Content, Text, Container } from "native-base";
import * as actionCreators from "../../store/actions";

// Style
import styles, { colors } from "./styles";
import { LinearGradient } from "expo";

class Automation extends Component {
  static navigationOptions = {
    header: null
  };
  componentDidMount() {
    this.props.fetchProfile();
  }
  render() {
    return (
      <Container>
        <LinearGradient
          colors={[colors.background1, colors.background2]}
          startPoint={{ x: 1, y: 0 }}
          endPoint={{ x: 0, y: 1 }}
          style={styles.gradient}
        />
        <Content padder style={styles.container}>
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
        </Content>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchProfile: () => dispatch(actionCreators.fetchProfile())
});
export default connect(
  null,
  mapDispatchToProps
)(Automation);
