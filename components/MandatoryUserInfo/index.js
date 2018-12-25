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
import {
  Button,
  H1,
  Input,
  Card,
  CardItem,
  Body,
  Item,
  Icon,
  Content,
  Container
} from "native-base";
import styles from "./styles";
class AddExpenseView extends Component {
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
      this.props.navigation.navigate("Automation");
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
  };

  render() {
    let totalexpenses = 0;
    this.props.expenses.forEach(expense => {
      totalexpenses += parseFloat(expense.amount);
    });

    const inputRows = this.state.expenses.map((idx, i) => (
      <View key={`${i}`}>
        <Button
          style={styles.closeButton}
          type="button"
          onPress={() => this.handleRemoveExpense(idx, i)}
        >
          <Icon
            active
            name="key"
            style={{
              color: "#585858"
            }}
          />
        </Button>

        <Item style={styles.label}>
          <Icon
            active
            name="cash"
            style={{
              color: "#585858"
            }}
          />
          <Input
            placeholder="Title"
            onChangeText={value => this.handleExpenseLabelChange(value, i)}
          />
        </Item>

        <Text style={styles.label}>Amount</Text>

        <Item style={styles.label}>
          <Icon
            active
            name="cash"
            style={{
              color: "#585858"
            }}
          />
          <Input
            maximumValue={this.props.profile.income - totalexpenses}
            placeholder="0.000"
            keyboardType="numeric"
            onChangeText={value =>
              this.handleExpenseAmountChange(parseFloat(value), i)
            }
          />
        </Item>
        <Text style={styles.text}>
          {String(
            (
              (idx.amount / (this.props.profile.income - totalexpenses)) *
              100
            ).toFixed(1)
          )}
          %
        </Text>
      </View>
    ));
    return (
      <Container style={styles.container}>
        <H1
          style={[
            styles.h3,
            { fontSize: 35, paddingTop: 20, marginTop: 15, paddingBottom: 10 }
          ]}
        >
          Mandatory expenses
        </H1>

        <View style={{ flexDirection: "row", alignSelf: "center" }}>
          <Button
            style={styles.greenbutton}
            rounded
            dark
            onPress={() => this.handleAddExpense()}
          >
            <Text style={styles.buttontext}>Add</Text>
          </Button>
          <Button
            style={[styles.button]}
            rounded
            dark
            onPress={() => this.handleSubmitExpenses()}
          >
            <Text style={styles.buttontext}>Submit</Text>
          </Button>
        </View>
        <Card padder style={styles.mainCard}>
          <Text
            style={[
              styles.text,
              {
                color: "#2b2b2b",
                paddingTop: 20,
                paddingBottom: 10
              }
            ]}
          >
            Pleasse add your rent, installments, bills... etc or any reccuring
            monthly spendings.
          </Text>
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <Content>{inputRows}</Content>
          </ScrollView>
        </Card>
      </Container>
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
)(AddExpenseView);
