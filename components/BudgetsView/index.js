import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl
} from "react-native";
import { Button, List, Card, CardItem, Body } from "native-base";
import { WebBrowser } from "expo";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions";
import styles from "./styles";

class BudgetsView extends React.Component {
  static navigationOptions = {
    title: "Budgets"
  };

  state = { refreshing: false };
  renderCard(budget) {
    return (
      <TouchableOpacity
        key={budget.id}
        onPress={() =>
          this.props.navigation.navigate("BudgetDetails", {
            budget: budget
          })
        }
      >
        <Card>
          <CardItem>
            <Body>
              <Text>{budget.label}</Text>
              <Text>{budget.category}</Text>
              <Text>{parseFloat(budget.balance).toFixed(3)}KWD</Text>
            </Body>
          </CardItem>
        </Card>
      </TouchableOpacity>
    );
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.props.fetchBudgets();

    this.setState({ refreshing: false });
  };
  render() {
    var today = new Date();
    const budgets = this.props.budgets.filter(budget => {
      let date = new Date(budget.date);
      if (
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      ) {
        return budget;
      }
    });

    let ListItems;
    if (budgets) {
      ListItems = budgets.map(budget => this.renderCard(budget));
    }
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
        >
          <List>{ListItems}</List>
        </ScrollView>
        <View>
          {!this.props.profile.automated && (
            <Button
              block
              warning
              onPress={() => this.props.navigation.navigate("userBudgets")}
            >
              <Text style={{ color: "white" }}> ADD Budget</Text>
            </Button>
          )}
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.auth.profile,
  budgets: state.budget.budgets
});
const mapDispatchToProps = dispatch => ({
  fetchBudgets: () => dispatch(actionCreators.fetchBudgets())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BudgetsView);
