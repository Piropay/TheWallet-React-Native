import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { ParallaxImage } from "react-native-snap-carousel";
import styles from "../styles/SE";

export default class SliderEntry extends Component {
  setColor(category) {
    if (category === "Personal") {
      return "#00A6B5";
    } else if (category === "Emergency") {
      return "#EB3647";
    } else if (category === "Entertainment") {
      return "#F1C04F";
    } else if (category === "Food") {
      return "#61C747";
    } else if (category === "Health") {
      return "#F1D6B8";
    } else if (category === "Transportation") {
      return "#FF9786";
    } else if (category === "Others") {
      return "#BDBDBD";
    }
  }

  setImage(category) {
    if (category === "Personal") {
      return {
        uri: "https://img.icons8.com/metro/500/000000/user-male.png"
      };
    } else if (category === "Emergency") {
      return {
        uri: "https://img.icons8.com/metro/500/000000/siren.png"
      };
    } else if (category === "Entertainment") {
      return {
        uri: "https://img.icons8.com/metro/500/000000/dancing.png"
      };
    } else if (category === "Food") {
      return {
        uri: "https://img.icons8.com/metro/500/000000/meal.png"
      };
    } else if (category === "Health") {
      return {
        uri: "https://img.icons8.com/metro/500/000000/clinic.png"
      };
    } else if (category === "Transportation") {
      return {
        uri: "https://img.icons8.com/metro/500/000000/ground-transportation.png"
      };
    } else if (category === "Others") {
      return {
        uri: "https://img.icons8.com/metro/500/000000/stack-of-money.png"
      };
    }
  }

  render() {
    const {
      data: { label, amount, balance, category, id, transactions }
    } = this.props;

    return (
      <TouchableOpacity
        activeOpacity={1}
        style={[styles.slideInnerContainer]}
        onPress={() => {
          this.props.navigation.navigate("BudgetDetails", {
            budget: { label, amount, balance, category, id, transactions }
          });
        }}
      >
        <View style={[styles.shadow]} />
        <View
          style={[
            styles.imageContainer,
            {
              backgroundColor: this.setColor(category)
            }
          ]}
        >
          <Image source={this.setImage(category)} style={styles.image} />
          <View style={[styles.radiusMask]} />
        </View>
        <View style={styles.textContainer}>
          <Text style={{ color: "white" }} numberOfLines={2}>
            {label}
          </Text>
          <Text style={{ color: "white" }} numberOfLines={2}>
            {amount}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}
