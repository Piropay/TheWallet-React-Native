import React from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from "react-native";
import GoalsCarousel from "../components/GoalsCarousel";
import BudgetsCarousel from "../components/BudgetsCarousel";
import { Button } from "native-base";
import { connect } from "react-redux";
import { Row, Grid } from "react-native-easy-grid";

// Actions
import * as actionCreators from "../store/actions";

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Home"
  };

  componentDidMount() {
    if (this.props.profile) {
      if (this.props.budgets) {
        var today = new Date();
        if (this.props.budgets.length !== 0) {
          var compDate = new Date(
            this.props.budgets[this.props.budgets.length - 1].date
          );
          if (
            (today.getMonth() !== compDate.getMonth()) |
            (today.getFullYear() !== compDate.getFullYear())
          ) {
            this.props.navigation.replace("Report");
          }
        } else if (!this.props.profile.income) {
          this.props.navigation.replace("UpdateProfile");
        } else {
          console.log("sdefafaf", this.props.profile.income);

          this.props.navigation.replace("Home");
        }
      }
    }
  }

  render() {
    if (this.props.loading) {
      return <Text>Loadin</Text>;
    } else {
      return (
        <View style={styles.container}>
          <ScrollView>
            <BudgetsCarousel navigation={this.props.navigation} />

            <GoalsCarousel navigation={this.props.navigation} />
          </ScrollView>
        </View>
      );
    }
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  profile: state.auth.profile,
  budgets: state.budget.budgets,
  loading: state.budget.loading
});
const mapDispatchToProps = dispatch => ({
  logout: navigation => dispatch(actionCreators.logout(navigation))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
