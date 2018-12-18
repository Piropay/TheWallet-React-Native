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
class AutoMatedBudgets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalBudget: 0,
      budgets: [
        {
          category: "Food",
          label: "Food",
          amount: (this, props.profile.balance * 0.25)
        },
        {
          category: "Health",
          label: "Health",
          amount: (this, props.profile.balance * 0.05)
        },
        {
          category: "Emergency",
          label: "Emergency",
          amount: (this, props.profile.balance * 0.1)
        },
        {
          category: "Entertainment",
          label: "Entertainment",
          amount: (this, props.profile.balance * 0.2)
        },
        {
          category: "Transportation",
          label: "Transportation",
          amount: (this, props.profile.balance * 0.05)
        },
        {
          category: "Personal",
          label: "Personal",
          amount: (this, props.profile.balance * 0.2)
        }
      ],
      value: 50
    };

    this.handleBudgetAmountChange = this.handleBudgetAmountChange.bind(this);
    this.resetBudgets = this.resetBudgets.bind(this);
  }

  handleBudgetAmountChange = (value, i) => {
    const newAmount = this.state.budgets.map((budget, sidx) => {
      if (i !== sidx) return budget;

      return { ...budget, amount: value };
    });
    this.setState(prevState => ({
      budgets: newAmount,
      value: parseFloat(value)
    }));
  };

  handleSubmitBudget = totalBudget => {
    this.state.budgets.forEach(budget => {
      let { amount, category, label } = { ...budget };
    });
    if (totalBudget < this.props.profile.balance) {
      this.state.budgets.forEach(budget =>
        this.props.addBudget(budget, this.props.navigation)
      );
    } else {
      alert(
        "Please make sure that you fill in all the boxes and that you're total budgets don't exceed your current balance"
      );
    }
  };

  resetBudgets() {
    this.setState({
      ...this.state,
      budgets: [
        {
          category: "Food",
          label: "Food",
          amount: (this, this.props.profile.balance * 0.25)
        },
        {
          category: "Health",
          label: "Health",
          amount: (this, this.props.profile.balance * 0.05)
        },
        {
          category: "Emergency",
          label: "Emergency",
          amount: (this, this.props.profile.balance * 0.1)
        },
        {
          category: "Entertainment",
          label: "Entertainment",
          amount: (this, this.props.profile.balance * 0.2)
        },
        {
          category: "Transportation",
          label: "Transportation",
          amount: (this, this.props.profile.balance * 0.05)
        },
        {
          category: "Personal",
          label: "Personal",
          amount: (this, this.props.profile.balance * 0.2)
        }
      ]
    });
  }
  render() {
    let totalBudget = 0;
    this.state.budgets.forEach(budget => (totalBudget += budget.amount));
    const inputRows = this.state.budgets.map((idx, i) => (
      <Row key={`${i}`}>
        <Grid>
          <Row>
            <View style={styles.inputWrap}>
              <Text style={styles.label}>Label</Text>
              <View style={styles.inputContainer}>
                <TextInput value={idx.label} style={styles.inputs} />
              </View>
            </View>
          </Row>

          <Slider
            step={1}
            maximumValue={this.props.profile.balance}
            value={idx.amount}
            onValueChange={value =>
              this.handleBudgetAmountChange(parseFloat(value), i)
            }
          />
          <Text style={styles.text}>
            {String(
              ((idx.amount / this.props.profile.balance) * 100).toFixed(1)
            )}
            %
          </Text>
          <Text>{String(idx.amount)} KWD</Text>
        </Grid>
      </Row>
    ));

    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <Grid>
          <H1>Current Balance {this.props.profile.balance} KD</H1>
          <H1>Current Total Budget: {totalBudget} KD</H1>

          <H1>Your budgets</H1>
          <Button full onPress={() => this.resetBudgets()}>
            <Text>Reset Budgets</Text>
          </Button>
          {inputRows}
        </Grid>

        <Button
          block
          full
          onPress={() => this.handleSubmitBudget(totalBudget)}
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
    addBudget: (budget, navigation) =>
      dispatch(actionCreators.addBudget(budget, navigation)),
    getBalance: (income, expenses) =>
      dispatch(actionCreators.getBalance(income, expenses))
  };
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(AutoMatedBudgets);
