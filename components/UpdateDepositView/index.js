import React from "react";
import { Text, View } from "react-native";
import { Button, Form, Item, Input, H3, Toast } from "native-base";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions";
import styles from "./styles";

class UpdateDepositView extends React.Component {
  static navigationOptions = {
    title: "Add Expanses"
  };
  constructor(props) {
    super(props);

    this.state = {
      goal: this.props.goal,
      amount: this.props.deposit.amount
    };
  }

  sendTransaction() {
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
      this.props.updateDeposit(
        this.props.deposit.id,
        this.state.amount,
        this.state.goal.id,
        this.props.navigation
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <H3 style={styles.h3}>Update your deposit</H3>
        <Form>
          <Item style={styles.label}>
            <Input
              style={styles.inputs}
              defaultValue={this.state.amount}
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
  goals: state.goal.goals,
  deposits: state.deposit.deposits
});
const mapDispatchToProps = dispatch => ({
  updateDeposit: (deposit_id, deposit, goal_id, navigation) =>
    dispatch(
      actionCreators.updateDeposit(deposit_id, deposit, goal_id, navigation)
    )
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateDepositView);
