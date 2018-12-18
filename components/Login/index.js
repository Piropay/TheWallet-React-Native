import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/authActions";
import { AsyncStorage } from "react-native";
// NativeBase Components
import {
  Text,
  Button,
  Body,
  List,
  ListItem,
  Form,
  Label,
  Input,
  Item,
  Content,
  Header
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
  componentDidMount() {
    if (this.props.user) {
      this.props.navigation.replace("Home");
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.profile !== this.props.profile) {
      this.props.navigation.replace("Home");
    }
  }
  render() {
    return (
      <Content>
        <Header transparent />
        <List>
          <ListItem style={{ borderBottomWidth: 0 }}>
            <Body>
              <Form>
                <Body>
                  <Label style={{ color: "white" }}>Username</Label>
                </Body>
                <Item
                  rounded
                  style={{
                    backgroundColor: "white",
                    marginTop: 10,
                    marginBottom: 10
                  }}
                >
                  <Input
                    autoCorrect={false}
                    autoCapitalize="none"
                    onChangeText={value => this.setState({ username: value })}
                  />
                </Item>
                <Body>
                  <Label style={{ color: "white" }}>Password</Label>
                </Body>
                <Item
                  rounded
                  style={{ backgroundColor: "white", marginTop: 10 }}
                >
                  <Input
                    autoCorrect={false}
                    secureTextEntry
                    autoCapitalize="none"
                    onChangeText={value => this.setState({ password: value })}
                  />
                </Item>
              </Form>
            </Body>
          </ListItem>
          <Button
            full
            success
            onPress={() => this.props.login(this.state, this.props.navigation)}
          >
            <Text>Login</Text>
          </Button>
          <Button
            full
            warning
            onPress={() => {
              this.props.signup(this.state, this.props.navigation);
            }}
          >
            <Text>Register</Text>
          </Button>
        </List>
        <Body>
          <Label style={{ color: "red", opacity: 0.6 }} />
        </Body>
      </Content>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  profile: state.auth.profile
});

const mapDispatchToProps = dispatch => ({
  signup: (userData, navigation) =>
    dispatch(actionCreators.signup(userData, navigation)),
  login: (userData, navigation) =>
    dispatch(actionCreators.login(userData, navigation))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
