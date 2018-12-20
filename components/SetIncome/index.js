import React, { Component } from "react";
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
import { Row } from "react-native-easy-grid";
import styles from "./styles";

import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/";

class IncomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNo: this.props.profile.phoneNo,
      dob: this.props.profile.dob,
      gender: this.props.profile.gender,
      income: this.props.profile.income,
      balance: 0,
      savings: this.props.profile.savings,
      automated: this.props.profile.automated
    };
  }
  onClickListener = () => {
    console.log(this.state);

    this.props.UpdateProfile(this.state, this.props.navigation);
  };

  onValueChange2(value) {
    this.setState({
      gender: value
    });
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
              <Body>
                <Row>
                  <Card style={styles.circle}>
                    <Text style={styles.number}>1</Text>
                  </Card>
                  <Text style={styles.header}>
                    Please enter your income below!
                  </Text>
                </Row>
                <Item style={styles.label}>
                  <Icon
                    active
                    name="cash"
                    style={{
                      color: "#585858"
                    }}
                  />
                  <Input
                    placeholder="0.000"
                    keyboardType="numeric"
                    onChangeText={income =>
                      this.setState({ income, balance: income })
                    }
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
                onPress={() => this.onClickListener()}
              >
                <Text style={styles.text}>Next</Text>
              </Button>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

const mapActionsToProps = dispatch => {
  return {
    UpdateProfile: (profile, navigation) =>
      dispatch(actionCreators.updateProfile(profile, navigation))
  };
};

const mapStateToProps = state => ({
  income: state.userInfo.income,
  expenses: state.userInfo.expenses,
  profile: state.auth.profile
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(IncomePage);
