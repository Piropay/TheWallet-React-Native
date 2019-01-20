import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import PropTypes from "prop-types";
import { ParallaxImage } from "react-native-snap-carousel";
import styles from "../styles/SE";
import { H3 } from "native-base";
import randomColor from "randomcolor";
import ProgressBarAnimated from "react-native-progress-bar-animated";
import { connect } from "react-redux";
import { Icon } from "react-native-elements";
import { Row, Col } from "react-native-easy-grid";

class SliderEntry extends Component {
  render() {
    let color = randomColor({ hue: "#43B863", luminosity: "dark" });
    const goal = this.props.data;
    let { label, amount } = { ...goal };
    totalDeposits = 0;
    this.props.deposits.forEach(deposit => {
      if (deposit.goal === goal.id) totalDeposits += parseFloat(deposit.amount);
    });
    const progressCustomStyles = {
      backgroundColor: "#43B863",
      borderRadius: 20,
      borderColor: "#43B863"
    };
    const barWidth = Dimensions.get("screen").width - 150;
    return (
      <TouchableOpacity activeOpacity={1} style={styles.slideInnerContainer}>
        <View style={styles.shadow} />
        <View style={[styles.imageContainer, { backgroundColor: color }]}>
          <H3 style={styles.h3}>{label}</H3>
          <Row style={{ alignItems: "flex-end", top: 0 }}>
            <Col
              style={{
                flex: 0.2,
                padding: 0,
                marginBottom: 5
              }}
            >
              <Icon size={30} name="calendar" type="evilicon" color="#fff" />
            </Col>
            <Col style={{ flex: 1, marginHorizontal: 0, padding: 0 }}>
              <Text style={styles.date}>{goal.end_date}</Text>
            </Col>
          </Row>
        </View>
        <View style={[styles.textContainer]}>
          <ProgressBarAnimated
            {...progressCustomStyles}
            width={barWidth}
            value={(totalDeposits / goal.amount) * 100}
            maxValue={parseFloat(goal.amount)}
          />
          <Row style={{ height: 30 }}>
            <Col>
              <Text
                style={[
                  styles.number,
                  { alignSelf: "flex-start", paddingRight: 10 }
                ]}
              >
                {totalDeposits}/{parseFloat(goal.amount).toFixed(2)}
              </Text>
            </Col>
            <Col>
              <Text style={[styles.number]} numberOfLines={2}>
                {((totalDeposits / goal.amount) * 100).toFixed(1)}%
              </Text>
            </Col>
          </Row>
        </View>
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = state => ({
  deposits: state.deposit.deposits
});
export default connect(mapStateToProps)(SliderEntry);
