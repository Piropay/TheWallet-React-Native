import React from "react";
import { Text, View } from "react-native";
import { Button, Form, Item, Input, H3, Toast } from "native-base";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions";
import styles from "./styles";

class UpdateExpenseView extends React.Component {
  static navigationOptions = {
    title: "Add Expanses"
  };
  constructor(props) {
    super(props);

    this.state = {
      amount: this.props.expense.amount,
      label: this.props.expense.label
    };
  }

  sendTransaction() {
    if (this.state.label === "") {
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
      this.props.updateExpense(this.props.expense.id, this.state);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <H3 style={styles.h3}>Update your expense</H3>
        <Form>
          <Item style={styles.label}>
            <Input
              style={styles.inputs}
              defaultValue={this.state.label}
              onChangeText={value => this.setState({ label: value })}
            />
          </Item>
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
  profile: state.auth.profile
});
const mapDispatchToProps = dispatch => ({
  updateExpense: (expense_id, expense) =>
    dispatch(actionCreators.updateExpense(expense_id, expense))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateExpenseView);
