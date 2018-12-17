import React, { Component } from "react";
import { connect } from "react-redux";
import { CheckBox } from "react-native-elements";

import { Col, Row, Grid } from "react-native-easy-grid";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView
} from "react-native";
// NativeBase Components
import { Text } from "native-base";

// Style
import styles from "./styles";

// Actions
import * as actionCreators from "../../store/actions";

// Navigation

class Profile extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Profile"
  });

  constructor(props) {
    super(props);
    this.state = { checked: this.props.profile.automated };
    this.automate = this.automate.bind(this);
  }

  async componentDidMount() {
    if (this.props.user) {
      await this.props.fetchProfile();
    }
  }

  automate() {
    this.setState({ checked: !this.state.checked });
    let profile = { ...this.props.profile, automated: !this.state.checked };

    this.props.updateProfile(profile);
  }
  render() {
    const prof = this.props.profile;
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header} />
          <View style={styles.body}>
            <CheckBox
              center
              title="Automate my budgets"
              checked={this.state.checked}
              onPress={() => this.automate()}
            />
            <View style={styles.bodyContent}>
              <Text style={styles.name}>
                {this.props.user.username.toUpperCase()}
              </Text>
              <Text style={styles.info}>Number {prof.phoneNo}</Text>
              <Text style={styles.info}>Date Of Birth: {prof.dob}</Text>
              <Text style={styles.info}>Gender: {prof.gender}</Text>
              <Text style={styles.info}>Income: {prof.income}</Text>
              <Text style={styles.info}>Balance: {prof.balance}</Text>
              <Text style={styles.info}>Savings: {prof.savings}</Text>

              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("AddressList")}
                style={styles.buttonContainer}
              >
                <Text>Addresses</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Orders")}
                style={styles.buttonContainer}
              >
                <Text>Orders</Text>
              </TouchableOpacity>
              <TouchableOpacity
                danger
                onPress={() => this.props.logout(this.props.navigation)}
                style={styles.buttonContainer}
              >
                <Text>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}
const mapStateToProps = state => ({
  user: state.auth.user,
  profile: state.auth.profile
});

const mapActionsToProps = dispatch => ({
  fetchProfile: () => dispatch(actionCreators.fetchProfile()),
  updateProfile: auto => dispatch(actionCreators.updateProfile(auto)),
  logout: navigation => dispatch(actionCreators.logout(navigation))
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Profile);
