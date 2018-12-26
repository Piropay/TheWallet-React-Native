import React, { Component } from "react";
import {
  Platform,
  View,
  ScrollView,
  Text,
  StatusBar,
  SafeAreaView
} from "react-native";
import { LinearGradient } from "expo";
import Carousel, { Pagination } from "react-native-snap-carousel";
import styles, { colors } from "./styles/index.style";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions";
import { sliderWidth, itemWidth } from "./styles/SE";

import SliderEntry from "./components/SliderEntry";
import { scrollInterpolators, animatedStyles } from "./utils/animations";

const IS_ANDROID = Platform.OS === "android";
const SLIDER_1_FIRST_ITEM = 1;

class GoalsCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slider1ActiveSlide: SLIDER_1_FIRST_ITEM
    };
  }

  _renderItem({ item, index }) {
    return (
      <SliderEntry
        data={item}
        even={(index + 1) % 2 === 0}
        navigation={this.props.navigation}
      />
    );
  }

  _renderItemWithParallax({ item, index }, parallaxProps) {
    return (
      <SliderEntry
        data={item}
        even={(index + 1) % 2 === 0}
        parallax={true}
        parallaxProps={parallaxProps}
      />
    );
  }

  _renderLightItem({ item, index }) {
    return (
      <SliderEntry
        data={item}
        even={false}
        navigation={this.props.navigation}
      />
    );
  }

  _renderDarkItem({ item, index }) {
    return <SliderEntry data={item} even={true} />;
  }

  layoutExample(number, title, type) {
    const isTinder = type === "tinder";

    return (
      <View style={[styles.exampleContainer]}>
        <Text
          style={[styles.title, isTinder ? {} : styles.titleLight]}
        >{`Budgets`}</Text>
        <Text style={[styles.subtitle, isTinder ? {} : styles.titleLight]}>
          {title}
        </Text>
        <Carousel
          data={this.props.budgets}
          renderItem={this._renderItem.bind(this)}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
          layout={type}
          loop={true}
        />
      </View>
    );
  }

  customExample(number, title, refNumber, renderItemFunc) {
    const isEven = refNumber % 2 === 0;

    // Do not render examples on Android; because of the zIndex bug, they won't work as is
    return !IS_ANDROID ? (
      <View
        style={[
          styles.exampleContainer,
          isEven ? styles.exampleContainerDark : styles.exampleContainerLight
        ]}
      >
        <Text
          style={[styles.title, isEven ? {} : styles.titleDark]}
        >{`Example ${number}`}</Text>
        <Text style={[styles.subtitle, isEven ? {} : styles.titleDark]}>
          {title}
        </Text>
        <Carousel
          data={this.props.budgets}
          renderItem={renderItemFunc}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
          scrollInterpolator={
            scrollInterpolators[`scrollInterpolator${refNumber}`]
          }
          slideInterpolatedStyle={animatedStyles[`animatedStyles${refNumber}`]}
          useScrollView={true}
        />
      </View>
    ) : (
      false
    );
  }

  get gradient() {
    return (
      <LinearGradient
        colors={[colors.background1, colors.background2]}
        startPoint={{ x: 1, y: 0 }}
        endPoint={{ x: 0, y: 1 }}
        style={styles.gradient}
      />
    );
  }

  render() {
    const example3 = this.layoutExample(3, "Here are your budgets!", "stack");

    const example8 = this.customExample(
      8,
      "Custom animation 4",
      4,
      this._renderLightItem
    );

    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          {this.gradient}
          <ScrollView
            style={styles.scrollview}
            scrollEventThrottle={200}
            directionalLockEnabled={true}
          >
            {example3}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = state => ({
  goals: state.goal.goals,
  budgets: state.budget.budgets
});

export default connect(mapStateToProps)(GoalsCarousel);
