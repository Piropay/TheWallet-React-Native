import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/authActions";
import styles, { colors } from "./styles";
import { LinearGradient } from "expo";

import { StyleSheet, View, StatusBar, Image, ScrollView } from "react-native";
import {
  Thumbnail,
  Card,
  Button,
  Content,
  Text,
  Label,
  CardItem,
  Body,
  Form,
  Item,
  Input,
  Container,
  Icon,
  H1
} from "native-base";

class Signup extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      confirm: ""
    };
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
              height: 200,
              width: 200,
              margin: 15
            }}
            source={require("../../assets/images/logo2.png")}
            resizeMode="contain"
          />
          <Card style={styles.shadow}>
            <CardItem style={{ borderRadius: 10 }}>
              <Body
                style={{
                  paddingHorizontal: 40
                }}
              >
                <H1 style={styles.header}>Signup!</H1>
                <Item style={styles.label}>
                  <Icon
                    active
                    name="person"
                    style={{
                      color: "#585858"
                    }}
                  />
                  <Input
                    placeholder="Username"
                    autoCorrect={false}
                    autoCapitalize="none"
                    onChangeText={value => this.setState({ username: value })}
                  />
                </Item>
                <Item style={styles.label}>
                  <Icon
                    active
                    name="key"
                    style={{
                      color: "#585858"
                    }}
                  />
                  <Input
                    placeholder="Password"
                    secureTextEntry={true}
                    autoCorrect={false}
                    autoCapitalize="none"
                    onChangeText={value => this.setState({ password: value })}
                  />
                </Item>
                <Item>
                  <Icon
                    active
                    name="key"
                    style={{
                      color: "#585858"
                    }}
                  />
                  <Input
                    placeholder="Confirm Password"
                    secureTextEntry={true}
                    autoCorrect={false}
                    autoCapitalize="none"
                    onChangeText={value => this.setState({ confirm: value })}
                  />
                </Item>
              </Body>
            </CardItem>

            <Button
              rounded
              dark
              style={styles.button}
              onPress={() => {
                if (
                  this.state.password === this.state.confirm &&
                  this.state.username !== ""
                )
                  this.props.signup(this.state, this.props.navigation);
                else {
                  alert("your passwords don't match");
                }
              }}
            >
              <Text style={styles.text}>Signup</Text>
            </Button>
          </Card>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  profile: state.auth.profile
});

const mapDispatchToProps = dispatch => ({
  signup: (userData, navigation) =>
    dispatch(actionCreators.signup(userData, navigation))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);
