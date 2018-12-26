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
import { Button, List, Card, CardItem, Body, H3, Container } from "native-base";
import { WebBrowser } from "expo";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions";
import styles, { colors } from "./styles";
import { LinearGradient } from "expo";

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
        style={styles.card}
      >
        <Card style={styles.shadow}>
          <CardItem>
            <Body>
              <H3 style={{ color: "#BEA647", fontFamily: "quicksand-bold" }}>
                {budget.label}
              </H3>
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
      <Container>
        <LinearGradient
          colors={[colors.background1, colors.background2]}
          startPoint={{ x: 1, y: 0 }}
          endPoint={{ x: 0, y: 1 }}
          style={styles.gradient}
        />
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
      </Container>
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
