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
  Body
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
      this.props.navigation.replace("Budgets");
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
            Balance {this.props.profile.balance} KD
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
            {this.props.profile.balance - this.props.totalUserBudget} KD
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
          onPress={() => this.handleSubmitBudget()}
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
