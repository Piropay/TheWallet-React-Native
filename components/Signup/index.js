import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/authActions";
import styles from "./styles";

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
      password: ""
    };
  }

  render() {
    return (
      <Container style={styles.container}>
        <Content padder>
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
                  />
                </Item>
              </Body>
            </CardItem>

            <Button
              rounded
              dark
              style={styles.button}
              onPress={() =>
                this.props.signup(this.state, this.props.navigation)
              }
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
