import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions";
import { AsyncStorage, AppState } from "react-native";
// import BackgroundTask from "react-native-background-task";
import styles from "./styles";
// NativeBase Components
import {
  Text,
  Button,
  Body,
  List,
  ListItem,
  Form,
  Label,
  Input,
  Item,
  Content,
  Header
} from "native-base";
import { Platform, ScrollView, StyleSheet, View } from "react-native";
import { Toast } from "native-base";

// BackgroundTask.define(() => {
//   console.log("Hello from a background task");
//   this.render;
//   BackgroundTask.finish();
// });

class Location extends Component {
  static navigationOptions = {
    title: "Location"
  };
  constructor(props) {
    super(props);
    this.state = {
      location: this.props.location
    };
  }
  async componentDidMount() {
    await this.props.getCurrentPositionThunk();
  }

  updating(profile) {
    this.props.updateProfile(profile, this.props.navigation);
  }

  toRad = function(num) {
    return (num * Math.PI) / 180;
  };
  render() {
    if (this.props.profile) {
      if (!this.props.fetching) {
        if (
          this.props.profile.longitude === null ||
          this.props.profile.latitude === null ||
          this.props.profile.accuracy === null
        ) {
          let profile = this.props.profile;
          profile.longitude = this.props.location.coords.longitude;
          profile.latitude = this.props.location.coords.latitude;
          profile.accuracy = this.props.location.coords.accuracy;
          this.props.updateProfile(profile, this.props.navigation);
        }
        let lat1 = parseFloat(this.props.profile.latitude);
        let lon1 = parseFloat(this.props.profile.longitude);
        let lat2 = this.props.location.coords.latitude;
        let lon2 = this.props.location.coords.longitude;
        var Radius = 6371e3; // metres
        var latitude1 = this.toRad(lat1);
        var latitude2 = this.toRad(lat2);
        var deltalatitude = this.toRad(lat2 - lat1);
        var deltalongitude = this.toRad(lon2 - lon1);
        console.log("lat1", lat1);
        console.log("lon1", lon1);
        console.log("lat2", lat2);
        console.log("lon2", lat1);
        console.log("Radius", Radius);
        console.log("latitude1", latitude1);
        console.log("latitude2", latitude2);
        console.log("deltalatitude", deltalatitude);
        console.log("deltalongitude", deltalongitude);
        var a =
          Math.sin(deltalatitude / 2) * Math.sin(deltalatitude / 2) +
          Math.cos(latitude1) *
            Math.cos(latitude2) *
            Math.sin(deltalongitude / 2) *
            Math.sin(deltalongitude / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        var d = Radius * c;

        console.log("DDDDIIIISSSSTTTTAAAANNNCCCEEEEE", d / 1000);

        if (d / 1000 > 1 + parseFloat(this.props.profile.accuracy) / 1000) {
          let profile = this.props.profile;
          profile.longitude = this.props.location.coords.longitude;
          profile.latitude = this.props.location.coords.latitude;
          profile.accuracy = this.props.location.coords.accuracy;
          // alert(
          //   " Your location has changed by " +
          //     (d / 1000).toFixed(2) +
          //     " KMs dont forget to add any transactions you made"
          // );
          Toast.show({
            text:
              " Your location has changed by " +
              (d / 1000).toFixed(2) +
              " KMs dont forget to add any transactions you made",
            buttonText: "Okay",
            duration: 30000,
            type: "warning",
            buttonTextStyle: { color: "#000" },
            buttonStyle: {
              backgroundColor: "#F1C04F",
              alignSelf: "center"
            }
          });
          this.updating(profile);
          // create notification
        }
      }
    }
    return null;
  }
}

const mapStateToProps = state => ({
  profile: state.auth.profile,
  location: state.location.position,
  fetching: state.location.fetching
});

const mapDispatchToProps = dispatch => ({
  getCurrentPositionThunk: options =>
    dispatch(actionCreators.getCurrentPositionThunk(options)),
  updateProfile: (profile, navigation) =>
    dispatch(actionCreators.updateProfile(profile, navigation))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Location);
