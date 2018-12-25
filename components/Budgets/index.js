import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions";

import { Text, View, TextInput, ScrollView, Slider } from "react-native";

import { Row, Grid } from "react-native-easy-grid";
import {
  Button,
  H2,
  Item,
  Picker,
  Icon,
  Card,
  CardItem,
  Body,
  Toast
} from "native-base";
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
    const newAmount = this.state.budgets.map((budget, sidx) => {
      if (i !== sidx) return budget;

      return { ...budget, amount: value };
    });
    this.setState(prevState => ({
      budgets: newAmount,
      value: parseFloat(value)
    }));
  };

  handleAddBudget = () => {
    this.setState({
      budgets: this.state.budgets.concat([
        { category: "", label: "", amount: 0 }
      ])
    });
  };
  handleSubmitBudget = totalBudget => {
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
      currentTotalBudget + totalBudget < this.props.profile.balance
    ) {
      // this.state.budgets.forEach(budget =>
      //   this.props.addBudget(budget, this.props.navigation)
      // );
      this.props.addBudget(this.state.budgets, this.props.navigation);
      // this.props.navigation.navigate("Home");
      Toast.show({
        text: "Budgets Successfully added!",
        buttonText: "Okay",
        duration: 6000,
        type: "success",
        buttonTextStyle: { color: "#000" },
        buttonStyle: { backgroundColor: "#F1C04F", alignSelf: "center" }
      });
    } else {
      Toast.show({
        text:
          "Please make sure that you fill in all the boxes and that you're total budgets don't exceed your current balance!",
        buttonText: "Okay",
        duration: 10000,
        type: "danger",
        buttonTextStyle: { color: "#000" },
        buttonStyle: { backgroundColor: "#F1C04F", alignSelf: "center" }
      });
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
    let totalBudget = 0;
    this.props.budgets.forEach(
      budget => (totalBudget += parseFloat(budget.amount))
    );
    const inputRows = this.state.budgets.map((idx, i) => (
      <Row key={`${i}`}>
        <Card style={styles.shadow}>
          <Button
            type="button"
            onPress={() => this.handleRemoveBudget(i)}
            style={styles.closeButton}
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
                  placeholder="Food, etc..."
                  value={idx.label}
                  style={styles.inputs}
                  onChangeText={value => this.handleBudgetLabelChange(value, i)}
                />
              </Item>
            </Body>
          </CardItem>

          <Row style={{ alignSelf: "center" }}>
            <Item picker>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="ios-arrow-dropdown" />}
                placeholder="Select the Budget"
                placeholderStyle={{ color: "#278979" }}
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
            style={{ width: 200, alignSelf: "center" }}
            step={1}
            maximumValue={
              parseFloat(this.props.profile.balance) - parseFloat(totalBudget)
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
                  (parseFloat(this.props.profile.balance) -
                    parseFloat(totalBudget))) *
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
          <H2
            style={[
              styles.h3,
              { fontSize: 35, paddingTop: 23, paddingBottom: 10 }
            ]}
          >
            Your budgets
          </H2>
          <H2
            style={[
              styles.h3,
              {
                fontFamily: "quicksand-bold",
                textShadowOffset: { width: 0, height: 0 }
              }
            ]}
          >
            Balance {parseFloat(this.props.profile.balance).toFixed(3)} KD
          </H2>
          <H2
            style={[
              styles.h3,
              {
                fontFamily: "quicksand-bold",
                textShadowOffset: { width: 0, height: 0 }
              }
            ]}
          >
            balance left:
            {(
              parseFloat(this.props.profile.balance) - parseFloat(totalBudget)
            ).toFixed(3)}
            KD
          </H2>

          {inputRows}
        </Grid>
        <Button
          style={styles.button}
          block
          full
          onPress={() => this.handleAddBudget()}
        >
          <Text
            style={{
              fontFamily: "pacifico-regular",
              color: "white",
              fontSize: 15
            }}
          >
            Add
          </Text>
        </Button>
        <Button
          block
          full
          onPress={() => this.handleSubmitBudget(totalBudget)}
          style={[styles.button, { backgroundColor: "#278979" }]}
        >
          <Text
            style={{
              fontFamily: "pacifico-regular",
              color: "white",
              fontSize: 15
            }}
          >
            Submit
          </Text>
        </Button>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.auth.profile,
  budgets: state.budget.budgets
});

const mapActionsToProps = dispatch => {
  return {
    addBudget: (budgets, navigation) =>
      dispatch(actionCreators.addBudget(budgets, navigation)),
    getBalance: (income, expenses) =>
      dispatch(actionCreators.getBalance(income, expenses))
  };
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(userBudgets);
