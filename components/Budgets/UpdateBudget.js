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

import { Input } from "native-base";

import { Row, Grid } from "react-native-easy-grid";
import { Button, H1, Item, Picker, Icon } from "native-base";
import styles from "./styles";

class UpdateBudget extends Component {
  constructor(props) {
    super(props);
    let budget = this.props.navigation.getParam("budget", {});

    this.state = {
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
    console.log(this.state.amount);
    console.log(budget.amount);
    console.log(balance);
    console.log(newBalance);

    if (
      filled &&
      amount + this.props.totalUserBudget < this.props.profile.balance
    ) {
      await this.setState({ balance: newBalance });
      this.props.updateBudget(this.state, budget.id, this.props.navigation);
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
          <H1>Current Balance {this.props.profile.balance} KD</H1>
          <H1>
            Current balance left:
            {this.props.profile.balance - this.props.totalUserBudget} KD
          </H1>

          <H1>Your budget</H1>
          <Row>
            <Grid>
              <Row>
                <View style={styles.inputWrap}>
                  <Text style={styles.label}>Label</Text>
                  <View style={styles.inputContainer}>
                    <TextInput
                      value={this.state.label}
                      style={styles.inputs}
                      onChangeText={value => this.setState({ label: value })}
                    />
                  </View>
                </View>
              </Row>

              <Slider
                step={1}
                maximumValue={
                  this.props.profile.balance - this.props.totalUserBudget
                }
                // onValueChange={this.change.bind(this)}
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
              <Text>{String(this.state.amount)} KWD</Text>
            </Grid>
          </Row>
        </Grid>
        <Button
          block
          full
          onPress={() => this.handleSubmitBudget(budget)}
          style={{ marginTop: 10 }}
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
    updateBudget: (budget, budget_id, navigation) =>
      dispatch(actionCreators.updateBudget(budget, budget_id, navigation))
  };
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(UpdateBudget);
