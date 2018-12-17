import React from "react";
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, List, Card, CardItem, Body } from "native-base";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions";

class GoalView extends React.Component {
  static navigationOptions = {
    title: "Goals"
  };
  componentDidUpdate(prevProps) {}
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
      <Card key={goal.id}>
        <CardItem>
          <Body>
            <Text>{goal.label}</Text>
            <Text>{goal.end_date}</Text>
            <Text>{parseFloat(goal.amount).toFixed(3)}KWD</Text>
            <Text>
              Suggested Monthly Deposit: {parseFloat(mdeposit).toFixed(3)} KWD
            </Text>
          </Body>
        </CardItem>
      </Card>
    );
  }
  render() {
    const goals = this.props.goals;
    let ListItems;
    if (goals) {
      console.log(goals);

      ListItems = goals.map(goal => this.renderCard(goal));
    }
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <List>{ListItems}</List>
        </ScrollView>
        <View>
          <Button
            block
            success
            onPress={() => this.props.navigation.navigate("Deposit")}
          >
            <Text style={{ color: "white" }}> ADD</Text>
          </Button>
        </View>
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
