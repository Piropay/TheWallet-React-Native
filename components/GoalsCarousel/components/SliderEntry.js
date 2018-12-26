import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions
} from "react-native";
import PropTypes from "prop-types";
import { ParallaxImage } from "react-native-snap-carousel";
import styles from "../styles/SE";
import { Modal } from "react-native-paper";
import { Card, H2, H3, Button } from "native-base";
import Deposit from "../../Deposit";
import randomColor from "randomcolor";
import ProgressBarAnimated from "react-native-progress-bar-animated";
import { connect } from "react-redux";
import { Icon } from "react-native-elements";
import { Row, Col } from "react-native-easy-grid";

class SliderEntry extends Component {
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
    const barWidth = Dimensions.get("screen").width - 100;

    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.slideInnerContainer}
        // onPress={() => {
        //   this.setModalVisible(true);
        // }}
      >
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
  goals: state.goal.goals,
  deposits: state.deposit.deposits
});
export default connect(mapStateToProps)(SliderEntry);
