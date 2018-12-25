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
import { Button, H2, H1, Item, Picker, Icon, Container } from "native-base";
import styles, { colors } from "./styles";
import { LinearGradient } from "expo";
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
      <View key={`${i}`}>
        <View
          style={{
            flex: 1,
            marginHorizontal: 25,
            flexDirection: "row"
          }}
        >
          <Card style={styles.circle}>
            <Text style={styles.number}>{`${i + 1}`}</Text>
          </Card>
          <Text style={{ marginTop: 5, fontSize: 20 }}> {idx.label}</Text>
        </View>
        <View
          style={{
            flex: 1,
            marginHorizontal: 90,
            flexDirection: "row",
            marginVertical: 10
          }}
        >
          <Icon
            active
            name="ios-cash"
            style={{
              color: "#585858",
              marginRight: 5
            }}
          />
          <Text style={styles.text}>{String(idx.amount)} KWD</Text>
          <Text style={styles.text}>
            {String(
              ((idx.amount / this.props.profile.balance) * 100).toFixed(1)
            )}
            %
          </Text>
        </View>
        <Slider
          minimumTrackTintColor="#258779"
          style={{ width: 200, alignSelf: "center" }}
          step={1}
          maximumValue={this.props.profile.balance}
          value={idx.amount}
          onValueChange={value =>
            this.handleBudgetAmountChange(parseFloat(value), i)
          }
        />
        <View
          style={{
            borderBottomColor: "#b2b2b2",
            borderBottomWidth: 1,
            marginHorizontal: 25,
            marginVertical: 20
          }}
        />
      </View>
    ));

    return (
      <Container style={styles.container}>
        <LinearGradient
          colors={[colors.background1, colors.background2]}
          startPoint={{ x: 1, y: 0 }}
          endPoint={{ x: 0, y: 1 }}
          style={styles.gradient}
        />
        <H1
          style={[
            styles.h3,
            { fontSize: 35, paddingTop: 20, marginTop: 15, paddingBottom: 10 }
          ]}
        >
          Budgets
        </H1>

        <View style={{ flexDirection: "row", alignSelf: "center" }}>
          <Button
            style={styles.greenbutton}
            full
            onPress={() => this.resetBudgets()}
          >
            <Text style={styles.buttontext}>Reset</Text>
          </Button>
          <Button
            style={styles.button}
            block
            full
            onPress={() => this.handleSubmitBudget(totalBudget)}
          >
            <Text style={styles.buttontext}>Submit</Text>
          </Button>
        </View>
        <Card padder style={styles.mainCard}>
          <Text
            style={[
              styles.text,
              {
                color: "#2b2b2b",
                paddingTop: 20
              }
            ]}
          >
            These are the suggested budgets for you!
          </Text>

          <ScrollView contentContainerStyle={styles.contentContainer}>
            {inputRows}
          </ScrollView>
        </Card>
      </Container>
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
