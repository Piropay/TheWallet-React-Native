import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions";
import { Text, View, TextInput, ScrollView } from "react-native";
import { Input } from "native-base";
import { Row, Grid } from "react-native-easy-grid";
import { Button, H1, Item, Picker, DatePicker, Icon } from "native-base";
import styles from "./styles";

class Goal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalGoal: 0,
      goals: [{ end_date: "", label: "", amount: "0" }]
    };
    this.handleAddGoal = this.handleAddGoal.bind(this);
    this.handleGoalLabelChange = this.handleGoalLabelChange.bind(this);
    this.handleGoalAmountChange = this.handleGoalAmountChange.bind(this);
    this.onValueChange2 = this.onValueChange2.bind(this);
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
    // let value = 0;
    // if (e.nativeEvent.text.length > 0) {
    //   value = parseFloat(e.nativeEvent.text);
    // }
    // value = parseFloat(value);
    console.log(this.state.goals);
    const newAmount = this.state.goals.map((goal, sidx) => {
      if (i !== sidx) return goal;
      oldAmount = goal.amount;
      return { ...goal, amount: value + "" };
    });
    this.setState(prevState => ({
      goals: newAmount,
      // totalBudget: prevState.totalBudget - parseFloat(oldAmount) + value
      totalGoal: prevState.totalGoal - oldAmount + value
    }));
  };

  handleAddGoal = () => {
    this.setState({
      goals: this.state.goals.concat([{ end_date: "", label: "", amount: "0" }])
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
      let today = new Date();

      this.state.goals.forEach(goal => {
        this.props.addGoal(goal, this.props.navigation);
      });
      this.props.navigation.navigate("GoalsView");
    } else {
      alert("Please make sure that you fill in all the boxes");
    }
  };
  handleRemoveGoal = i => {
    this.setState({
      gaols: this.state.goals.filter((goal, sidx) => {
        if (i !== sidx) return goal;
      })
    });
  };

  onValueChange2(value, i) {
    const newEndDate = this.state.goals.map((goal, sidx) => {
      if (i !== sidx) return goal;
      return { ...goal, end_date: value };
    });

    this.setState({
      goals: newEndDate
    });
  }

  render() {
    const inputRows = this.state.goals.map((idx, i) => (
      <Row key={`${i}`}>
        <View style={styles.inputWrap}>
          <Text style={styles.label}>Label</Text>
          <View style={styles.inputContainer}>
            <TextInput
              value={idx.label}
              style={styles.inputs}
              onChangeText={value => this.handleGoalLabelChange(value, i)}
            />
          </View>
        </View>

        <View style={styles.inputWrap}>
          <Text style={styles.label}>Amount</Text>
          <View style={styles.inputContainer}>
            <Input
              style={styles.inputs}
              // keyboardType="numeric"
              value={idx.amount}
              clearTextOnFocus={true}
              onChangeText={value =>
                this.handleGoalAmountChange(parseFloat(value), i)
              }
              // onEndEditing={e => this.handleGoalAmountChange(e, i)}
            />
          </View>
        </View>
        <Button
          type="button"
          onPress={() => this.handleRemoveGoal(i)}
          style={{ width: 30, justifyContent: "center", marginTop: 13 }}
        >
          <Text>x</Text>
        </Button>
        <Row>
          <Item picker>
            {/* <Picker
              mode="dropdown"
              iosIcon={<Icon name="ios-arrow-dropdown" />}
              placeholder="Select the Goal"
              placeholderStyle={{ color: "#bfc6ea" }}
              placeholderIconColor="#007aff"
              selectedValue={idx.end_date}
              onValueChange={value => this.onValueChange2(value, i)}
            >
              <Picker.Item key={1} label={"Food"} value={"Food"} />
              <Picker.Item key={2} label={"Health"} value={"Health"} />
              <Picker.Item key={3} label={"Emergency"} value={"Emergency"} />
              <Picker.Item
                key={4}
                label={"Entertainment"}
                value={"Entertainment"}
              />
              <Picker.Item key={5} label={"Others"} value={"Others"} />
            </Picker> */}
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
              placeHolderTextStyle={{ color: "#d3d3d3" }}
              onDateChange={value => this.onValueChange2(value, i)}
            />
          </Item>
        </Row>
      </Row>
    ));
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <Grid>
          <H1>Your Goals</H1>
          {inputRows}
        </Grid>
        <Button block full onPress={() => this.handleAddGoal()}>
          <Text>Add</Text>
        </Button>
        <Button
          block
          full
          onPress={() => this.handleSubmitGoal()}
          style={{ marginTop: 10 }}
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
    addGoal: (goal, navigation) =>
      dispatch(actionCreators.addGoal(goal, navigation))
  };
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Goal);
