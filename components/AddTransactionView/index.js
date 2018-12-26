import React from "react";
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import {
  Button,
  Form,
  Item,
  Picker,
  Icon,
  Input,
  H1,
  H3,
  Toast
} from "native-base";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions";
import styles from "./styles";

class AddTransactionView extends React.Component {
  static navigationOptions = {
    title: "Add Expanses"
  };
  constructor(props) {
    super(props);

    this.state = {
      budget: this.props.budget,
      amount: 0,
      label: ""
    };
  }

  sendTransaction() {
    if (this.state.budget === undefined) {
      Toast.show({
        text: "Please select a budget",
        buttonText: "Okay",
        duration: 6000,
        type: "danger",
        buttonTextStyle: { color: "#000" },
        buttonStyle: { backgroundColor: "#F1C04F", alignSelf: "center" }
      });
    } else if (this.state.label === "") {
      Toast.show({
        text: "Please enter a label",
        buttonText: "Okay",
        duration: 6000,
        type: "danger",
        buttonTextStyle: { color: "#000" },
        buttonStyle: { backgroundColor: "#F1C04F", alignSelf: "center" }
      });
    } else if (this.state.amount === 0) {
      Toast.show({
        text: "Please enter a valid value",
        buttonText: "Okay",
        duration: 6000,
        type: "danger",
        buttonTextStyle: { color: "#000" },
        buttonStyle: { backgroundColor: "#F1C04F", alignSelf: "center" }
      });
    } else {
      this.props.makeTransaction(
        { label: this.state.label, amount: this.state.amount },
        this.state.budget.id,
        this.props.navigation
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <H3 style={styles.h3}>Enter your transaction</H3>
        <Form>
          <Item style={styles.label}>
            <Input
              style={styles.inputs}
              placeholder="Transaction..."
              onChangeText={value => this.setState({ label: value })}
            />
          </Item>
          <Item style={styles.label}>
            <Input
              style={styles.inputs}
              placeholder="0.00"
              keyboardType="decimal-pad"
              onChangeText={value =>
                this.setState({ amount: parseFloat(value) })
              }
            />
            <Button
              block
              style={styles.button}
              onPress={() => this.sendTransaction()}
            >
              <Text style={{ color: "white" }}>+</Text>
            </Button>
          </Item>
        </Form>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.auth.profile,
  budgets: state.budget.budgets,
  transactions: state.transaction.transactions
});
const mapDispatchToProps = dispatch => ({
  updateBudget: (budget, navigation) =>
    dispatch(actionCreators.updateBudget(budget, navigation)),
  makeTransaction: (transaction, budget_id, navigation) =>
    dispatch(actionCreators.addTransaction(transaction, budget_id, navigation))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddTransactionView);
