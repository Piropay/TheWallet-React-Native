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
class userBudgets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalBudget: 0,
      budgets: [{ category: "", label: "", amount: 0 }],
      value: 50,
      Food: 0.25,
      Health: 0.05,
      Emergency: 0.1,
      Entertainment: 0.2,
      Transportation: 0.05,
      Personal: 0.2
    };
    this.handleAddBudget = this.handleAddBudget.bind(this);
    this.handleBudgetLabelChange = this.handleBudgetLabelChange.bind(this);
    this.handleBudgetAmountChange = this.handleBudgetAmountChange.bind(this);
    this.onValueChange2 = this.onValueChange2.bind(this);
  }

  handleBudgetLabelChange = (value, i) => {
    const newLable = this.state.budgets.map((budget, sidx) => {
      if (i !== sidx) return budget;
      return { ...budget, label: value };
    });

    this.setState({ budgets: newLable });
  };

  handleBudgetAmountChange = (value, i) => {
    // let oldAmount = 0;
    // let value = 0;
    // if (e.nativeEvent.text.length > 0) {
    //   value = parseFloat(e.nativeEvent.text);
    // }
    // value = parseFloat(value);

    // if (
    //   this.state.totalBudget < this.props.balance &&
    //   value + this.state.totalBudget < this.props.balance
    // ) {
    const newAmount = this.state.budgets.map((budget, sidx) => {
      if (i !== sidx) return budget;
      // oldAmount = budget.amount;

      return { ...budget, amount: value };
    });
    this.setState(prevState => ({
      budgets: newAmount,
      value: parseFloat(value)
      // totalBudget: prevState.totalBudget - parseFloat(oldAmount) + value
      // totalBudget: prevState.totalBudget - oldAmount + value
    }));
    // } else {
    //   alert("You can't exceed your current balance");
    // }
  };

  handleAddBudget = () => {
    this.setState({
      budgets: this.state.budgets.concat([
        { category: "", label: "", amount: 0 }
      ])
    });
  };
  handleSubmitBudget = () => {
    let filled = false;
    let currentTotalBudget = 0;

    this.state.budgets.forEach(budget => {
      let { amount, category, label } = { ...budget };
      if (category !== "" && label !== "" && amount !== 0) {
        filled = true;
        currentTotalBudget += amount;
      } else {
        filled = false;
      }
    });
    if (
      filled &&
      currentTotalBudget + this.props.totalUserBudget <
        this.props.profile.balance
    ) {
      this.state.budgets.forEach(budget =>
        this.props.addBudget(budget, this.props.navigation)
      );
    } else {
      alert(
        "Please make sure that you fill in all the boxes and that you're total budgets don't exceed your current balance"
      );
    }
  };
  handleRemoveBudget = i => {
    this.setState({
      budgets: this.state.budgets.filter((budget, sidx) => {
        if (i !== sidx) return budget;
      })
    });
  };

  onValueChange2(category, i) {
    const newCategory = this.state.budgets.map((budget, sidx) => {
      if (i !== sidx) return budget;
      // if (this.props.profile.automated) {
      //   let precentage = this.state[category];
      //   console.log("precentage: " + precentage);
      //   let newAmount =
      //     (parseFloat(this.props.profile.balance) -
      //       this.props.totalUserBudget) *
      //     precentage;
      //   console.log("newAmount: " + newAmount);

      //   return {
      //     ...budget,
      //     category: category,
      //     amount: newAmount
      //   };
      // } else {
      return { ...budget, category: category };
    });

    this.setState({
      budgets: newCategory
    });
  }
  change(value) {
    this.setState(() => {
      return {
        value: parseFloat(value)
      };
    });
  }
  render() {
    // console.log(this.state.budgets);

    const inputRows = this.state.budgets.map((idx, i) => (
      <Row key={`${i}`}>
        <Grid>
          <Row>
            <View style={styles.inputWrap}>
              <Text style={styles.label}>Label</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  value={idx.label}
                  style={styles.inputs}
                  onChangeText={value => this.handleBudgetLabelChange(value, i)}
                />
              </View>
            </View>

            {/* <View style={styles.inputWrap}>
              <Text style={styles.label}>Amount</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.inputs}
                  keyboardType="numeric"
                  defaultValue={idx.amount + ""}
                  clearTextOnFocus={true}
                  // onChangeText={value =>
                  //   this.handleBudgetAmountChange(parseFloat(value), i)
                  // }
                  onEndEditing={e =>
                    this.handleBudgetAmountChange(
                      parseFloat(e.nativeEvent.text),
                      i
                    )
                  }
                />
              </View>
            </View> */}
            <Button
              type="button"
              onPress={() => this.handleRemoveBudget(i)}
              style={{ width: 30, justifyContent: "center", marginTop: 13 }}
            >
              <Text>x</Text>
            </Button>
          </Row>

          <Row>
            <Item picker>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="ios-arrow-dropdown" />}
                placeholder="Select the Budget"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={idx.category}
                onValueChange={value => this.onValueChange2(value, i)}
              >
                <Picker.Item key={1} label={"Food"} value={"Food"} />
                <Picker.Item key={2} label={"Health"} value={"Health"} />
                <Picker.Item key={3} label={"Emergency"} value={"Emergency"} />
                <Picker.Item
                  key={4}
                  label={"Entertainment"}
                  value={"Entertainment"}
                />
                <Picker.Item
                  key={5}
                  label={"Transportation"}
                  value={"Transportation"}
                />
                <Picker.Item key={6} label={"Personal"} value={"Personal"} />

                <Picker.Item key={7} label={"Others"} value={"Others"} />
              </Picker>
            </Item>
          </Row>
          <Slider
            step={1}
            maximumValue={
              this.props.profile.balance - this.props.totalUserBudget
            }
            onValueChange={this.change.bind(this)}
            value={idx.amount}
            onValueChange={value =>
              this.handleBudgetAmountChange(parseFloat(value), i)
            }
          />
          <Text style={styles.text}>
            {String(
              (
                (idx.amount /
                  (this.props.profile.balance - this.props.totalUserBudget)) *
                100
              ).toFixed(1)
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
          <H1>
            Current balance left:{" "}
            {this.props.profile.balance - this.props.totalUserBudget} KD
          </H1>

          <H1>Your budgets</H1>
          {inputRows}
        </Grid>
        <Button block full onPress={() => this.handleAddBudget()}>
          <Text>Add</Text>
        </Button>
        <Button
          block
          full
          onPress={() => this.handleSubmitBudget()}
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
)(userBudgets);
