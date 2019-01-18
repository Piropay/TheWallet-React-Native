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
import styles, { colors } from "./styles";
import { LinearGradient } from "expo";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/";

class IncomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNo: null,
      dob: null,
      gender: null,
      income: null,
      balance: 0,
      savings: 0.0,
      automated: false
    };
  }
  onClickListener = () => {
    this.props.UpdateProfile(this.state, this.props.navigation);
  };

  render() {
    return (
      <Container style={styles.container}>
        <LinearGradient
          colors={[colors.background1, colors.background2]}
          startPoint={{ x: 1, y: 0 }}
          endPoint={{ x: 0, y: 1 }}
          style={styles.gradient}
        />
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
          <H1
            style={[
              styles.h3,
              { fontSize: 45, paddingTop: 25, marginTop: 15, paddingBottom: 10 }
            ]}
          >
            Income
          </H1>
          <Card style={styles.shadow}>
            <CardItem style={{ borderRadius: 10 }}>
              <Body>
                <Text
                  style={{
                    alignSelf: "center",
                    textAlign: "center",
                    marginHorizontal: 10,
                    paddingVertical: 15,
                    color: "#2b2b2b",
                    paddingTop: 20,
                    paddingBottom: 10
                  }}
                >
                  Please enter your income below!
                </Text>
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
      dispatch(actionCreators.updateBalance(profile, navigation))
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
