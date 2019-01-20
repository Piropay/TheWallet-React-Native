import React from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
  ActionSheetIOS
} from "react-native";
import { Button, List, Card, CardItem, Body, H3, Container } from "native-base";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions";
import styles, { colors } from "./styles";
import { LinearGradient } from "expo";
import { Modal } from "react-native-paper";
import UpdateExpense from "../UpdateExpenseView";

class ExpensesList extends React.Component {
  static navigationOptions = {
    title: "Expenses"
  };

  state = { refreshing: false, expenseSelected: [], modalVisible: false };

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.props.fetchExpenses();
    this.setState({ refreshing: false });
  };
  clickEventListener = expense => {
    this.setState({ expenseSelected: expense }, () => {
      this.setModalVisible(true);
    });
  };
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  openContextMenu(expense) {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["Cancel", "Remove", "update"],
        destructiveButtonIndex: 1,
        cancelButtonIndex: 0
      },
      buttonIndex => {
        if (buttonIndex === 1) {
          this.props.deleteExpense(expense);
        } else if (buttonIndex === 2) this.clickEventListener(expense);
      }
    );
  }
  renderCard(expense) {
    return (
      <TouchableOpacity
        key={expense.id}
        onPress={() => this.openContextMenu(expense)}
        style={styles.card}
      >
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
      </TouchableOpacity>
    );
  }

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
          <Modal
            animationType={"slide"}
            transparent={true}
            onRequestClose={() => this.setModalVisible(false)}
            visible={this.state.modalVisible}
          >
            <View style={styles.popupOverlay}>
              <Card style={[styles.shadow, styles.popup]}>
                <View style={styles.popupContent}>
                  <Button style={styles.Header}>
                    <H3 style={styles.name}>Expense</H3>
                    <Button
                      transparent
                      onPress={() => {
                        this.setModalVisible(false);
                      }}
                      style={styles.btnClose}
                    >
                      <Text style={{ color: "wheat" }}>X</Text>
                    </Button>
                  </Button>

                  <ScrollView contentContainerStyle={styles.modalInfo}>
                    <UpdateExpense expense={this.state.expenseSelected} />
                  </ScrollView>
                </View>
              </Card>
            </View>
          </Modal>
        </View>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  expenses: state.userInfo.expenses
});
const mapDispatchToProps = dispatch => ({
  fetchExpenses: () => dispatch(actionCreators.fetchExpenses()),
  deleteExpense: expense => dispatch(actionCreators.deleteExpense(expense))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExpensesList);
