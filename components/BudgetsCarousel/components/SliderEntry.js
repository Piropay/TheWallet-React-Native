import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { ParallaxImage } from "react-native-snap-carousel";
import styles from "../styles/SE";

export default class SliderEntry extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    even: PropTypes.bool,
    parallax: PropTypes.bool,
    parallaxProps: PropTypes.object
  };

  get image() {
    const {
      data: { illustration },
      parallax,
      parallaxProps,
      even
    } = this.props;

    return parallax ? (
      <ParallaxImage
        source={{ uri: illustration }}
        containerStyle={[
          styles.imageContainer,
          even ? styles.imageContainerEven : {}
        ]}
        style={styles.image}
        parallaxFactor={0.35}
        showSpinner={true}
        spinnerColor={even ? "rgba(255, 255, 255, 0.4)" : "rgba(0, 0, 0, 0.25)"}
        {...parallaxProps}
      />
    ) : (
      <Image source={{ uri: illustration }} style={styles.image} />
    );
  }
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

  render() {
    const {
      data: { label, amount, balance, category, id, transactions },
      even
    } = this.props;

    const uppercaseTitle = label ? (
      <Text style={{ color: "white" }} numberOfLines={2}>
        {label}
      </Text>
    ) : (
      false
    );

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
          <Image
            source={
              category === "Personal"
                ? {
                    uri: "https://img.icons8.com/metro/500/000000/user-male.png"
                  }
                : { uri: "https://img.icons8.com/metro/500/000000/suv.png" }
            }
            style={styles.image}
          />
          <View style={[styles.radiusMask]} />
        </View>
        <View style={styles.textContainer}>
          {uppercaseTitle}
          <Text style={{ color: "white" }} numberOfLines={2}>
            {amount}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}
