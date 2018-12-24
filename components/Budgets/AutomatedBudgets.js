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

import { Input, CardItem, Body } from "native-base";

import { Row, Grid } from "react-native-easy-grid";
import { Button, H2, Item, Picker, Icon } from "native-base";
import styles from "./styles";
import { Card } from "react-native-paper";
class AutoMatedBudgets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalBudget: 0,
      budgets: [
        {
          category: "Food",
          label: "Food",
          amount: this.props.profile.balance * 0.25
        },
        {
          category: "Health",
          label: "Health",
          amount: this.props.profile.balance * 0.05
        },
        {
          category: "Emergency",
          label: "Emergency",
          amount: this.props.profile.balance * 0.1
        },
        {
          category: "Entertainment",
          label: "Entertainment",
          amount: this.props.profile.balance * 0.2
        },
        {
          category: "Transportation",
          label: "Transportation",
          amount: this.props.profile.balance * 0.05
        },
        {
          category: "Personal",
          label: "Personal",
          amount: this.props.profile.balance * 0.2
        }
      ],
      value: 50
    };

    this.handleBudgetAmountChange = this.handleBudgetAmountChange.bind(this);
    this.resetBudgets = this.resetBudgets.bind(this);
  }

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

  handleSubmitBudget = totalBudget => {
    this.state.budgets.forEach(budget => {
      let { amount, category, label } = { ...budget };
    });
    if (totalBudget < this.props.profile.balance) {
      this.state.budgets.forEach(budget =>
        this.props.addBudget(budget, this.props.navigation)
      );
      // for (let budget in this.state.budgets) {
      //   await this.props.addBudget(budget, this.props.navigation);
      // }
      let profile = this.props.profile;
      // let totalE = 0;
      // this.props.expenses.forEach(expense => (totalE += expense.amount));

      profile.automated = true;
      // profile.balance = profile.income - totalE;
      // console.log(profile);
      profile = { ...profile };
      console.log(profile);

      this.props.updateProfile(profile, this.props.navigation);
      // this.props.navigation.navigate("Home");
    } else {
      alert(
        "Please make sure that you fill in all the boxes and that you're total budgets don't exceed your current balance"
      );
    }
  };

  resetBudgets() {
    this.setState({
      ...this.state,
      budgets: [
        {
          category: "Food",
          label: "Food",
          amount: this.props.profile.balance * 0.25
        },
        {
          category: "Health",
          label: "Health",
          amount: this.props.profile.balance * 0.05
        },
        {
          category: "Emergency",
          label: "Emergency",
          amount: this.props.profile.balance * 0.1
        },
        {
          category: "Entertainment",
          label: "Entertainment",
          amount: this.props.profile.balance * 0.2
        },
        {
          category: "Transportation",
          label: "Transportation",
          amount: this.props.profile.balance * 0.05
        },
        {
          category: "Personal",
          label: "Personal",
          amount: this.props.profile.balance * 0.2
        }
      ]
    });
  }
  render() {
    let totalBudget = 0;
    this.state.budgets.forEach(budget => (totalBudget += budget.amount));
    const inputRows = this.state.budgets.map((idx, i) => (
      <Row key={`${i}`}>
        <Card style={styles.shadow}>
          <CardItem style={{ borderRadius: 10 }}>
            <Body
              style={{
                paddingHorizontal: 40
              }}
            >
              <Item style={styles.label}>
                <View>
                  <Input value={idx.label} />
                </View>
              </Item>
            </Body>
          </CardItem>
          <Slider
            style={{ width: 200, alignSelf: "center" }}
            step={1}
            maximumValue={this.props.profile.balance}
            value={idx.amount}
            onValueChange={value =>
              this.handleBudgetAmountChange(parseFloat(value), i)
            }
          />
          <Text style={styles.text}>
            {String(
              ((idx.amount / this.props.profile.balance) * 100).toFixed(1)
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
              { fontSize: 35, paddingTop: 20, paddingBottom: 10 }
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
            Balance {this.props.profile.balance} KD {"\n"} Total Budget{" "}
            {totalBudget} KD
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
            {" "}
          </H2>

          {inputRows}
        </Grid>
        <Button style={styles.button} full onPress={() => this.resetBudgets()}>
          <Text>Reset Budgets</Text>
        </Button>
        <Button
          style={styles.button}
          block
          full
          onPress={() => this.handleSubmitBudget(totalBudget)}
        >
          <Text>Submit</Text>
        </Button>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  expenses: state.userInfo.expenses,
  profile: state.auth.profile,
  totalUserBudget: state.budget.totalUserBudget
});

const mapActionsToProps = dispatch => {
  return {
    addBudget: (budget, navigation) =>
      dispatch(actionCreators.addBudget(budget, navigation)),

    updateProfile: (profile, navigation) =>
      dispatch(actionCreators.updateProfile(profile, navigation)),
    fetchProfile: () => dispatch(actionCreators.fetchProfile())
  };
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(AutoMatedBudgets);
