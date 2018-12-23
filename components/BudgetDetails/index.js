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
import {
  H3,
  Button,
  List,
  Card,
  CardItem,
  Body,
  Icon,
  H2,
  H1
} from "native-base";
import Speedometer from "react-native-speedometer-chart";
import { connect } from "react-redux";

import styles from "./styles";
import Transaction from "../AddTransactionView";
import { ScrollView } from "react-native-gesture-handler";
import { Modal } from "react-native-paper";

class BudgetDetails extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    let budget = this.props.navigation.getParam("budget", {});

    this.state = {
      modalVisible: false,
      dataSource: ds.cloneWithRows(
        this.props.transactions
          .filter(transaction => transaction.budget === budget.id)
          .reverse()
      )
    };
  }

  // clickEventListener = () => {
  //   this.setState(() => {
  //     this.setModalVisible(true);
  //   });
  // };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
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
    let deviceHeight = Dimensions.get("window").height;

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
            <Badge containerStyle={{ backgroundColor: "#E8D300" }}>
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
                <H1 style={styles.h3}>No transactions made for this budget </H1>
              </Card>
            )}
          </ScrollView>
          <Modal
            animationType={"fade"}
            transparent={true}
            onRequestClose={() => this.setModalVisible(false)}
            visible={this.state.modalVisible}
          >
            <View style={styles.popupOverlay}>
              <Card
                style={[
                  styles.shadow,
                  styles.popup,
                  { position: "relative", bottom: deviceHeight * 0.2 }
                ]}
              >
                <View style={styles.popupContent}>
                  <ScrollView contentContainerStyle={styles.modalInfo}>
                    <H2 style={styles.h3}>Your Budget</H2>
                    <H3 style={styles.name}>{budget.label}</H3>
                    <Text style={styles.position}>{budget.amount} KWD</Text>
                    <Text style={styles.position}>
                      {budget.balance} KWD left to in your budget!
                    </Text>

                    <Transaction budget={budget} />
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

          <ActionButton buttonColor="rgba(231,76,60,1)">
            <ActionButton.Item
              buttonColor="#E8D300"
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
              buttonColor="#278979"
              title="Add a Transaction"
              onPress={() => this.setModalVisible(true)}
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
