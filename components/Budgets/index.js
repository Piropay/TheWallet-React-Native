import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions";
import { Keyboard } from "react-native";
import { Text, View, ScrollView, Slider } from "react-native";
import styles, { colors } from "./styles";
import { LinearGradient } from "expo";
import { Row } from "react-native-easy-grid";
import {
  Button,
  H2,
  Item,
  Picker,
  Icon,
  Card,
  Container,
  H1,
  Input,
  Toast
} from "native-base";
class userBudgets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyboardHeight: 0,
      budgets: [
        { category: "", label: "", amount: 0 },
        { category: "", label: "", amount: 0 }
      ]
    };
    this.handleAddBudget = this.handleAddBudget.bind(this);
    this.handleBudgetLabelChange = this.handleBudgetLabelChange.bind(this);
    this.handleBudgetAmountChange = this.handleBudgetAmountChange.bind(this);
    this.onCategoryChange = this.onCategoryChange.bind(this);
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
    this.setState(() => ({
      budgets: newAmount
    }));
  };

  handleAddBudget = () => {
    this.setState({
      budgets: this.state.budgets.concat([
        { category: "", label: "", amount: 0 }
      ])
    });
  };

  handleSubmitBudget = totalBudget => {
    let filled = false;
    let currentTotalBudget = 0;
    this.state.budgets.forEach(budget => {
      let { amount, category, label } = { ...budget };
      if (category !== "" && label !== "" && amount !== 0) {
        filled = true;
        currentTotalBudget += parseFloat(amount);
      } else {
        filled = false;
      }
    });
    if (
      filled &&
      currentTotalBudget + totalBudget < this.props.profile.balance
    ) {
      this.props.addBudget(this.state.budgets, this.props.navigation);
      Toast.show({
        text: "Budgets Successfully added!",
        buttonText: "Okay",
        duration: 6000,
        type: "success",
        buttonTextStyle: { color: "#000" },
        buttonStyle: { backgroundColor: "#F1C04F", alignSelf: "center" }
      });
    } else {
      Toast.show({
        text:
          "Please make sure that you fill in all the boxes and that you're total budgets don't exceed your current balance!",
        buttonText: "Okay",
        duration: 10000,
        type: "danger",
        buttonTextStyle: { color: "#000" },
        buttonStyle: { backgroundColor: "#F1C04F", alignSelf: "center" }
      });
    }
  };

  handleRemoveBudget = i => {
    this.setState({
      budgets: this.state.budgets.filter((budget, sidx) => {
        if (i !== sidx) return budget;
      })
    });
  };

  onCategoryChange(category, i) {
    const newCategory = this.state.budgets.map((budget, sidx) => {
      if (i !== sidx) return budget;
      return { ...budget, category: category };
    });
    this.setState({
      budgets: newCategory
    });
  }

  componentDidMount() {
    Keyboard.addListener("keyboardDidShow", this._keyboardDidShow.bind(this));
    Keyboard.addListener("keyboardDidHide", this._keyboardDidHide.bind(this));
  }

  _keyboardDidShow(e) {
    this.setState({ keyboardHeight: e.endCoordinates.height });
  }

  _keyboardDidHide(e) {
    this.setState({ keyboardHeight: 0 });
  }
  render() {
    let totalBudget = this.props.totalBudget;

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

        <Item style={[styles.label, { marginHorizontal: 40, marginTop: 0 }]}>
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
            value={idx.label}
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
              onValueChange={value => this.onCategoryChange(value, i)}
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
                  (parseFloat(this.props.profile.balance) -
                    parseFloat(totalBudget))) *
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

          {String(idx.amount.toFixed(3))}
        </Text>
        <Slider
          minimumTrackTintColor="#258779"
          style={{ width: 250, alignSelf: "center" }}
          step={10}
          maximumValue={this.props.profile.balance - totalBudget}
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
        <H2
          style={[
            styles.h3,
            {
              fontFamily: "quicksand-bold",
              textShadowOffset: { width: 0, height: 0 }
            }
          ]}
        >
          Balance {parseFloat(this.props.profile.balance).toFixed(3)} KD
        </H2>
        <H2
          style={[
            styles.h3,
            {
              fontFamily: "quicksand-bold",
              textShadowOffset: { width: 0, height: 0 }
            }
          ]}
        >
          Balance left:
          {(
            parseFloat(this.props.profile.balance) - parseFloat(totalBudget)
          ).toFixed(3)}
          KD
        </H2>
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
            onPress={() => this.handleSubmitBudget(totalBudget)}
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
            {`\n`}
            You can assign an amount of money for different forms of spendings.
          </Text>

          <ScrollView
            contentContainerStyle={[
              styles.contentContainer,
              { paddingBottom: 30 }
            ]}
          >
            {inputRows}
          </ScrollView>
        </Card>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.auth.profile,
  budgets: state.budget.budgets,
  totalBudget: state.budget.totalUserBudget
});

const mapActionsToProps = dispatch => {
  return {
    addBudget: (budgets, navigation) =>
      dispatch(actionCreators.addBudget(budgets, navigation)),
    getBalance: (income, expenses) =>
      dispatch(actionCreators.getBalance(income, expenses))
  };
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(userBudgets);
