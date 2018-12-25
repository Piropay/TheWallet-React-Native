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

  async componentDidMount() {
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
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <BudgetsCarousel navigation={this.props.navigation} />

        <GoalsCarousel />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  profile: state.auth.profile,
  budgets: state.budget.budgets
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
  contentContainer: {},
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
