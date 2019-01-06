import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions";
import { LinearGradient } from "expo";

import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  Slider
} from "react-native";

import {
  Input,
  CardItem,
  Body,
  Toast,
  DatePicker,
  Container
} from "native-base";

import { Row, Grid } from "react-native-easy-grid";
import { Button, H1, Item, Picker, Icon, Card } from "native-base";
import styles, { colors } from "./styles";

class UpdateGoal extends Component {
  constructor(props) {
    super(props);
    let goal = this.props.navigation.getParam("goal", {});

    this.state = {
      id: goal.id,
      label: goal.label,
      end_date: goal.end_date,
      amount: parseFloat(goal.balance),
      balance: goal.balance
    };
  }
  onValueChange2(value) {
    let date =
      value.getFullYear() +
      "-" +
      (value.getMonth() + 1) +
      "-" +
      value.getDate();
    this.setState({ end_date: date });
  }

  handleSubmitBudget = async goal => {
    let filled = false;
    let newBalance = 0;
    let { amount, label, balance } = { ...this.state };
    if (amount !== "" && label !== "") {
      filled = true;
    } else {
      filled = false;
    }
    newBalance = this.state.amount - goal.amount + parseFloat(balance);

    if (filled) {
      await this.setState({ balance: newBalance });
      this.props.updateGoal(this.state, this.props.navigation);
    } else {
      Toast.show({
        text: "Please make sure that you enter valid data",
        buttonText: "Okay",
        duration: 10000,
        type: "danger",
        buttonTextStyle: { color: "#000" },
        buttonStyle: { backgroundColor: "#F1C04F", alignSelf: "center" }
      });
    }
  };

  render() {
    let goal = this.props.navigation.getParam("goal", {});

    return (
      <Container style={styles.container}>
        <LinearGradient
          colors={[colors.background1, colors.background2]}
          startPoint={{ x: 1, y: 0 }}
          endPoint={{ x: 0, y: 1 }}
          style={styles.gradient}
        />
        <Grid>
          <H1
            style={[
              styles.h3,
              { fontSize: 35, paddingTop: 20, paddingBottom: 10 }
            ]}
          >
            Your goal
          </H1>
          <H1
            style={[
              styles.h3,
              {
                fontFamily: "quicksand-bold",
                textShadowOffset: { width: 0, height: 0 }
              }
            ]}
          >
            Amount {parseFloat(goal.amount).toFixed(3)} KD
          </H1>
          <H1
            style={[
              styles.h3,
              {
                fontFamily: "quicksand-bold",
                textShadowOffset: { width: 0, height: 0 }
              }
            ]}
          >
            balance left {parseFloat(goal.balance).toFixed(3)} KD
          </H1>
          <Button
            style={styles.button}
            block
            rounded
            dark
            onPress={() => this.handleSubmitBudget(goal)}
          >
            <Text style={styles.buttontext}>Submit</Text>
          </Button>
          <Row>
            <Card padder style={styles.mainCard}>
              <CardItem style={{ borderRadius: 10 }}>
                <Body
                  style={{
                    paddingHorizontal: 40
                  }}
                >
                  <Item style={styles.label}>
                    <TextInput
                      value={this.state.label}
                      style={styles.inputs}
                      onChangeText={value => this.setState({ label: value })}
                    />
                  </Item>
                  <Item picker style={[styles.label, { width: "68%" }]}>
                    <DatePicker
                      defaultDate={new Date(this.state.end_date)}
                      minimumDate={new Date()}
                      selectedValue={this.state.end_date}
                      locale={"en"}
                      timeZoneOffsetInMinutes={undefined}
                      modalTransparent={false}
                      animationType={"fade"}
                      androidMode={"default"}
                      placeHolderText="Select date"
                      placeHolderTextStyle={{ color: "#585858" }}
                      onDateChange={value => this.onValueChange2(value)}
                    />
                    <Icon
                      name="calendar"
                      type="Entypo"
                      style={{
                        color: "#585858"
                      }}
                    />
                  </Item>
                </Body>
              </CardItem>
              <Item style={[styles.label]}>
                <Icon
                  active
                  name="cash"
                  style={{
                    color: "#585858"
                  }}
                />
                <Input
                  placeholder="0.000"
                  keyboardType="numeric"
                  value={this.state.amount}
                  clearTextOnFocus={true}
                  onChangeText={value =>
                    this.setState({ amount: parseFloat(value) })
                  }
                />
              </Item>
            </Card>
          </Row>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.auth.profile,
  totalUserBudget: state.goal.totalUserBudget
});

const mapActionsToProps = dispatch => {
  return {
    updateGoal: (goal, navigation) =>
      dispatch(actionCreators.updateGoal(goal, navigation))
  };
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(UpdateGoal);
