import React, { Component } from "react";
import { Text, View, Image, ScrollView } from "react-native";
import styles from "./style";
import { connect } from "react-redux";

class Report extends Component {
  constructor(props) {
    super(props);
  }

  renderCard(budget) {
    let TotalTransactions = 0;
    budget.transactions.forEach(transaction => {
      TotalTransactions += parseFloat(transaction.amount);
      //   console.log(parseFloat(transaction.amount));
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
    const budgets = this.props.budgets;
    let ListItems;
    if (budgets) {
      // console.log(budgets);

      ListItems = budgets.map(budget => this.renderCard(budget));
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
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.auth.profile,
  budgets: state.budget.budgets,
  totalUserBudget: state.budget.totalUserBudget
});
//   const mapDispatchToProps = dispatch => ({
//     fetchBudgets: () => dispatch(actionCreators.fetchBudgets())
//   });
export default connect(mapStateToProps)(Report);
