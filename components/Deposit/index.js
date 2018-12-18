import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { Button, Form, Item, Picker, Icon, Input } from "native-base";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions";

class AddDeposit extends React.Component {
  static navigationOptions = {
    title: "Add Deposit"
  };
  constructor(props) {
    super(props);
    this.state = {
      goal: undefined,
      amount: 0
    };
  }
  onValueChange2(value) {
    this.setState({
      goal: value
    });
  }
  async sendDeposit() {
    if (this.state.goal === undefined) {
      alert("Please select a goal");
    } else if (this.state.amount === 0) {
      alert("Please enter a valid value");
    } else {
      let setGoal = this.props.goals.find(b => {
        if (b.id === this.state.goal) {
          return b;
        }
        return false;
      });
      setGoal.amount = setGoal.amount - this.state.amount;

      await this.props.addDeposit(
        { amount: this.state.amount },
        this.state.goal,
        this.props.navigation
      );
    }
  }
  renderCard(goal) {
    return <Picker.Item key={goal.id} label={goal.label} value={goal.id} />;
  }
  render() {
    const goals = this.props.goals;
    let ListItems;
    if (goals) {
      ListItems = goals.map(goal => this.renderCard(goal));
    }
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <Form>
            <Item picker>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="ios-arrow-dropdown" />}
                style={{ width: undefined }}
                placeholder="Select the Goal"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.goal}
                onValueChange={this.onValueChange2.bind(this)}
              >
                {ListItems}
              </Picker>
            </Item>
            <Item>
              <Input
                placeholder="0.00"
                keyboardType="decimal-pad"
                onChangeText={value =>
                  this.setState({ amount: parseInt(value) })
                }
              />
            </Item>
          </Form>
        </ScrollView>
        <View>
          <Button block success onPress={() => this.sendDeposit()}>
            <Text style={{ color: "white" }}>ADD</Text>
          </Button>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.auth.profile,
  goals: state.goal.goals,
  deposits: state.deposit.deposits
});
const mapDispatchToProps = dispatch => ({
  updateGoal: (goal, navigation) =>
    dispatch(actionCreators.updateGoal(goal, navigation)),
  addDeposit: (deposit, goal_id, navigation) =>
    dispatch(actionCreators.addDeposit(deposit, goal_id, navigation))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddDeposit);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  developmentModeText: {
    marginBottom: 20,
    color: "rgba(0,0,0,0.4)",
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center"
  },
  contentContainer: {
    paddingTop: 30
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50
  },
  homeScreenFilename: {
    marginVertical: 7
  },
  codeHighlightText: {
    color: "rgba(96,100,109, 0.8)"
  },
  codeHighlightContainer: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 3,
    paddingHorizontal: 4
  },
  getStartedText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center"
  },
  tabBarInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    paddingVertical: 20
  },
  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center"
  },
  navigationFilename: {
    marginTop: 5
  },
  helpContainer: {
    marginTop: 15,
    alignItems: "center"
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    fontSize: 14,
    color: "#2e78b7"
  }
});
