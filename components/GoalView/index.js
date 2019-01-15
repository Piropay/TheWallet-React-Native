import React from "react";
import {
  Platform,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Modal,
  RefreshControl,
  Dimensions,
  ActionSheetIOS
} from "react-native";
import {
  Button,
  List,
  Card,
  CardItem,
  Body,
  H2,
  H3,
  Toast,
  Container,
  Content
} from "native-base";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions";
import styles, { colors } from "./styles";
import { LinearGradient } from "expo";
import Deposit from "../Deposit";
import { Icon } from "react-native-elements";
import { Row, Col } from "react-native-easy-grid";
import ProgressBarAnimated from "react-native-progress-bar-animated";

class GoalView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: 90,
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

  openContextMenu(goal) {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["Cancel", "Remove"],
        destructiveButtonIndex: 1,
        cancelButtonIndex: 0
      },
      buttonIndex => {
        if (buttonIndex === 1) this.props.deleteGoal(goal);
      }
    );
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
        onLongPress={() => this.openContextMenu(goal)}
        onPress={() =>
          this.props.navigation.navigate("GoalDetails", {
            goal: goal,
            mdeposit: mdeposit.toFixed(3)
          })
        }
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
    const barWidth = Dimensions.get("screen").width - 70;
    const progressCustomStyles = {
      backgroundColor: "#F1C04F",
      borderRadius: 20,
      borderColor: "orange"
    };
    const goals = this.props.goals;
    let ListItems;
    if (goals) {
      ListItems = goals.map(goal => this.renderCard(goal));
    }
    totalDeposits = 0;
    if (this.state.goalSelected.label) {
      this.props.deposits.forEach(deposit => {
        if (deposit.goal === this.state.goalSelected.id)
          totalDeposits += parseFloat(deposit.amount);
      });
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
            onPress={() => this.props.navigation.navigate("Goals")}
          >
            <Text style={styles.buttontext}> Add Goal</Text>
          </Button>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
              />
            }
            contentContainerStyle={styles.contentContainer}
          >
            <List>{ListItems}</List>
          </ScrollView>

          <Modal
            animationType={"slide"}
            transparent={true}
            onRequestClose={() => this.setModalVisible(false)}
            visible={this.state.modalVisible}
          >
            <View style={[styles.popupOverlay]}>
              <Card
                style={[styles.shadow, styles.popup, { paddingBottom: 30 }]}
              >
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

                  <Content contentContainerStyle={styles.modalInfo}>
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
                      <Col
                        style={{ flex: 0.3, marginHorizontal: 0, padding: 0 }}
                      >
                        <Text style={{}}>
                          {this.state.goalSelected.end_date}
                        </Text>
                      </Col>
                    </Row>
                    <Text style={[styles.position, { paddingVertical: 10 }]}>
                      Progress {"\n"} {totalDeposits}/
                      {this.state.goalSelected.amount} KWD
                    </Text>
                    <Text style={styles.position}>
                      Suggested Deposit {"\n"}
                      {parseFloat(this.state.mdeposit).toFixed(3)} KWD
                    </Text>
                    {parseFloat(this.state.goalSelected.balance) > 0 ? (
                      <Deposit goal={this.state.goalSelected} />
                    ) : (
                      <H2 style={styles.h3}>You reached your goal!</H2>
                    )}
                  </Content>
                </View>
                <View style={{ alignSelf: "center" }}>
                  <ProgressBarAnimated
                    {...progressCustomStyles}
                    width={barWidth}
                    value={
                      (totalDeposits / this.state.goalSelected.amount) * 100
                    }
                    maxValue={parseFloat(this.state.goalSelected.amount)}
                    onComplete={() => {
                      Toast.show({
                        text: "Congrats! You reached your goal!",
                        buttonText: "Okay",
                        duration: 6000,
                        type: "success",
                        buttonTextStyle: { color: "#000" },
                        buttonStyle: {
                          backgroundColor: "#F1C04F",
                          alignSelf: "center"
                        }
                      });
                    }}
                  />
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
  profile: state.auth.profile,
  goals: state.goal.goals,
  deposits: state.deposit.deposits
});
const mapDispatchToProps = dispatch => ({
  fetchGoals: () => dispatch(actionCreators.fetchGoals()),
  deleteGoal: goal => dispatch(actionCreators.deleteGoal(goal))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GoalView);
