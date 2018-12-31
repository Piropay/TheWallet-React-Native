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
  Dimensions,
  RefreshControl
} from "react-native";
import * as actionCreators from "../../store/actions";

import { Row, Grid, Col } from "react-native-easy-grid";
import ActionButton from "react-native-action-button";
import { Badge, Icon as EIcon } from "react-native-elements";

import {
  H3,
  Button,
  List,
  Card,
  CardItem,
  Body,
  H2,
  Icon,
  H1,
  Container,
  Content
} from "native-base";

import Speedometer from "react-native-speedometer-chart";
import { connect } from "react-redux";

import styles, { colors } from "./styles";
import { LinearGradient } from "expo";
import Transaction from "../AddTransactionView";

import UpdateDeposit from "../UpdateDepositView";
import { ScrollView } from "react-native-gesture-handler";
import { Modal } from "react-native-paper";
import Deposit from "../Deposit";
import { dispatch } from "rxjs/internal/observable/range";

class GoalDetails extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    let goal = this.props.navigation.getParam("goal", {});
    this.state = {
      modalVisible: false,
      modalVisible2: false,
      depositSelected: [],

      dataSource: ds.cloneWithRows(
        this.props.deposits
          .filter(deposit => deposit.goal === goal.id)
          .reverse()
      )
    };
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.props.fetchDeposits();
    this.setState({ refreshing: false });
  };

  clickEventListener = deposit => {
    this.setState({ depositSelected: deposit }, () => {
      this.setModalVisible2(true);
    });
  };
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  setModalVisible2(visible) {
    this.setState({ modalVisible2: visible });
  }

  renderCard(deposit, goal) {
    return (
      <TouchableOpacity
        onPress={() => {
          this.clickEventListener(deposit);
        }}
        key={deposit.id}
      >
        <View style={styles.eventBox}>
          <View style={styles.eventDate}>
            <Text style={styles.eventDay}>
              {new Date(deposit.date).getDate()}
            </Text>
            <Text style={styles.eventMonth}>
              {new Date(deposit.date).toLocaleString("en-us", {
                month: "short"
              })}
            </Text>
          </View>
          <View style={styles.eventContent}>
            <H3 style={styles.eventTime}>{deposit.label}</H3>
            <Text style={styles.userName}>Amount: {deposit.amount} KD</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  render() {
    let goal = this.props.navigation.getParam("goal", {});
    let deposits = this.props.deposits.filter(
      deposit => deposit.goal === goal.id
    );
    let mdeposit = this.props.navigation.getParam("mdeposit", {});
    let totalDeposits = 0;
    deposits.forEach(deposit => {
      totalDeposits += parseFloat(deposit.amount);
    });
    let deviceWidth = Dimensions.get("window").width;

    let ListItems;
    if (goal) {
      ListItems = deposits.map(deposit => this.renderCard(deposit, goal));
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
          <Row
            style={{
              height: "30%",
              borderRadius: 1,
              shadowRadius: 1,
              shadowOpacity: 0.5,
              shadowOffset: { width: 3, height: 3 }
            }}
          >
            <Col>
              <Speedometer
                style={{
                  position: "absolute",
                  top: 0,
                  transform: [{ rotateX: "180deg" }]
                }}
                size={deviceWidth * 0.5}
                outerColor="rgba(0,0,0,0)"
                internalColor={
                  parseFloat(goal.balance) < 0 ? "rgba(231,76,60,1)" : "#258779"
                }
                showText
                text={String(totalDeposits)}
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
                value={totalDeposits}
                totalValue={parseFloat(goal.amount)}
              />
              <Text style={{ fontSize: 17, top: 110, color: "#fff" }}>
                Suggested Deposit KWD {mdeposit}
              </Text>
            </Col>

            <Col
              style={{
                flex: 1,
                justifyContent: "center",
                shadowColor: "#2b2b2b",
                shadowRadius: 1,
                shadowOpacity: 0.5,
                shadowOffset: { width: 2, height: 5 }
              }}
            >
              <H3
                style={{
                  paddingTop: 10,
                  paddingBottom: 10,
                  fontFamily: "pacifico-regular",
                  color: "#fff",
                  textAlign: "center"
                }}
              >
                {goal.label} {"\n" + goal.end_date}
              </H3>
              <Badge containerStyle={{ backgroundColor: "#258779" }}>
                <Text style={{ fontSize: 17, color: "#fff" }}>
                  Amount {parseFloat(goal.amount).toFixed(3)}
                </Text>
                <Text style={{ fontSize: 17, color: "#fff" }}>
                  Balance {parseFloat(goal.balance).toFixed(3)}
                </Text>
              </Badge>
            </Col>
          </Row>

          <Row>
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
              {deposits.length > 0 ? (
                <List>{ListItems}</List>
              ) : (
                <Card
                  style={[
                    styles.container,
                    {
                      backgroundColor: "transparent",
                      borderColor: "transparent"
                    }
                  ]}
                >
                  <H1
                    style={[
                      styles.h3,
                      {
                        color: "#fff"
                      }
                    ]}
                  >
                    No deposits made for this goal
                  </H1>
                </Card>
              )}
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
                      <H3 style={styles.name}>{goal.label}</H3>
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
                    <Content contentContainerStyle={styles.modalInfo}>
                      <ScrollView contentContainerStyle={styles.modalInfo}>
                        <Row>
                          <Col
                            style={{
                              flex: 0.1,
                              padding: 0
                            }}
                          >
                            <EIcon
                              name="calendar"
                              type="evilicon"
                              color="#517fa4"
                            />
                          </Col>
                          <Col
                            style={{
                              flex: 0.3,
                              marginHorizontal: 0,
                              padding: 0
                            }}
                          >
                            <Text style={{}}>{goal.end_date}</Text>
                          </Col>
                        </Row>
                        <Text
                          style={[styles.position, { paddingVertical: 10 }]}
                        >
                          Progress {"\n"} {totalDeposits}/{goal.amount} KWD
                        </Text>
                        <Text style={styles.position}>
                          Suggested Deposit {"\n"}
                          {mdeposit} KWD
                        </Text>
                        {parseFloat(goal.balance) > 0 ? (
                          <Deposit goal={goal} />
                        ) : (
                          <H2 style={styles.h3}>You reached your goal!</H2>
                        )}
                      </ScrollView>
                    </Content>
                  </View>
                </Card>
              </View>
            </Modal>

            <Modal
              animationType={"slide"}
              transparent={true}
              onRequestClose={() => this.setModalVisible2(false)}
              visible={this.state.modalVisible2}
            >
              <View style={styles.popupOverlay}>
                <Card style={[styles.shadow, styles.popup]}>
                  <View style={styles.popupContent}>
                    <Button style={styles.Header}>
                      <H3 style={styles.name}>{goal.label}</H3>
                      <Button
                        transparent
                        onPress={() => {
                          this.setModalVisible2(false);
                        }}
                        style={styles.btnClose}
                      >
                        <Text style={{ color: "wheat" }}>X</Text>
                      </Button>
                    </Button>

                    <ScrollView contentContainerStyle={styles.modalInfo}>
                      <UpdateDeposit
                        goal={goal}
                        deposit={this.state.depositSelected}
                      />
                    </ScrollView>
                  </View>
                </Card>
              </View>
            </Modal>

            <ActionButton buttonColor="rgba(231,76,60,1)">
              <ActionButton.Item
                buttonColor="#E8D300"
                title="Update Goal"
                onPress={() =>
                  this.props.navigation.navigate("UpdateGoal", {
                    goal: goal
                  })
                }
              >
                <Icon name="md-create" style={styles.actionButtonIcon} />
              </ActionButton.Item>

              <ActionButton.Item
                buttonColor="#278979"
                title="Add a Deposit"
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
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.auth.profile,
  deposits: state.deposit.deposits
});
const mapDispatchToProps = dispatch => ({
  fetchDeposits: () => dispatch(actionCreators.fetchDeposits())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GoalDetails);
