import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  ActivityIndicator
} from "react-native";
import * as actionCreators from "../../store/actions/authActions";

import { VictoryPie, VictoryLabel } from "victory-native";
import { connect } from "react-redux";
import ExpensesList from "../ExpensesList/ExpensesList";
import { Modal } from "react-native-paper";
import { Card, H2, Text, Button, H3, Container, Row } from "native-base";
import styles, { colors } from "./styles";
import { LinearGradient } from "expo";
class ProfileView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      modalVisible2: false,
      refreshing: false
    };
  }
  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.props.fetchProfile();

    this.setState({ refreshing: false });
  };
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  setModalVisible2(visible) {
    this.setState({ modalVisible2: visible });
  }
  static navigationOptions = ({ navigation }) => ({
    title: "Profile"
  });
  render() {
    const prof = this.props.profile;
    let { income, balance, savings } = { ...prof };
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
    let totalexpenses = 0;
    this.props.expenses.forEach(expense => {
      totalexpenses += parseFloat(expense.amount);
    });

    let totalBudgets = 0;

    budgets.forEach(budget => {
      totalBudgets += parseFloat(budget.amount);
    });
    if (!this.props.fetched) {
      return (
        <Container>
          <LinearGradient
            colors={[colors.background1, colors.background2]}
            startPoint={{ x: 1, y: 0 }}
            endPoint={{ x: 0, y: 1 }}
            style={styles.gradient}
          />
          <ActivityIndicator size="large" color="#fff" />
        </Container>
      );
    } else {
      return (
        <Container>
          <LinearGradient
            colors={[colors.background1, colors.background2]}
            startPoint={{ x: 1, y: 0 }}
            endPoint={{ x: 0, y: 1 }}
            style={styles.gradient}
          />
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
              />
            }
          >
            <View>
              <View style={styles.header}>
                <View>
                  <VictoryPie
                    padAngle={3}
                    innerRadius={50}
                    radius={100}
                    padding={100}
                    labelRadius={115}
                    startAngle={90}
                    endAngle={450}
                    labelComponent={<VictoryLabel angle={0} />}
                    colorScale={["#278979", "#BA2D17", "#BEA647"]}
                    animate={{
                      duration: 2000
                    }}
                    events={[
                      {
                        target: "data",
                        eventHandlers: {
                          onPress: () => {
                            return [
                              {
                                target: "data",
                                mutation: props => {
                                  if (props.slice.data.x === 2) {
                                    this.setModalVisible(true);
                                  } else if (props.slice.data.x === 3) {
                                    this.props.navigation.navigate("Budgets");
                                  } else if (props.slice.data.x === 1) {
                                    this.setModalVisible2(true);
                                  }
                                }
                              }
                            ];
                          }
                        }
                      }
                    ]}
                    data={[
                      {
                        label: `Balance \n ${(
                          (parseFloat(balance - totalBudgets) / income) *
                          100
                        ).toFixed(2)}%`,
                        x: 1,
                        y: parseFloat(balance - totalBudgets)
                      },
                      {
                        label: `Expenses\n ${(
                          (parseFloat(totalexpenses) / income) *
                          100
                        ).toFixed(2)}%`,
                        x: 2,
                        y: parseFloat(totalexpenses)
                      },
                      {
                        label: `Budgets\n ${(
                          (parseFloat(totalBudgets) / income) *
                          100
                        ).toFixed(2)}%`,
                        x: 3,
                        y: parseFloat(totalBudgets)
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

                  <Text style={styles.name}>
                    {this.props.user.username.toUpperCase()}
                  </Text>
                </View>
              </View>

              <View style={[styles.profileDetail, { flex: 1 }]}>
                <View style={styles.detailContent}>
                  <Text style={styles.title}>Income</Text>
                  <Text style={styles.count}>{income} KD</Text>
                </View>
                <View style={styles.detailContent}>
                  <Text style={styles.title}>Balance</Text>
                  <Text style={styles.count}>{balance} KD</Text>
                </View>
                <View style={styles.detailContent}>
                  <Text style={styles.title}>Savings</Text>
                  <Text style={styles.count}>{savings} KD</Text>
                </View>
              </View>
              <View
                style={[
                  {
                    marginVertical: 30,
                    alignSelf: "center"
                  }
                ]}
              >
                <Button
                  block
                  onPress={() => this.props.navigation.navigate("ExpensesList")}
                  style={[styles.button, { backgroundColor: "#BEA647" }]}
                >
                  <Text style={styles.buttontext}>Expenses</Text>
                </Button>
                <Button
                  block
                  onPress={() => this.props.navigation.navigate("Report")}
                  style={[styles.button, { backgroundColor: "#258779" }]}
                >
                  <Text style={styles.buttontext}>Report</Text>
                </Button>

                <Button
                  block
                  onPress={() => this.props.logout(this.props.navigation)}
                  style={[styles.button, { backgroundColor: "#BA2B15" }]}
                >
                  <Text style={styles.buttontext}>Logout</Text>
                </Button>
              </View>
            </View>
            <Modal
              animationType={"fade"}
              transparent={true}
              onRequestClose={() => this.setModalVisible(false)}
              visible={this.state.modalVisible}
            >
              <View style={styles.popupOverlay}>
                <Card style={[styles.shadow, styles.popup]}>
                  <View style={styles.popupContent}>
                    <ScrollView contentContainerStyle={styles.modalInfo}>
                      <H2 style={styles.h3}>Your Expenses</H2>

                      <ExpensesList />
                    </ScrollView>
                    <Button
                      block
                      warning
                      onPress={() =>
                        this.props.navigation.navigate("mandatoryInfo")
                      }
                    >
                      <Text style={{ color: "white" }}> ADD Expense</Text>
                    </Button>
                  </View>
                  <View style={styles.popupButtons}>
                    <Button
                      onPress={() => {
                        this.setModalVisible(false);
                      }}
                      style={styles.btnClose}
                    >
                      <Text style={{ color: "wheat" }}>Close</Text>
                    </Button>
                  </View>
                </Card>
              </View>
            </Modal>

            <Modal
              animationType={"fade"}
              transparent={true}
              onRequestClose={() => this.setModalVisible2(false)}
              visible={this.state.modalVisible2}
            >
              <View style={styles.popupOverlay}>
                <Card style={[styles.shadow, styles.popup]}>
                  <View style={styles.popupContent}>
                    <ScrollView contentContainerStyle={styles.modalInfo}>
                      <H2 style={styles.h3}>Your Balance</H2>
                      <H3
                        style={{
                          color: "wheat",
                          fontFamily: "quicksand-regular"
                        }}
                      >
                        Income:{prof.income} - Total Expenses:{totalexpenses} =
                        {prof.balance} KWD
                      </H3>
                      <H3 style={styles.h3}>Your Unused Balance</H3>
                      <H3
                        style={{
                          color: "wheat",
                          fontFamily: "quicksand-regular"
                        }}
                      >
                        Balance: {prof.balance} - Total Budgets: {totalBudgets}{" "}
                        ={parseFloat(balance - totalBudgets)} KWD
                      </H3>
                    </ScrollView>
                  </View>
                  <View style={styles.popupButtons}>
                    <Button
                      onPress={() => {
                        this.setModalVisible2(false);
                      }}
                      style={styles.btnClose}
                    >
                      <Text style={{ color: "wheat" }}>Close</Text>
                    </Button>
                  </View>
                </Card>
              </View>
            </Modal>
          </ScrollView>
        </Container>
      );
    }
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  profile: state.auth.profile,
  fetched: state.auth.fetched,
  budgets: state.budget.budgets,
  expenses: state.userInfo.expenses
});
const mapDispatchToProps = dispatch => ({
  fetchProfile: () => dispatch(actionCreators.fetchProfile()),
  logout: navigation => dispatch(actionCreators.logout(navigation))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileView);
