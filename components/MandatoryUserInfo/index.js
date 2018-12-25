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
  ScrollView,
  Slider
} from "react-native";
import { Row, Grid } from "react-native-easy-grid";
import { Button, H1, Input, Card, CardItem, Body, Item } from "native-base";
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
    if (this.state.expenses.length === 0) {
      this.props.navigation.navigate("Automation");
    } else if (filled && totalExpense < this.props.profile.income) {
      await this.props.addExpenses(this.state.expenses, this.props.navigation);

      // this.props.navigation.navigate("Automation");
    } else {
      Toast.show({
        text:
          "Please fill in all boxes and make sure that your expenses don't exceed your income",
        buttonText: "Okay",
        duration: 10000,
        type: "danger",
        buttonTextStyle: { color: "#000" },
        buttonStyle: { backgroundColor: "#F1C04F", alignSelf: "center" }
      });
    }
  };
  handleRemoveExpense = async (idx, i) => {
    this.setState({
      expenses: this.state.expenses.filter((expense, sidx) => {
        if (i !== sidx) return expense;
      })
    });
  };

  render() {
    let totalexpenses = 0;
    this.props.expenses.forEach(expense => {
      totalexpenses += parseFloat(expense.amount);
    });

    const inputRows = this.state.expenses.map((idx, i) => (
      <Row key={`${i}`}>
        <Card style={styles.shadow}>
          <Button
            style={styles.closeButton}
            type="button"
            onPress={() => this.handleRemoveExpense(idx, i)}
          >
            <Text>x</Text>
          </Button>

          <CardItem style={{ borderRadius: 10 }}>
            <Body
              style={{
                paddingHorizontal: 40
              }}
            >
              <Item style={styles.label}>
                <TextInput
                  style={styles.inputs}
                  value={idx.label}
                  onChangeText={value =>
                    this.handleExpenseLabelChange(value, i)
                  }
                />
              </Item>
            </Body>
          </CardItem>

          <Text style={styles.label}>Amount</Text>

          <Slider
            step={1}
            maximumValue={this.props.profile.income - totalexpenses}
            value={idx.amount}
            onValueChange={value =>
              this.handleExpenseAmountChange(parseFloat(value), i)
            }
          />
          <Text style={styles.text}>
            {String(
              (
                (idx.amount / (this.props.profile.income - totalexpenses)) *
                100
              ).toFixed(1)
            )}
            %
          </Text>
          <Text style={styles.text}>{String(idx.amount)} KWD</Text>
        </Card>
      </Row>
    ));
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
            Mandatory expenses
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
            Your Income: {this.props.profile.income}{" "}
          </H1>

          {inputRows}
        </Grid>
        <Button
          style={styles.button}
          block
          full
          onPress={() => this.handleAddExpense()}
        >
          <Text>Add</Text>
        </Button>
        <Button
          style={[styles.button, { backgroundColor: "#278979" }]}
          block
          full
          onPress={() => this.handleSubmitExpenses()}
        >
          <Text>Submit</Text>
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
