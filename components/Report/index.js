import React, { Component } from "react";
import { Text, View, Image, ScrollView, AppState } from "react-native";
import styles from "./style";
import { connect } from "react-redux";
import { Button } from "native-base";
import * as actionCreators from "../../store/actions";
import { VictoryPie, VictoryLabel } from "victory-native";

class Report extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      appState: AppState.currentState
    };
  }

  sameBudget() {
    let oldBudgets = this.props.budgets.filter(budget => {
      let budDate = new Date(budget.date);
      let compDate = new Date(this.props.budgets[0].date);
      return budDate.getMonth() === compDate.getMonth();
    });
    oldBudgets.forEach(budget =>
      this.props.addBudget(
        {
          label: budget.label,
          category: budget.category,
          amount: budget.amount
        },
        this.props.navigation
      )
    );
    Toast.show({
      text: "Budgets Created Successfully",
      buttonText: "Okay",
      duration: 10000,
      type: "success",
      buttonTextStyle: { color: "#000" },
      buttonStyle: { backgroundColor: "#F1C04F", alignSelf: "center" }
    });

    this.props.navigation.replace("Budgets");
  }

  componentWillUnmount() {
    var today = new Date();
    if (this.props.budgets.length !== 0) {
      var compDate = new Date(
        this.props.budgets[this.props.budgets.length - 1].date
      );
      if (
        today.getMonth() !== compDate.getMonth() ||
        today.getFullYear() !== compDate.getFullYear()
      ) {
        this.sameBudget();
      }
    }
  }

  componentDidMount() {
    var today = new Date();
    if (this.props.budgets) {
      if (this.props.budgets.length !== 0) {
        var compDate = new Date(
          this.props.budgets[this.props.budgets.length - 1].date
        );
        if (
          today.getMonth() !== compDate.getMonth() ||
          today.getFullYear() !== compDate.getFullYear()
        ) {
          let tempBudgets = this.props.budgets.filter(budget => {
            let budDate = new Date(budget.date);
            return budDate.getMonth() === compDate.getMonth();
          });
          let savings = 0.0;
          let totalBudgets = 0.0;
          tempBudgets.forEach(budget => (savings += +budget.balance));
          tempBudgets.forEach(budget => (totalBudgets += +budget.amount));
          savings += +this.props.profile.balance - totalBudgets;
          let profile = this.props.profile;
          profile.savings = +profile.savings + savings;
          this.props.updateProfile(
            {
              phoneNo: profile.phoneNo,
              dob: profile.dob,
              gender: profile.gender,
              income: profile.income,
              balance: profile.balance,
              savings: profile.savings,
              automated: profile.automated
            },
            this.props.navigation
          );
          this.setState({ show: true });
          AppState.addEventListener("change", this._handleAppStateChange);
        }
      } else {
        this.props.navigation.replace("userBudgets");
      }
    }
  }

  _handleAppStateChange = nextAppState => {
    if (this.state.appState.match(/inactive|background/)) {
      this.props.navigation.replace("Home");
    }
    this.setState({ appState: AppState.currentState });
  };

  renderCard(budget) {
    let TotalTransactions = 0;
    budget.transactions.forEach(transaction => {
      TotalTransactions += parseFloat(transaction.amount);
    });
    return (
      <View key={budget.id} style={styles.card}>
        <Text style={styles.cardTittle}>Category: {budget.category}</Text>

        <Text> Label: {budget.label}</Text>
        <Text> Budget Balance: {budget.balance}</Text>
        <Text> Budget Amount: {budget.amount}</Text>
        <Text> Total Transactions: {TotalTransactions}</Text>
        <Text> Remaining budget balance: {TotalTransactions}</Text>
      </View>
    );
  }

  render() {
    const prof = this.props.profile;

    let { income, balance, savings } = { ...prof };

    let ListItems;
    var today = new Date();
    var compDate = new Date(
      this.props.budgets[this.props.budgets.length - 1].date
    );
    let totalPreviousBudgets = 0;
    let totalexpenses = 0;
    if (
      today.getMonth() !== compDate.getMonth() ||
      today.getFullYear() !== compDate.getFullYear()
    ) {
      let tempBudgets = this.props.budgets.filter(budget => {
        let budDate = new Date(budget.date);
        return budDate.getMonth() === compDate.getMonth();
      });

      tempBudgets.expenses.forEach(expense => {
        totalexpenses += parseFloat(expense.amount);
      });

      tempBudgets.forEach(budget => {
        totalPreviousBudgets += parseFloat(budget.amount);
      });
      ListItems = tempBudgets.map(budget => this.renderCard(budget));
    }

    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={[styles.card, styles.profileCard]}>
            <VictoryPie
              padAngle={3}
              innerRadius={50}
              radius={100}
              padding={100}
              labelRadius={110}
              startAngle={90}
              endAngle={450}
              labelComponent={<VictoryLabel angle={35} />}
              colorScale={["#278979", "#BA2D17", "#BEA647"]}
              animate={{
                duration: 2000
              }}
              data={[
                {
                  label: `Balance: \n ${(
                    (parseFloat(balance - totalPreviousBudgets) / income) *
                    100
                  ).toFixed(2)}%`,
                  x: 1,
                  y: parseFloat(balance - totalPreviousBudgets)
                },
                {
                  label: `Expenses:\n ${(
                    (parseFloat(totalexpenses) / income) *
                    100
                  ).toFixed(2)}%`,
                  x: 2,
                  y: parseFloat(totalexpenses)
                },
                {
                  label: `Budgets:\n ${(
                    (parseFloat(totalPreviousBudgets) / income) *
                    100
                  ).toFixed(2)}%`,
                  x: 3,
                  y: parseFloat(totalPreviousBudgets)
                }
              ]}
              style={{
                marginTop: 100,
                labels: {
                  fill: "#158900",
                  fontSize: 13,
                  fontWeight: "bold",
                  fontFamily: "quicksand-regular"
                }
              }}
            />
            <Text style={styles.name}>
              Your current balance: {this.props.profile.balance + "\n"}
              Your total used budget: {this.props.totalPreviousBudgets}
            </Text>
          </View>

          {ListItems}
        </View>
        {this.state.show ? (
          <View>
            <Button block onPress={() => this.sameBudget()}>
              <Text>Continue on same budget</Text>
            </Button>
            {this.props.profile.automated ? (
              <Button
                block
                onPress={() =>
                  this.props.navigation.navigate("AutomatedBudgets")
                }
              >
                <Text>Set New Budget</Text>
              </Button>
            ) : (
              <Button
                block
                onPress={() => this.props.navigation.navigate("userBudgets")}
              >
                <Text>Set New Budget</Text>
              </Button>
            )}
          </View>
        ) : (
          <View />
        )}
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.auth.profile,
  isAuthenticated: state.auth.isAuthenticated,
  budgets: state.budget.budgets,
  expenses: state.userInfo.expenses,
  totalUserBudget: state.budget.totalUserBudget
});
const mapDispatchToProps = dispatch => ({
  addBudget: (budget, navigation) =>
    dispatch(actionCreators.addBudget(budget, navigation)),
  updateProfile: (profile, navigation) =>
    dispatch(actionCreators.updateProfile(profile, navigation))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Report);
