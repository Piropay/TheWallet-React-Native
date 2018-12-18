import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/";

import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView
} from "react-native";
import { Row, Grid } from "react-native-easy-grid";
import { Button, H1, Input } from "native-base";
import styles from "./styles";
class mandatoryInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalExpense: 0,
      expenses: [{ label: "", amount: 0 }]
    };
    this.handleExpenseLabelChange = this.handleExpenseLabelChange.bind(this);
    this.handleExpenseAmountChange = this.handleExpenseAmountChange.bind(this);
    this.handleAddExpense = this.handleAddExpense.bind(this);
  }

  handleExpenseLabelChange = (value, i) => {
    const newLable = this.state.expenses.map((expense, sidx) => {
      if (i !== sidx) return expense;
      return { ...expense, label: value + "" };
    });

    this.setState({ expenses: newLable });
  };

  handleExpenseAmountChange = async (value, i) => {
    const newAmount = this.state.expenses.map((expense, sidx) => {
      if (i !== sidx) return expense;

      return {
        ...expense,
        amount: value
      };
    });

    this.setState({
      expenses: newAmount
    });
  };

  handleAddExpense = () => {
    this.setState({
      expenses: this.state.expenses.concat([{ label: "", amount: "0" }])
    });
  };
  handleSubmitExpenses = async () => {
    let filled = false;
    let totalExpense = 0;
    this.state.expenses.forEach(expense => {
      let { amount, label } = { ...expense };
      if (label !== "" && amount !== 0) {
        filled = true;
        totalExpense += amount;
      } else {
        filled = false;
      }
    });

    if (filled && totalExpense < this.props.profile.income) {
      for (let expense of this.state.expenses) {
        await this.props.addExpenses(expense);
      }
    } else {
      alert(
        "Please fill in all boxes and make sure that your expenses don't exceed your income"
      );
    }
  };
  handleRemoveExpense = async (idx, i) => {
    this.setState({
      expenses: this.state.expenses.filter((expense, sidx) => {
        if (i !== sidx) return expense;
      })
    });
    console.log(this.state.expenses);
  };

  render() {
    const inputRows = this.state.expenses.map((idx, i) => (
      <Row key={`${i}`}>
        <View style={styles.inputWrap}>
          <Text style={styles.label}>Label</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputs}
              value={idx.label}
              onChangeText={value => this.handleExpenseLabelChange(value, i)}
            />
          </View>
        </View>

        <View style={styles.inputWrap}>
          <Text style={styles.label}>Amount</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputs}
              keyboardType="numeric"
              clearTextOnFocus={true}
              defaultValue={idx.amount + ""}
              onEndEditing={e =>
                this.handleExpenseAmountChange(
                  parseFloat(e.nativeEvent.text),
                  i
                )
              }
            />
          </View>
        </View>
        <Button
          type="button"
          onPress={() => this.handleRemoveExpense(idx, i)}
          style={{ width: 30, justifyContent: "center", marginTop: 13 }}
        >
          <Text>x</Text>
        </Button>
      </Row>
    ));
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <Grid>
          <H1>Income: {this.props.profile.income} </H1>

          {/* 
          <Row>
            <View style={styles.inputWrap}>
              <Text style={styles.label}>Income</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  keyboardType="numeric"
                  style={styles.inputs}
                  onChangeText={value => this.setState({ income: value })}
                />
              </View>
            </View>
          </Row> */}
          <H1>Mandatory expenses</H1>
          {inputRows}
        </Grid>
        <Button block full onPress={() => this.handleAddExpense()}>
          <Text>Add</Text>
        </Button>
        <Button
          block
          full
          onPress={() => this.handleSubmitExpenses()}
          style={{ marginTop: 10 }}
        >
          <Text>Submit</Text>
        </Button>
        <Button
          block
          full
          onPress={() => this.props.logout(this.props.navigation)}
          style={{ marginTop: 10 }}
        >
          <Text>logout</Text>
        </Button>
      </ScrollView>
    );
  }
}
const mapStateToProps = state => ({
  income: state.userInfo.income,
  expenses: state.userInfo.expenses,
  profile: state.auth.profile
});

const mapActionsToProps = dispatch => {
  return {
    addIncome: (Income, navigation) =>
      dispatch(actionCreators.addIncome(Income, navigation)),
    addExpenses: (expenses, navigation) =>
      dispatch(actionCreators.addExpenses(expenses, navigation)),
    getBalance: (income, expenses) =>
      dispatch(actionCreators.getBalance(income, expenses)),
    logout: navigation => dispatch(actionCreators.logout(navigation))
  };
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(mandatoryInfo);
