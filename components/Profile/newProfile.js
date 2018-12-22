import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { Button } from "native-base";
import * as actionCreators from "../../store/actions/authActions";

import { VictoryPie, VictoryLabel } from "victory-native";
import { connect } from "react-redux";
class ProfileView extends Component {
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

    budgets.forEach(budget => {
      totalBudgets += parseFloat(budget.amount);
    });
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerContent}>
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
                data={[
                  {
                    label: `Balance: \n ${(parseFloat(balance - totalBudgets) /
                      income) *
                      100}%`,
                    y: parseFloat(balance - totalBudgets)
                  },
                  {
                    label: `Expenses:\n ${(parseFloat(totalexpenses) / income) *
                      100}%`,
                    y: parseFloat(totalexpenses)
                  },
                  {
                    label: `Budgets:\n ${(parseFloat(totalBudgets) / income) *
                      100}%`,
                    y: parseFloat(totalBudgets)
                  }
                ]}
                style={{
                  labels: {
                    fill: "white",
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
              <Text style={styles.count}>{income}</Text>
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.title}>Balance</Text>
              <Text style={styles.count}>{balance}</Text>
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.title}>Savings</Text>
              <Text style={styles.count}>{savings}</Text>
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
              <Button
                block
                danger
                onPress={() => this.props.logout(this.props.navigation)}
                style={styles.buttonContainer}
              >
                <Text>Logout</Text>
              </Button>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  profile: state.auth.profile,
  expenses: state.userInfo.expenses
});
const mapDispatchToProps = dispatch => ({
  logout: navigation => dispatch(actionCreators.logout(navigation))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileView);

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#0E0E0E"
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
  }
});
