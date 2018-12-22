import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { Button, Form, Item, Picker, Icon, Input, H3 } from "native-base";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions";
import styles from "./styles";

class AddDeposit extends React.Component {
  static navigationOptions = {
    title: "Add Deposit"
  };
  constructor(props) {
    super(props);
    this.state = {
      goal: this.props.goal,
      amount: 0
    };
  }
  onValueChange2(value) {
    this.setState({
      goal: value
    });
  }
  sendDeposit() {
    if (this.state.goal === undefined) {
      alert("Please select a goal");
    } else if (this.state.amount === 0) {
      alert("Please enter a valid value");
    } else {
      let setGoal = this.props.goals.find(b => {
        if (b.id === this.state.goal.id) {
          return b;
        }
        return false;
      });
      setGoal.amount = setGoal.amount - this.state.amount;

      this.props.addDeposit(
        { amount: this.state.amount },
        this.state.goal.id,
        this.props.navigation
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <H3 style={styles.h3}>Enter your deposit</H3>
        <Form>
          <Item style={styles.label}>
            <Input
              style={styles.inputs}
              placeholder="0.00 KWD"
              keyboardType="decimal-pad"
              onChangeText={value => this.setState({ amount: parseInt(value) })}
            />
          </Item>
        </Form>

        <View>
          <Button
            style={styles.button}
            block
            onPress={() => this.sendDeposit()}
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
  goals: state.goal.goals,
  deposits: state.deposit.deposits
});
const mapDispatchToProps = dispatch => ({
  updateGoal: (goal, navigation) =>
    dispatch(actionCreators.updateGoal(goal, navigation)),
  addDeposit: (deposit, goal_id, navigation) =>
    dispatch(actionCreators.addDeposit(deposit, goal_id, navigation))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddDeposit);
