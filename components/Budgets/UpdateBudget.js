import React, { Component } from "react";
import { connect } from "react-redux";
import { LinearGradient } from "expo";

import * as actionCreators from "../../store/actions";

import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  Slider
} from "react-native";

import { Input, CardItem, Body, Toast, Container } from "native-base";

import { Row, Grid } from "react-native-easy-grid";
import { Button, H1, Item, Picker, Icon, Card } from "native-base";
import styles, { colors } from "./styles";

class UpdateBudget extends Component {
  constructor(props) {
    super(props);
    let budget = this.props.navigation.getParam("budget", {});

    this.state = {
      id: budget.id,
      category: budget.category,
      label: budget.label,
      amount: parseFloat(budget.balance),
      balance: budget.balance
    };
  }

  handleSubmitBudget = async (budget, totalBudgets) => {
    let filled = false;
    let newBalance = 0;
    let { amount, category, label, balance } = { ...this.state };
    if (category !== "" && label !== "") {
      filled = true;
    } else {
      filled = false;
    }
    newBalance = this.state.amount - budget.amount + parseFloat(balance);

    if (filled && amount + totalBudgets < this.props.profile.balance) {
      await this.setState({ balance: newBalance });
      this.props.updateBudget(this.state, this.props.navigation);
    } else {
      Toast.show({
        text:
          "Please make sure that you're total budgets don't exceed your current balance!",
        buttonText: "Okay",
        duration: 10000,
        type: "danger",
        buttonTextStyle: { color: "#000" },
        buttonStyle: { backgroundColor: "#F1C04F", alignSelf: "center" }
      });
    }
  };

  render() {
    let budget = this.props.navigation.getParam("budget", {});
    let totalBudgets = this.props.totalBudget;

    return (
      <Container style={styles.container}>
        <LinearGradient
          colors={[colors.background1, colors.background2]}
          startPoint={{ x: 1, y: 0 }}
          endPoint={{ x: 0, y: 1 }}
          style={styles.gradient}
        />
        <Grid>
          <H1
            style={[
              styles.h3,
              { fontSize: 35, paddingTop: 20, paddingBottom: 10 }
            ]}
          >
            Your budget
          </H1>
          <H1
            style={[
              styles.h3,
              {
                fontFamily: "quicksand-bold",
                textShadowOffset: { width: 0, height: 0 }
              }
            ]}
          >
            Balance {parseFloat(this.props.profile.balance).toFixed(3)} KD
          </H1>
          <H1
            style={[
              styles.h3,
              {
                fontFamily: "quicksand-bold",
                textShadowOffset: { width: 0, height: 0 }
              }
            ]}
          >
            balance left:
            {(this.props.profile.balance - totalBudgets).toFixed(3)} KD
          </H1>
          <Button
            style={[styles.button]}
            block
            rounded
            dark
            onPress={() => this.handleSubmitBudget(budget, totalBudgets)}
          >
            <Text style={styles.buttontext}>Submit</Text>
          </Button>
          <Row>
            <Card padder style={styles.mainCard}>
              <CardItem style={{ borderRadius: 10 }}>
                <Body
                  style={{
                    paddingHorizontal: 40
                  }}
                >
                  <Item style={styles.label}>
                    <TextInput
                      value={this.state.label}
                      style={styles.inputs}
                      onChangeText={value => this.setState({ label: value })}
                    />
                  </Item>
                </Body>
              </CardItem>
              <Slider
                step={5}
                style={{ width: 200, alignSelf: "center" }}
                minimumValue={0}
                maximumValue={
                  this.props.profile.balance > 0
                    ? this.props.profile.balance - totalBudgets
                    : 100
                }
                value={this.state.amount}
                onValueChange={value => this.setState({ amount: value })}
              />
              <Text style={styles.text}>
                {String(
                  (
                    (this.state.amount /
                      (this.props.profile.balance - totalBudgets)) *
                    100
                  ).toFixed(1)
                )}
                %
              </Text>
              <Text style={styles.text}>{String(this.state.amount)} KWD</Text>
            </Card>
          </Row>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.auth.profile,
  totalBudget: state.budget.totalUserBudget
});

const mapActionsToProps = dispatch => {
  return {
    updateBudget: (budget, navigation) =>
      dispatch(actionCreators.updateBudget(budget, navigation))
  };
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(UpdateBudget);
