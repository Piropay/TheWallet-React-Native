import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions";

import { Text, View, TextInput, ScrollView, Slider } from "react-native";
import styles, { colors } from "./styles";
import { LinearGradient } from "expo";
import { Row, Grid } from "react-native-easy-grid";
import {
  Button,
  H2,
  Item,
  Picker,
  Icon,
  Card,
  CardItem,
  Body,
  Container,
  H1,
  Input
} from "native-base";
class userBudgets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalBudget: 0,
      budgets: [{ category: "", label: "", amount: 0 }],
      value: 50,
      Food: 0.25,
      Health: 0.05,
      Emergency: 0.1,
      Entertainment: 0.2,
      Transportation: 0.05,
      Personal: 0.2
    };
    this.handleAddBudget = this.handleAddBudget.bind(this);
    this.handleBudgetLabelChange = this.handleBudgetLabelChange.bind(this);
    this.handleBudgetAmountChange = this.handleBudgetAmountChange.bind(this);
    this.onValueChange2 = this.onValueChange2.bind(this);
  }

  handleBudgetLabelChange = (value, i) => {
    const newLable = this.state.budgets.map((budget, sidx) => {
      if (i !== sidx) return budget;
      return { ...budget, label: value };
    });

    this.setState({ budgets: newLable });
  };

  handleBudgetAmountChange = (value, i) => {
    const newAmount = this.state.budgets.map((budget, sidx) => {
      if (i !== sidx) return budget;

      return { ...budget, amount: value };
    });
    this.setState(prevState => ({
      budgets: newAmount,
      value: parseFloat(value)
    }));
  };

  handleAddBudget = () => {
    this.setState({
      budgets: this.state.budgets.concat([
        { category: "", label: "", amount: 0 }
      ])
    });
  };
  handleSubmitBudget = () => {
    let filled = false;
    let currentTotalBudget = 0;

    this.state.budgets.forEach(budget => {
      let { amount, category, label } = { ...budget };
      if (category !== "" && label !== "" && amount !== 0) {
        filled = true;
        currentTotalBudget += amount;
      } else {
        filled = false;
      }
    });
    if (
      filled &&
      currentTotalBudget + this.props.totalUserBudget <
        this.props.profile.balance
    ) {
      this.state.budgets.forEach(budget =>
        this.props.addBudget(budget, this.props.navigation)
      );
      this.props.navigation.navigate("Home");
      alert("Budgets Successfully added!");
    } else {
      alert(
        "Please make sure that you fill in all the boxes and that you're total budgets don't exceed your current balance"
      );
    }
  };
  handleRemoveBudget = i => {
    this.setState({
      budgets: this.state.budgets.filter((budget, sidx) => {
        if (i !== sidx) return budget;
      })
    });
  };

  onValueChange2(category, i) {
    const newCategory = this.state.budgets.map((budget, sidx) => {
      if (i !== sidx) return budget;

      return { ...budget, category: category };
    });

    this.setState({
      budgets: newCategory
    });
  }
  change(value) {
    this.setState(() => {
      return {
        value: parseFloat(value)
      };
    });
  }
  render() {
    const inputRows = this.state.budgets.map((idx, i) => (
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
            onPress={() => this.handleRemoveBudget(i)}
            style={styles.remove}
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

        <Item style={[styles.label, { marginHorizontal: 40 }]}>
          <Icon
            active
            type="Entypo"
            name="edit"
            style={{
              color: "#585858"
            }}
          />
          <Input
            placeholder="Title"
            onChangeText={value => this.handleBudgetLabelChange(value, i)}
          />
        </Item>

        <Row
          style={{
            alignSelf: "center",
            marginVertical: 15,
            marginHorizontal: 10
          }}
        >
          <Item
            picker
            style={{
              width: 165
            }}
          >
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="ios-arrow-dropdown" />}
              placeholder="Select Budget"
              placeholderIconColor="#585858"
              selectedValue={idx.category}
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
              <Picker.Item
                key={5}
                label={"Transportation"}
                value={"Transportation"}
              />
              <Picker.Item key={6} label={"Personal"} value={"Personal"} />
              <Picker.Item key={7} label={"Others"} value={"Others"} />
            </Picker>
          </Item>
          <Text
            style={[
              styles.number,
              { paddingBottom: 0, marginHorizontal: 20, color: "#BDA747" }
            ]}
          >
            {String(
              (
                (idx.amount /
                  (this.props.profile.balance - this.props.totalUserBudget)) *
                100
              ).toFixed(1)
            )}
            %
          </Text>
        </Row>

        <Text
          style={[
            styles.number,
            {
              alignSelf: "flex-start",
              paddingBottom: 0,
              marginHorizontal: 50,
              fontSize: 20,
              color: "#BDA747"
            }
          ]}
        >
          <Icon
            active
            name="ios-cash"
            style={{
              color: "#585858"
            }}
          />
          {"  "}
          {String(idx.amount.toFixed(3))}{" "}
        </Text>
        <Slider
          minimumTrackTintColor="#258779"
          style={{ width: 250, alignSelf: "center" }}
          step={1}
          maximumValue={this.props.profile.balance - this.props.totalUserBudget}
          onValueChange={this.change.bind(this)}
          value={idx.amount}
          onValueChange={value =>
            this.handleBudgetAmountChange(parseFloat(value), i)
          }
        />
        <View
          style={{
            flex: 1,
            justifyContent: "space-between",
            flexDirection: "row"
          }}
        />
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
      <Container style={styles.container}>
        <LinearGradient
          colors={[colors.background1, colors.background2]}
          startPoint={{ x: 1, y: 0 }}
          endPoint={{ x: 0, y: 1 }}
          style={styles.gradient}
        />
        <H1
          style={[
            styles.h3,
            { fontSize: 35, paddingTop: 20, marginTop: 15, paddingBottom: 10 }
          ]}
        >
          Budgets
        </H1>

        <View style={{ flexDirection: "row", alignSelf: "center" }}>
          <Button
            style={styles.greenbutton}
            rounded
            dark
            onPress={() => this.handleAddBudget()}
          >
            <Text style={styles.buttontext}>Add</Text>
          </Button>
          <Button
            style={[styles.button]}
            rounded
            dark
            onPress={() => this.handleSubmitBudget()}
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
                paddingTop: 20
              }
            ]}
          >
            Now to add your budgets!
          </Text>
          <Text
            style={[
              styles.text,
              {
                paddingTop: 5,
                color: "#2b2b2b",
                paddingBottom: 10
              }
            ]}
          >
            You can assign an amount of money for different forms of spendings.
          </Text>
          <ScrollView contentContainerStyle={styles.contentContainer}>
            {inputRows}
          </ScrollView>
        </Card>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.auth.profile,
  totalUserBudget: state.budget.totalUserBudget
});

const mapActionsToProps = dispatch => {
  return {
    addBudget: (budget, navigation) =>
      dispatch(actionCreators.addBudget(budget, navigation)),
    getBalance: (income, expenses) =>
      dispatch(actionCreators.getBalance(income, expenses))
  };
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(userBudgets);
