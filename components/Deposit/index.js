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

  sendDeposit() {
    if (this.state.amount === 0) {
      Toast.show({
        text: "Please enter a valid value",
        buttonText: "Okay",
        duration: 6000,
        type: "danger",
        buttonTextStyle: { color: "#000" },
        buttonStyle: { backgroundColor: "#F1C04F", alignSelf: "center" }
      });
    } else {
      // let setGoal = this.props.goals.find(b => {
      //   if (b.id === this.state.goal.id) {
      //     return b;
      //   }
      //   return false;
      // });
      // setGoal.amount = setGoal.amount - this.state.amount;

      this.props.addDeposit(
        this.state.amount,
        this.props.goal.id,
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
              onChangeText={value =>
                this.setState({ amount: parseFloat(value) })
              }
            />
            <Button
              style={styles.button}
              block
              onPress={() => this.sendDeposit()}
            >
              <Text style={{ color: "white" }}>+</Text>
            </Button>
          </Item>
        </Form>

        <View />
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
