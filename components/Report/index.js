import React, { Component } from "react";
import { Text, View, Image, ScrollView, AppState } from "react-native";
import styles from "./style";
import { connect } from "react-redux";
import { Button } from "native-base";
import * as actionCreators from "../../store/actions";

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
    alert("Budgets Created Successfully");
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
    let ListItems;
    var today = new Date();
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

      ListItems = tempBudgets.map(budget => this.renderCard(budget));
    }

    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={[styles.card, styles.profileCard]}>
            <Image
              style={styles.avatar}
              source={{
                uri: "https://bootdey.com/img/Content/avatar/avatar6.png"
              }}
            />
            <Text style={styles.name}>
              Your current balance: {this.props.profile.balance + "\n"}
              Your total used budget: {this.props.totalUserBudget}
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
