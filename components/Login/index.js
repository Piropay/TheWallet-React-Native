import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/authActions";
import styles, { colors } from "./styles";
import { LinearGradient } from "expo";
import { Image } from "react-native";
import {
  Card,
  Button,
  Content,
  Text,
  CardItem,
  Body,
  Item,
  Input,
  Container,
  Icon,
  H1
} from "native-base";
class Login extends Component {
  static navigationOptions = {
    title: "Login"
  };
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  static navigationOptions = {
    header: null
  };

  isEmpty(obj) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
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
                <H1 style={styles.header}>Login!</H1>
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
                    onChangeText={value => {
                      this.setState({ username: value });
                    }}
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
                    placeholder="password"
                    secureTextEntry={true}
                    autoCorrect={false}
                    autoCapitalize="none"
                    onChangeText={value => this.setState({ password: value })}
                  />
                </Item>
              </Body>
            </CardItem>
            <CardItem
              style={{
                alignSelf: "center"
              }}
            >
              <Button
                rounded
                dark
                style={styles.button}
                onPress={() => {
                  this.props.login(this.state, this.props.navigation, "login");
                }}
              >
                <Text style={styles.text}>Login</Text>
              </Button>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  error: state.auth.error,
  profile: state.auth.profile
});

const mapDispatchToProps = dispatch => ({
  login: (userData, navigation) =>
    dispatch(actionCreators.login(userData, navigation, "login")),
  reserError: () => dispatch(actionCreators.setErrors())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
