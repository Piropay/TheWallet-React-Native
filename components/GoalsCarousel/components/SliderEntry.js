import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import PropTypes from "prop-types";
import { ParallaxImage } from "react-native-snap-carousel";
import styles from "../styles/SE";
import { Modal } from "react-native-paper";
import { Card, H2, H3, Button } from "native-base";
import Deposit from "../../Deposit";

export default class SliderEntry extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,

    parallax: PropTypes.bool,
    parallaxProps: PropTypes.object
  };

  get image() {
    const {
      data: { illustration },
      parallax,
      parallaxProps
    } = this.props;

    return parallax ? (
      <ParallaxImage
        source={{ uri: illustration }}
        containerStyle={[styles.imageContainer]}
        style={styles.image}
        parallaxFactor={0.35}
        showSpinner={true}
        spinnerColor="rgba(0, 0, 0, 0.25)"
        {...parallaxProps}
      />
    ) : (
      <Image source={{ uri: illustration }} style={styles.image} />
    );
  }

  state = { modalVisible: false };
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  render() {
    const goal = this.props.data;
    let { label, amount } = { ...goal };
    const uppercaseTitle = label ? (
      <Text style={[styles.label]} numberOfLines={2}>
        {label.toUpperCase()}
      </Text>
    ) : (
      false
    );

    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.slideInnerContainer}
        onPress={() => {
          this.setModalVisible(true);
        }}
      >
        <View style={styles.shadow} />
        <View style={[styles.imageContainer]}>
          {this.image}
          <View style={[styles.radiusMask]} />
        </View>
        <View style={[styles.textContainer]}>
          {uppercaseTitle}
          <Text style={[styles.amount]} numberOfLines={2}>
            {amount}
          </Text>
          <Modal
            animationType={"slide"}
            transparent={true}
            onRequestClose={() => this.setModalVisible(false)}
            visible={this.state.modalVisible}
          >
            <View style={[{ position: "absolute", bottom: 0 }]}>
              <Card style={[styles.shadow, styles.popup]}>
                <View style={styles.popupContent}>
                  <ScrollView contentContainerStyle={styles.modalInfo}>
                    <H2 style={styles.h3}>Your Goal</H2>
                    <H3 style={styles.name}>{goal.label}</H3>
                    <Text style={styles.position}>{goal.amount} KWD</Text>
                    <Text style={styles.position}>
                      {goal.balance} KWD left to reach the goal!
                    </Text>
                    <Text style={styles.about}>Reach by: {goal.end_date}</Text>
                    <Text style={styles.about}>
                      Suggested Deposit:
                      {parseFloat(this.state.mdeposit).toFixed(3)} KWD
                    </Text>
                    <Deposit goal={goal} />
                  </ScrollView>
                </View>
                <View style={styles.popupButtons}>
                  <Button
                    onPress={() => {
                      this.setModalVisible(false);
                    }}
                    style={styles.btnClose}
                  >
                    <Text style={{ color: "wheat" }}>Close</Text>
                  </Button>
                </View>
              </Card>
            </View>
          </Modal>
        </View>
      </TouchableOpacity>
    );
  }
}
