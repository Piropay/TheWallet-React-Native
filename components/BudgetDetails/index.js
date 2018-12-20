import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Alert,
  Image,
  ListView,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { Row, Grid, Col } from "react-native-easy-grid";
import ActionButton from "react-native-action-button";
import { Badge } from "react-native-elements";
import { H3, Button, List, Card, CardItem, Body, Icon } from "native-base";
import Speedometer from "react-native-speedometer-chart";
import { connect } from "react-redux";

import styles from "./styles";
import { ScrollView } from "react-native-gesture-handler";

class BudgetDetails extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    let budget = this.props.navigation.getParam("budget", {});

    this.state = {
      dataSource: ds.cloneWithRows(
        this.props.transactions
          .filter(transaction => transaction.budget === budget.id)
          .reverse()
      )
    };
  }

  render() {
    let budget = this.props.navigation.getParam("budget", {});
    let transactions = this.props.transactions.filter(
      transaction => transaction.budget === budget.id
    );
    // console.log(transactions);

    let totalTransactions = 0;
    transactions.forEach(transaction => {
      totalTransactions += parseFloat(transaction.amount);
    });
    let deviceWidth = Dimensions.get("window").width;

    return (
      <View style={styles.container}>
        <Row
          style={{
            height: "20%",
            borderRadius: 1,
            borderColor: "black",
            backgroundColor: "#252525",
            shadowColor: "#a0a0a0",
            shadowRadius: 1,
            shadowOpacity: 0.5,
            shadowOffset: { width: 5, height: 7 }
          }}
        >
          <Col
            style={{
              shadowColor: "#a0a0a0",
              shadowRadius: 1,
              shadowOpacity: 0.5,
              shadowOffset: { width: 2, height: 5 }
            }}
          >
            <Speedometer
              style={{
                position: "absolute",
                top: 0,
                transform: [{ rotateX: "180deg" }]
              }}
              size={deviceWidth * 0.5}
              outerColor="rgba(0,0,0,0)"
              internalColor="#258779"
              showText
              text={String(totalTransactions)}
              textStyle={{
                backgroundColor: "rgba(0,0,0,0)",
                color: "#258779",
                transform: [{ rotateX: "180deg" }]
              }}
              showPercent
              percentStyle={{
                color: "#258779",
                transform: [{ rotateX: "180deg" }]
              }}
              value={totalTransactions}
              totalValue={parseFloat(budget.amount)}
            />
          </Col>

          <Col
            style={{
              flex: 1,
              justifyContent: "center",
              shadowColor: "#a0a0a0",
              shadowRadius: 1,
              shadowOpacity: 0.5,
              shadowOffset: { width: 2, height: 5 }
            }}
          >
            <H3
              style={{
                paddingTop: 10,
                fontFamily: "pacifico-regular",
                color: "#fff",
                textAlign: "center"
              }}
            >
              {budget.label}
            </H3>
            <Badge containerStyle={{ backgroundColor: "#D5C157" }}>
              <Text style={{ fontSize: 17, color: "#fff" }}>
                amount: {budget.amount}
              </Text>
              <Text style={{ fontSize: 17, color: "#fff" }}>
                balance: {budget.balance}
              </Text>
            </Badge>
          </Col>
        </Row>

        <Row>
          <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
          >
            {transactions.length > 0 ? (
              <ListView
                enableEmptySections={true}
                style={styles.eventList}
                dataSource={this.state.dataSource}
                renderRow={transaction => {
                  return (
                    <TouchableOpacity>
                      <View style={styles.eventBox}>
                        <View style={styles.eventDate}>
                          <Text style={styles.eventDay}>
                            {new Date(transaction.date).getDate()}
                          </Text>
                          <Text style={styles.eventMonth}>
                            {new Date(transaction.date).toLocaleString(
                              "en-us",
                              {
                                month: "short"
                              }
                            )}
                          </Text>
                        </View>
                        <View style={styles.eventContent}>
                          <H3 style={styles.eventTime}>{transaction.label}:</H3>
                          <Text style={styles.userName}>
                            Amount: {transaction.amount} KD
                          </Text>
                          <Text style={styles.userName}>
                            Category: {budget.category}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />
            ) : (
              <Card style={styles.container}>
                <H1>No transactions made for this budget </H1>
              </Card>
            )}
          </ScrollView>
          <ActionButton buttonColor="rgba(231,76,60,1)">
            <ActionButton.Item
              buttonColor="#9b59b6"
              title="Update Budget"
              onPress={() =>
                this.props.navigation.navigate("UpdateBudget", {
                  budget: budget
                })
              }
            >
              <Icon name="md-create" style={styles.actionButtonIcon} />
            </ActionButton.Item>

            <ActionButton.Item
              buttonColor="#1abc9c"
              title="Add a Transaction"
              onPress={() =>
                this.props.navigation.navigate("Add", { budget: budget })
              }
            >
              <Icon
                name="add-to-list"
                type="Entypo"
                style={styles.actionButtonIcon}
              />
            </ActionButton.Item>
          </ActionButton>
        </Row>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.auth.profile,
  transactions: state.transaction.transactions
});
export default connect(mapStateToProps)(BudgetDetails);
