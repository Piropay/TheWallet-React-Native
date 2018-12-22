import React from "react";
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, Form, Item, Picker, Icon, Input, H1, H3 } from "native-base";
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
      alert("Please select a budget");
    } else if (this.state.label === "") {
      alert("Please enter a label");
    } else if (this.state.amount === 0) {
      alert("Please enter a valid value");
    } else {
      // let setBudget = this.props.budgets.find(b => {
      //   if (b.id === this.state.budget) {
      //     return b;
      //   }
      //   return false;
      // });
      // setBudget.balance = setBudget.balance - this.state.amount;
      // await this.props.updateBudget(setBudget, this.props.navigation);
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
          </Item>
        </Form>

        <View>
          <Button
            block
            style={styles.button}
            onPress={() => this.sendTransaction()}
          >
            <Text style={{ color: "white" }}>ADD</Text>
          </Button>
        </View>
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
