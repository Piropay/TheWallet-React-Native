import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  RefreshControl
} from "react-native";
import * as actionCreators from "../../store/actions/authActions";

import { VictoryPie, VictoryLabel } from "victory-native";
import { connect } from "react-redux";
import ExpensesList from "../ExpensesList/ExpensesList";
import { Modal } from "react-native-paper";
import { Card, H2, Text, Button, H3 } from "native-base";

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
    let { income, balance, savings, budgets } = { ...prof };
    let totalexpenses = 0;
    this.props.expenses.forEach(expense => {
      totalexpenses += parseFloat(expense.amount);
    });

    let totalBudgets = 0;

    this.props.budgets.forEach(budget => {
      totalBudgets += parseFloat(budget.amount);
    });

    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.a}>
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
                    label: `Balance: \n ${(
                      (parseFloat(balance - totalBudgets) / income) *
                      100
                    ).toFixed(2)}%`,
                    x: 1,
                    y: parseFloat(balance - totalBudgets)
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
                    fill: "#158900",
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

          <View style={styles.profileDetail}>
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

          <View>
            <View style={styles.bodyContent}>
              <Text style={styles.description}>Number {prof.phoneNo}</Text>
              <Text style={styles.description}>Date Of Birth: {prof.dob}</Text>
              <Text style={styles.description}>Gender: {prof.gender}</Text>

              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("UpdateProfile")}
                style={styles.buttonContainer}
              >
                <Text>Update Profile</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.props.logout(this.props.navigation)}
                style={[styles.buttonContainer, { backgroundColor: "#BA2B15" }]}
              >
                <Text>Logout</Text>
              </TouchableOpacity>
            </View>
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
                    style={{ color: "wheat", fontFamily: "quicksand-regular" }}
                  >
                    Income:{prof.income} - Total Expenses:{totalexpenses} =
                    {prof.balance} KWD
                  </H3>
                  <H3 style={styles.h3}>Your Unused Balance</H3>
                  <H3
                    style={{ color: "wheat", fontFamily: "quicksand-regular" }}
                  >
                    Balance: {prof.balance} - Total Budgets: {totalBudgets} =
                    {parseFloat(balance - totalBudgets)} KWD
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
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  profile: state.auth.profile,
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

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#EFEBD6"
  },
  headerContent: {
    padding: 10,
    alignItems: "center"
  },
  name: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: "600"
  },
  profileDetail: {
    alignSelf: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#ffffff"
  },
  detailContent: {
    margin: 10,
    alignItems: "center"
  },
  title: {
    fontSize: 20,
    color: "#BEA647"
  },
  count: {
    fontSize: 18
  },
  bodyContent: {
    flex: 1,
    alignItems: "center",
    padding: 30,
    marginTop: 40
  },
  textInfo: {
    fontSize: 18,
    marginTop: 20,
    color: "#696969"
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: "#278979"
  },
  description: {
    fontSize: 20,
    color: "#BEA647",
    marginTop: 10,
    textAlign: "center"
  },
  popup: {
    backgroundColor: "#2B2B2B",
    marginTop: 80,
    marginHorizontal: 40,
    borderRadius: 10
  },
  shadow: {
    shadowColor: "#595959",
    shadowRadius: 1,
    shadowOpacity: 0.7,
    shadowOffset: { width: 8, height: 8 }
  },
  h3: {
    padding: 10,
    textAlign: "center",
    color: "#BDA747",
    fontWeight: "600",
    fontFamily: "pacifico-regular",
    textShadowColor: "#7f7f7f",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1
  },
  popupOverlay: {
    backgroundColor: "#00000057",
    flex: 1,
    marginTop: 30
  },
  popupContent: {
    //alignItems: 'center',
    margin: 5,
    height: 300
  },
  popupHeader: {
    marginBottom: 45
  },
  popupButtons: {
    marginTop: 15,
    flexDirection: "row",
    borderTopWidth: 1,
    borderColor: "#eee",
    justifyContent: "center"
  },
  popupButton: {
    flex: 1,
    marginVertical: 16
  },
  btnClose: {
    paddingHorizontal: 10,
    marginVertical: 5,
    backgroundColor: "#BA2D17",
    shadowColor: "#595959",
    shadowRadius: 1,
    shadowOpacity: 0.7,
    borderRadius: 5,
    shadowOffset: { width: 5, height: 5 }
  },
  modalInfo: {
    alignItems: "center",
    justifyContent: "center"
  },
  name: {
    fontFamily: "quicksand-bold",
    fontSize: 30,
    flex: 1,
    alignSelf: "center",
    color: "#278979",
    fontWeight: "bold",
    paddingVertical: 10
  },
  position: {
    fontFamily: "quicksand-regular",
    fontSize: 14,
    flex: 1,
    alignSelf: "center",
    color: "#BEA647"
  },
  about: {
    fontFamily: "quicksand-regular",
    fontSize: 14,
    flex: 1,
    alignSelf: "center",
    color: "#BEA647",
    marginHorizontal: 10
  }
});
