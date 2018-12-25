import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions";
import { Text, View, TextInput, ScrollView } from "react-native";
import { Row, Grid } from "react-native-easy-grid";
import {
  Button,
  H1,
  Item,
  Picker,
  DatePicker,
  Icon,
  Input,
  Card,
  CardItem,
  Body
} from "native-base";
import styles from "./styles";

class Goal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalGoal: 0,
      goals: [{ end_date: "", label: "", amount: "0", balance: "0" }]
    };
    this.handleAddGoal = this.handleAddGoal.bind(this);
    this.handleGoalLabelChange = this.handleGoalLabelChange.bind(this);
    this.handleGoalAmountChange = this.handleGoalAmountChange.bind(this);
    this.onValueChange2 = this.onValueChange2.bind(this);
    this.handleRemoveGoal = this.handleRemoveGoal.bind(this);
  }

  handleGoalLabelChange = (value, i) => {
    const newLable = this.state.goals.map((goal, sidx) => {
      if (i !== sidx) return goal;
      return { ...goal, label: value };
    });

    this.setState({ goals: newLable });
  };

  handleGoalAmountChange = (value, i) => {
    let oldAmount = 0;

    const newAmount = this.state.goals.map((goal, sidx) => {
      if (i !== sidx) return goal;
      oldAmount = goal.amount;
      return { ...goal, amount: value + "" };
    });
    this.setState(prevState => ({
      goals: newAmount,
      totalGoal: prevState.totalGoal - oldAmount + value
    }));
  };

  handleAddGoal = () => {
    this.setState({
      goals: this.state.goals.concat([
        { end_date: "", label: "", amount: "0", balance: "0" }
      ])
    });
  };
  handleSubmitGoal = () => {
    let filled = false;
    this.state.goals.forEach(goal => {
      let { amount, end_date, label } = { ...goal };

      if (end_date !== "" && label !== "" && amount !== "0") {
        filled = true;
      }
    });
    if (filled) {
      this.props.addGoal(this.state.goals, this.props.navigation);

      // this.props.navigation.navigate("GoalsView");
    } else {
      Toast.show({
        text: "Please make sure that you fill in all the boxes",
        buttonText: "Okay",
        duration: 6000,
        type: "danger",
        buttonTextStyle: { color: "#000" },
        buttonStyle: { backgroundColor: "#F1C04F", alignSelf: "center" }
      });
    }
  };
  handleRemoveGoal = i => {
    this.setState({
      goals: this.state.goals.filter((goal, sidx) => {
        if (i !== sidx) return goal;
      })
    });
  };

  onValueChange2(value, i) {
    let date =
      value.getFullYear() +
      "-" +
      (value.getMonth() + 1) +
      "-" +
      value.getDate();
    const newEndDate = this.state.goals.map((goal, sidx) => {
      if (i !== sidx) return goal;
      return { ...goal, end_date: date };
    });

    this.setState({
      goals: newEndDate
    });
  }

  render() {
    const inputRows = this.state.goals.map((idx, i) => (
      <Row key={`${i}`}>
        <Card style={styles.shadow}>
          <Button
            type="button"
            onPress={() => this.handleRemoveGoal(i)}
            style={styles.closeButton}
          >
            <Text>x</Text>
          </Button>
          <CardItem style={{ borderRadius: 10 }}>
            <Body
              style={{
                paddingHorizontal: 40
              }}
            >
              <Item style={styles.label}>
                <TextInput
                  value={idx.label}
                  style={styles.inputs}
                  onChangeText={value => this.handleGoalLabelChange(value, i)}
                />
              </Item>
              <Text style={styles.label}>Label</Text>
            </Body>
          </CardItem>

          <CardItem style={{ borderRadius: 10 }}>
            <Body
              style={{
                paddingHorizontal: 40
              }}
            >
              <Item style={styles.label}>
                <Input
                  style={styles.inputs}
                  keyboardType="numeric"
                  value={idx.amount}
                  clearTextOnFocus={true}
                  onChangeText={value =>
                    this.handleGoalAmountChange(parseFloat(value), i)
                  }
                />
              </Item>
              <Text style={styles.label}>Amount</Text>
            </Body>
          </CardItem>
          <Row style={{ alignSelf: "center" }}>
            <Item picker>
              <DatePicker
                defaultDate={new Date()}
                minimumDate={new Date()}
                selectedValue={idx.end_date}
                locale={"en"}
                timeZoneOffsetInMinutes={undefined}
                modalTransparent={false}
                animationType={"fade"}
                androidMode={"default"}
                placeHolderText="Select date"
                textStyle={{ color: "green" }}
                placeHolderTextStyle={{ color: "#278979" }}
                onDateChange={value => this.onValueChange2(value, i)}
              />
              <Icon name="ios-arrow-dropdown" />
            </Item>
          </Row>
        </Card>
      </Row>
    ));
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <Grid>
          <H1 style={styles.h3}>Your Goals</H1>
          {inputRows}
        </Grid>
        <Button
          style={styles.button}
          block
          full
          onPress={() => this.handleAddGoal()}
        >
          <Text>Add</Text>
        </Button>
        <Button
          style={styles.button}
          block
          full
          onPress={() => this.handleSubmitGoal()}
        >
          <Text>Submit</Text>
        </Button>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  balance: state.userInfo.balance
});

const mapActionsToProps = dispatch => {
  return {
    addGoal: (goals, navigation) =>
      dispatch(actionCreators.addGoal(goals, navigation))
  };
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Goal);
