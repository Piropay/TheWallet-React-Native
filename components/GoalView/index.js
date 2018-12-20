import React from "react";
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, List, Card, CardItem, Body } from "native-base";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions";
import styles from "./styles";

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

export default connect(mapStateToProps)(GoalView);
