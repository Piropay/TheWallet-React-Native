import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/";

import {
  StyleSheet,
  Platform,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView
} from "react-native";
import { H1, Item, Picker, Icon } from "native-base";
import styles from "./styles";

class UpdateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNo: this.props.profile.phoneNo,
      dob: this.props.profile.dob,
      gender: this.props.profile.gender,
      income: this.props.profile.income,
      balance: 0,
      savings: this.props.profile.savings,
      automated: this.props.profile.automated
    };
  }

  onClickListener = () => {
    this.props.UpdateProfile(this.state, this.props.navigation);
  };

  onValueChange2(value) {
    this.setState({
      gender: value
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <Image
            style={styles.bgImage}
            source={{ uri: "https://lorempixel.com/900/1400/nightlife/2/" }}
          />
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputs}
              placeholder="Phone Number"
              keyboardType="numeric"
              defaultValue={this.state.phoneNo}
              underlineColorAndroid="transparent"
              onChangeText={number => this.setState({ phoneNo: number })}
            />
            <Image
              style={styles.inputIcon}
              source={{
                uri: "https://img.icons8.com/nolan/40/000000/email.png"
              }}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputs}
              placeholder="Date of Birth"
              defaultValue={this.state.dob}
              underlineColorAndroid="transparent"
              onChangeText={dob => this.setState({ dob: dob })}
            />
            <Image
              style={styles.inputIcon}
              source={{ uri: "https://img.icons8.com/nolan/40/000000/key.png" }}
            />
          </View>

          <View style={styles.inputContainer}>
            <Item picker>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="ios-arrow-dropdown" />}
                placeholder="Select Gender"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.gender}
                onValueChange={value => this.onValueChange2(value)}
              >
                <Picker.Item key={1} label={"Male"} value={"Male"} />
                <Picker.Item key={2} label={"Female"} value={"Female"} />
              </Picker>
            </Item>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputs}
              placeholder="Monthley Income"
              defaultValue={this.state.income + ""}
              keyboardType="numeric"
              underlineColorAndroid="transparent"
              onChangeText={income =>
                this.setState({ income, balance: income })
              }
            />
            <Image
              style={styles.inputIcon}
              source={{ uri: "https://img.icons8.com/nolan/40/000000/key.png" }}
            />
          </View>

          <TouchableOpacity
            style={[styles.buttonContainer, styles.loginButton]}
            onPress={() => this.onClickListener()}
          >
            <Text style={styles.loginText}>Update</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

const mapActionsToProps = dispatch => {
  return {
    UpdateProfile: (profile, navigation) =>
      dispatch(actionCreators.updateProfile(profile, navigation))
  };
};

const mapStateToProps = state => ({
  income: state.userInfo.income,
  expenses: state.userInfo.expenses,
  profile: state.auth.profile
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(UpdateProfile);
