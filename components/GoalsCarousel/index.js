import React, { Component } from "react";
import {
  Platform,
  View,
  ScrollView,
  Text,
  StatusBar,
  SafeAreaView,
  TouchableOpacity
} from "react-native";
import { LinearGradient } from "expo";
import Carousel, { Pagination } from "react-native-snap-carousel";
import styles, { colors } from "./styles/index.style";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions";
import { sliderWidth, itemWidth } from "./styles/SE";

import SliderEntry from "./components/SliderEntry";
import { ENTRIES1, ENTRIES2 } from "./static/entries";
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
        navigation={this.props.navigation}
        data={item}
        even={(index + 1) % 2 === 0}
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
        navigation={this.props.navigation}
        data={item}
        even={false}
      />
    );
  }

  _renderDarkItem({ item, index }) {
    return (
      <SliderEntry navigation={this.props.navigation} data={item} even={true} />
    );
  }

  layoutExample(number, title, type) {
    const isTinder = type === "tinder";

    return (
      <View style={[styles.exampleContainer]}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            this.props.navigation.navigate("GoalsView");
          }}
        >
          <Text
            style={[styles.title, isTinder ? {} : styles.titleLight]}
          >{`Goals`}</Text>
          <Text style={[styles.subtitle, isTinder ? {} : styles.titleLight]}>
            {title}
          </Text>
        </TouchableOpacity>
        <Carousel
          data={this.props.goals.slice(
            this.props.goals.length - 5,
            this.props.goals.length
          )}
          renderItem={
            isTinder
              ? this._renderLightItem.bind(this)
              : this._renderItem.bind(this)
          }
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
    const example3 = this.layoutExample(3, "The key is to deposit!", "stack");

    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <StatusBar
            translucent={true}
            backgroundColor={"rgba(0, 0, 0, 0.3)"}
            barStyle={"light-content"}
          />
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
