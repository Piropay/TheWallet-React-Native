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

import { Input, CardItem, Body, Toast } from "native-base";

import { Row, Grid } from "react-native-easy-grid";
import { Button, H2, H1, Item, Picker, Icon, Container } from "native-base";
import styles, { colors } from "./styles";
import { LinearGradient } from "expo";
import { Card, KeyboardAvoidingView } from "react-native-paper";
class AutoMatedBudgets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalBudget: 0,
      budgets: [
        {
          category: "Food",
          label: "Food",
          amount: parseFloat(this.props.profile.balance * 0.25).toFixed(1)
        },
        {
          category: "Health",
          label: "Health",
          amount: parseFloat(this.props.profile.balance * 0.05).toFixed(1)
        },
        {
          category: "Emergency",
          label: "Emergency",
          amount: parseFloat(this.props.profile.balance * 0.1).toFixed(1)
        },
        {
          category: "Entertainment",
          label: "Entertainment",
          amount: parseFloat(this.props.profile.balance * 0.2).toFixed(1)
        },
        {
          category: "Transportation",
          label: "Transportation",
          amount: parseFloat(this.props.profile.balance * 0.05).toFixed(1)
        },
        {
          category: "Personal",
          label: "Personal",
          amount: parseFloat(this.props.profile.balance * 0.2).toFixed(1)
        }
      ],
      value: 50
    };

    this.handleBudgetAmountChange = this.handleBudgetAmountChange.bind(this);
    this.resetBudgets = this.resetBudgets.bind(this);
    this.handleSubmitBudget = this.handleSubmitBudget.bind(this);
  }

  handleBudgetAmountChange = (value, i) => {
    const newAmount = this.state.budgets.map((budget, sidx) => {
      if (i !== sidx) return budget;

      return { ...budget, amount: value.toFixed(1) };
    });
    this.setState(prevState => ({
      budgets: newAmount,
      value: parseFloat(value)
    }));
  };

  handleSubmitBudget = totalBudget => {
    if (totalBudget < this.props.profile.balance) {
      this.props.addBudget(
        this.state.budgets,
        this.props.navigation,
        this.props.profile
      );
    } else {
      Toast.show({
        text:
          "Please make sure that you're total budgets don't exceed your current balance",
        buttonText: "Okay",
        duration: 10000,
        type: "danger",
        buttonTextStyle: { color: "#000" },
        buttonStyle: { backgroundColor: "#F1C04F", alignSelf: "center" }
      });
    }
  };

  resetBudgets() {
    this.setState({
      ...this.state,
      budgets: [
        {
          category: "Food",
          label: "Food",
          amount: parseFloat(this.props.profile.balance * 0.25).toFixed(1)
        },
        {
          category: "Health",
          label: "Health",
          amount: parseFloat(this.props.profile.balance * 0.05).toFixed(1)
        },
        {
          category: "Emergency",
          label: "Emergency",
          amount: parseFloat(this.props.profile.balance * 0.1).toFixed(1)
        },
        {
          category: "Entertainment",
          label: "Entertainment",
          amount: parseFloat(this.props.profile.balance * 0.2).toFixed(1)
        },
        {
          category: "Transportation",
          label: "Transportation",
          amount: parseFloat(this.props.profile.balance * 0.05).toFixed(1)
        },
        {
          category: "Personal",
          label: "Personal",
          amount: parseFloat(this.props.profile.balance * 0.2).toFixed(1)
        }
      ]
    });
  }
  render() {
    let totalBudget = 0;
    this.state.budgets.forEach(
      budget => (totalBudget += parseFloat(budget.amount))
    );
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
          step={10}
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
        <H2
          style={[
            styles.h3,
            {
              fontFamily: "quicksand-bold",
              textShadowOffset: { width: 0, height: 0 }
            }
          ]}
        >
          Balance {parseFloat(this.props.profile.balance).toFixed(3)} KD {"\n"}{" "}
          Total Budget {totalBudget.toFixed(3)} KD
        </H2>
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
              styles.h3,
              {
                fontFamily: "quicksand-bold",
                textShadowOffset: { width: 0, height: 0 },
                fontSize: 20,
                color: "#000"
              }
            ]}
          >
            These are the suggested budgets for you!
          </Text>

          <ScrollView
            contentContainerStyle={{ paddingBottom: 150, paddingTop: 30 }}
          >
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
    addBudget: (budgets, navigation, profile) =>
      dispatch(actionCreators.addBudget(budgets, navigation, "auto", profile)),

    updateProfile: (profile, navigation) =>
      dispatch(actionCreators.updateProfile(profile, navigation)),
    fetchProfile: () => dispatch(actionCreators.fetchProfile())
  };
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(AutoMatedBudgets);
