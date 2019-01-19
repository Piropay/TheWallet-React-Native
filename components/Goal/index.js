import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions";
import { Text, View, ScrollView } from "react-native";
import {
  Button,
  H1,
  Item,
  DatePicker,
  Icon,
  Input,
  Card,
  Toast,
  Container
} from "native-base";
import styles, { colors } from "./styles";
import { LinearGradient } from "expo";

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
    this.onDateChange = this.onDateChange.bind(this);
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

  onDateChange(value, i) {
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
      <View key={`${i}`}>
        <View
          style={{
            flex: 1,
            justifyContent: "space-between",
            marginHorizontal: 25,
            flexDirection: "row"
          }}
        >
          <Card style={styles.circle}>
            <Text style={styles.number}>{`${i + 1}`}</Text>
          </Card>
          <Button
            transparent
            style={styles.remove}
            onPress={() => this.handleRemoveGoal(i)}
          >
            <Icon
              active
              type="FontAwesome"
              name="remove"
              style={{
                color: "#585858"
              }}
            />
          </Button>
        </View>
        <Item style={[styles.label, { marginTop: 0 }]}>
          <Icon
            active
            type="Entypo"
            name="edit"
            style={{
              color: "#585858"
            }}
          />
          <Input
            value={idx.label}
            placeholder="Title"
            onChangeText={value => this.handleGoalLabelChange(value, i)}
          />
        </Item>
        <View
          style={{
            flex: 1,
            justifyContent: "space-between",
            flexDirection: "row"
          }}
        >
          <Item style={[styles.label, { flex: 1 }]}>
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
              value={idx.amount}
              clearTextOnFocus={true}
              onChangeText={value =>
                this.handleGoalAmountChange(parseFloat(value), i)
              }
            />
          </Item>
          <Item picker style={[styles.label, { marginLeft: 0, flex: 1 }]}>
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
              placeHolderTextStyle={{ color: "#585858" }}
              onDateChange={value => this.onDateChange(value, i)}
            />
            <Icon
              name="calendar"
              type="Entypo"
              style={{
                color: "#585858"
              }}
            />
          </Item>
        </View>
        <View
          style={{
            borderBottomColor: "#b2b2b2",
            borderBottomWidth: 1,
            marginHorizontal: 25,
            marginVertical: 20
          }}
        />
      </View>
    ));
    return (
      <Container>
        <LinearGradient
          colors={[colors.background1, colors.background2]}
          startPoint={{ x: 1, y: 0 }}
          endPoint={{ x: 0, y: 1 }}
          style={styles.gradient}
        />
        <H1
          style={[
            styles.h3,
            { fontSize: 35, paddingTop: 20, paddingBottom: 10 }
          ]}
        >
          Goals
        </H1>
        <View style={{ flexDirection: "row", alignSelf: "center" }}>
          <Button
            style={styles.greenbutton}
            rounded
            dark
            onPress={() => this.handleAddGoal()}
          >
            <Text style={styles.buttontext}>Add</Text>
          </Button>
          <Button
            style={[styles.button]}
            rounded
            dark
            onPress={() => this.handleSubmitGoal()}
          >
            <Text style={styles.buttontext}>Submit</Text>
          </Button>
        </View>
        <Card padder style={styles.mainCard}>
          <Text
            style={[
              styles.text,
              {
                color: "#2b2b2b",
                paddingTop: 20,
                paddingBottom: 10
              }
            ]}
          >
            You can add your goals here, you'll get a monthly recommendation of
            how much to deposit!
          </Text>
          <ScrollView contentContainerStyle={styles.contentContainer}>
            {inputRows}
          </ScrollView>
        </Card>
      </Container>
    );
  }
}

const mapActionsToProps = dispatch => {
  return {
    addGoal: (goals, navigation) =>
      dispatch(actionCreators.addGoal(goals, navigation))
  };
};

export default connect(
  null,
  mapActionsToProps
)(Goal);
