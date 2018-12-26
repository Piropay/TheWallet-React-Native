import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
  AppState,
  Dimensions,
  TouchableOpacity
} from "react-native";
import styles, { colors } from "./style";
import { connect } from "react-redux";
import { Button, Container, Toast } from "native-base";
import * as actionCreators from "../../store/actions";
import { VictoryPie, VictoryLabel } from "victory-native";
import ProgressBarAnimated from "react-native-progress-bar-animated";
import { LinearGradient } from "expo";

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
    const barWidth = Dimensions.get("screen").width - 70;

    const progressCustomStyles = {
      backgroundColor: "#F1C04F",
      borderRadius: 20,
      borderColor: "orange"
    };
    let TotalTransactions = 0;
    budget.transactions.forEach(transaction => {
      TotalTransactions += parseFloat(transaction.amount);
    });
    return (
      <TouchableOpacity
        key={budget.id}
        onPress={() =>
          this.props.navigation.navigate("BudgetDetails", {
            budget: budget
          })
        }
        style={styles.shadow}
      >
        <View key={budget.id} style={styles.card}>
          <Text style={styles.h3}> {budget.category}</Text>

          <Text style={styles.title}> {budget.label}</Text>

          <Text style={styles.info}>
            Budget amount: {parseFloat(budget.amount).toFixed(3)} KD
          </Text>
          <Text style={styles.info}>
            Total Transactions: {TotalTransactions.toFixed(3)} KD
          </Text>
          {/* <Text style={styles.info}>
          Remaining budget balance: {TotalTransactions}
        </Text> */}
          <ProgressBarAnimated
            {...progressCustomStyles}
            width={barWidth}
            value={(TotalTransactions / budget.amount) * 100}
            maxValue={parseFloat(budget.amount)}
          />
          <Text style={[styles.number]} numberOfLines={2}>
            {((TotalTransactions / budget.amount) * 100).toFixed(1)}%
          </Text>
        </View>
      </TouchableOpacity>
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
    let totalPreviousBalance = 0;
    let TotalTransactions = 0;
    let tempBudgets = [];
    if (
      // today.getMonth() !== compDate.getMonth() ||
      // today.getFullYear() !== compDate.getFullYear()
      true
    ) {
      tempBudgets = this.props.budgets.filter(budget => {
        let budDate = new Date(budget.date);
        return budDate.getMonth() === compDate.getMonth();
      });

      tempBudgets.forEach(budget =>
        budget.transactions.forEach(transaction => {
          TotalTransactions += parseFloat(transaction.amount);
        })
      );

      tempBudgets.forEach(budget => {
        totalPreviousBudgets += parseFloat(budget.amount);
        totalPreviousBalance += parseFloat(budget.balance);
      });
      ListItems = this.props.budgets.map(budget => this.renderCard(budget));
    }

    return (
      <Container>
        <LinearGradient
          colors={[colors.background1, colors.background2]}
          startPoint={{ x: 1, y: 0 }}
          endPoint={{ x: 0, y: 1 }}
          style={styles.gradient}
        />
        <ScrollView>
          <View style={styles.container}>
            <View>
              <VictoryPie
                padAngle={3}
                innerRadius={50}
                radius={100}
                padding={100}
                labelRadius={110}
                startAngle={90}
                endAngle={450}
                labelComponent={<VictoryLabel angle={0} />}
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
                      (parseFloat(TotalTransactions) / income) *
                      100
                    ).toFixed(2)}%`,
                    x: 2,
                    y: parseFloat(TotalTransactions)
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
                    fill: "#fff",
                    fontSize: 13,
                    fontWeight: "bold",
                    fontFamily: "quicksand-regular"
                  }
                }}
              />
              <Text style={styles.details}>
                {" "}
                Income {parseFloat(this.props.profile.income).toFixed(
                  3
                )} KD {"\n "}
                Balance {parseFloat(this.props.profile.balance).toFixed(
                  3
                )} KD {"\n "}
                Total budgets {parseFloat(totalPreviousBudgets).toFixed(
                  3
                )} KD {"\n "}
                Left over money{" "}
                {parseFloat(
                  this.props.profile.balance - totalPreviousBudgets
                ).toFixed(3)}{" "}
                KD
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
      </Container>
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
