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

class ExpensesList extends React.Component {
  static navigationOptions = {
    title: "Budgets"
  };

  state = { refreshing: false };
  renderCard(expense) {
    return (
      <View key={expense.id} style={styles.card}>
        <Card style={styles.shadow}>
          <CardItem>
            <Body>
              <H3 style={{ color: "#BEA647", fontFamily: "quicksand-bold" }}>
                {expense.label}
              </H3>
              <Text>{expense.category}</Text>
              <Text>{parseFloat(expense.amount).toFixed(3)}KWD</Text>
            </Body>
          </CardItem>
        </Card>
      </View>
    );
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.props.fetchExpenes();

    this.setState({ refreshing: false });
  };
  render() {
    const expenses = this.props.expenses;
    let ListItems;
    if (expenses) {
      ListItems = expenses.map(expense => this.renderCard(expense));
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
          <Button
            block
            style={[
              styles.greenbutton,
              { marginHorizontal: 15, marginBottom: 10 }
            ]}
            onPress={() => this.props.navigation.navigate("mandatoryInfo")}
          >
            <Text style={styles.buttontext}> Add Expense</Text>
          </Button>
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
        </View>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.auth.profile,
  expenses: state.userInfo.expenses
});
const mapDispatchToProps = dispatch => ({
  fetchExpenes: () => dispatch(actionCreators.fetchExpenes())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExpensesList);
