import React, { Component } from "react";
import { connect } from "react-redux";
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

import { Input, CardItem, Body } from "native-base";

import { Row, Grid } from "react-native-easy-grid";
import { Button, H1, Item, Picker, Icon, Card } from "native-base";
import styles from "./styles";

class UpdateBudget extends Component {
  constructor(props) {
    super(props);
    let budget = this.props.navigation.getParam("budget", {});

    this.state = {
      id: budget.id,
      category: budget.category,
      label: budget.label,
      amount: parseFloat(budget.amount),
      balance: budget.balance
    };
  }

  handleSubmitBudget = async budget => {
    let filled = false;
    let newBalance = 0;
    let { amount, category, label, balance } = { ...this.state };
    if (category !== "" && label !== "") {
      filled = true;
    } else {
      filled = false;
    }
    newBalance = this.state.amount - budget.amount + parseFloat(balance);

    if (
      filled &&
      amount + this.props.totalUserBudget < this.props.profile.balance
    ) {
      await this.setState({ balance: newBalance });
      this.props.updateBudget(this.state, this.props.navigation);
    } else {
      alert(
        "Please make sure that you fill in all the boxes and that you're total budgets don't exceed your current balance"
      );
    }
  };

  render() {
    let budget = this.props.navigation.getParam("budget", {});
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
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
            Balance {this.props.profile.balance} KD
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
            {this.props.profile.balance - this.props.totalUserBudget} KD
          </H1>

          <Row>
            <Card style={styles.shadow}>
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
                step={1}
                style={{ width: 200, alignSelf: "center" }}
                maximumValue={
                  this.props.profile.balance - this.props.totalUserBudget
                }
                value={this.state.amount}
                onValueChange={value => this.setState({ amount: value })}
              />
              <Text style={styles.text}>
                {String(
                  (
                    (this.state.amount /
                      (this.props.profile.balance -
                        this.props.totalUserBudget)) *
                    100
                  ).toFixed(1)
                )}
                %
              </Text>
              <Text style={styles.text}>{String(this.state.amount)} KWD</Text>
            </Card>
          </Row>
        </Grid>
        <Button
          style={styles.button}
          block
          full
          onPress={() => this.handleSubmitBudget(budget)}
        >
          <Text>Submit</Text>
        </Button>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.auth.profile,
  totalUserBudget: state.budget.totalUserBudget
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
