import React from "react";
import {
  Platform,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Modal,
  RefreshControl
} from "react-native";
import { Button, List, Card, CardItem, Body, H2, H3, Toast } from "native-base";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions";
import styles from "./styles";
import Deposit from "../Deposit";
import { Icon } from "react-native-elements";
import { Row, Col } from "react-native-easy-grid";

class GoalView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      goalSelected: [],
      mdeposit: 0
    };
  }
  static navigationOptions = {
    title: "Goals"
  };
  clickEventListener = (item, mdeposit) => {
    this.setState({ goalSelected: item, mdeposit: mdeposit }, () => {
      this.setModalVisible(true);
    });
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  renderCard(goal) {
    let goalDate = new Date(goal.end_date);
    let today = new Date();
    let yrdiff = goalDate.getFullYear() - today.getFullYear();
    let mdeposit = 0.0;
    if (yrdiff === 0) {
      let months = goalDate.getMonth() - today.getMonth();
      if (months === 0) {
        mdeposit = 0.0;
      } else {
        mdeposit = goal.balance / months;
      }
    } else if (yrdiff === 1) {
      let months = 11 - today.getMonth() + goalDate.getMonth() + 1;
      mdeposit = goal.balance / months;
    } else {
      let months =
        11 - today.getMonth() + (goalDate.getMonth() + 1) + 12 * (yrdiff - 1);
      mdeposit = goal.balance / months;
    }
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          this.clickEventListener(goal, mdeposit);
        }}
        key={goal.id}
      >
        <Card key={goal.id} style={styles.shadow}>
          <CardItem>
            <Body>
              <H3 style={{ color: "#BEA647", fontFamily: "quicksand-bold" }}>
                {goal.label}
              </H3>
              <Text>{goal.end_date}</Text>
              <Text>{parseFloat(goal.balance).toFixed(3)}KWD</Text>
              <Text>
                Suggested Monthly Deposit: {parseFloat(mdeposit).toFixed(3)} KWD
              </Text>
            </Body>
          </CardItem>
        </Card>
      </TouchableOpacity>
    );
  }
  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.props.fetchGoals();

    this.setState({ refreshing: false });
  };

  render() {
    const goals = this.props.goals;
    let ListItems;
    if (goals) {
      ListItems = goals.map(goal => this.renderCard(goal));
    }
    totalDeposits = 0;
    if (this.state.goalSelected.label) {
      this.state.goalSelected.deposits.forEach(deposit => {
        totalDeposits += parseFloat(deposit.amount);
      });
    }
    return (
      <View style={styles.container}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <List>{ListItems}</List>
        </ScrollView>
        <Button
          block
          warning
          onPress={() => this.props.navigation.navigate("Goals")}
        >
          <Text style={{ color: "white" }}> ADD Goal</Text>
        </Button>
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
                  <H3 style={styles.name}>{this.state.goalSelected.label}</H3>
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
                  {/* <H2 style={styles.h3}>Your Goal</H2> */}

                  <Row>
                    <Col
                      style={{
                        flex: 0.1,
                        padding: 0
                      }}
                    >
                      <Icon name="calendar" type="evilicon" color="#517fa4" />
                    </Col>
                    <Col style={{ flex: 0.3, marginHorizontal: 0, padding: 0 }}>
                      <Text style={{}}>{this.state.goalSelected.end_date}</Text>
                    </Col>
                  </Row>
                  <Text style={styles.position}>
                    Progress {"\n"} {totalDeposits}/
                    {this.state.goalSelected.amount} KWD
                  </Text>
                  {/* <Text style={styles.position}>
                    {this.state.goalSelected.balance} KWD left to reach the
                    goal!
                  </Text> */}

                  <Text style={styles.about}>
                    {"\n"}
                    Suggested Deposit {"\n"}
                    {parseFloat(this.state.mdeposit).toFixed(3)} KWD
                  </Text>
                  <Deposit goal={this.state.goalSelected} />
                </ScrollView>
              </View>
            </Card>
          </View>
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.auth.profile,
  goals: state.goal.goals
});
const mapDispatchToProps = dispatch => ({
  fetchGoals: () => dispatch(actionCreators.fetchGoals())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GoalView);
