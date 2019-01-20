import React, { Component } from "react";
import { Platform, View, ScrollView, Text, SafeAreaView } from "react-native";
import { LinearGradient } from "expo";
import Carousel, { Pagination } from "react-native-snap-carousel";
import styles, { colors } from "./styles/index.style";
import { connect } from "react-redux";
import { sliderWidth, itemWidth } from "./styles/SE";

import SliderEntry from "./components/SliderEntry";
import { scrollInterpolators, animatedStyles } from "./utils/animations";

const IS_ANDROID = Platform.OS === "android";
const SLIDER_1_FIRST_ITEM = 1;

class BudgetsCarousel extends Component {
  _renderItem({ item, index }) {
    return (
      <SliderEntry
        data={item}
        even={(index + 1) % 2 === 0}
        navigation={this.props.navigation}
      />
    );
  }

  budgetsCarousel(title, type) {
    var today = new Date();
    const budgets = this.props.budgets.filter(budget => {
      let date = new Date(budget.date);
      if (
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      ) {
        return budget;
      }
    });
    return (
      <View style={[styles.exampleContainer]}>
        <Text style={[styles.title, styles.titleLight]}>{`Budgets`}</Text>
        <Text style={[styles.subtitle, styles.titleLight]}>{title}</Text>
        <Carousel
          data={budgets}
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
    const budgets = this.budgetsCarousel("Here are your budgets!", "stack");

    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          {this.gradient}
          <ScrollView
            style={styles.scrollview}
            scrollEventThrottle={200}
            directionalLockEnabled={true}
          >
            {budgets}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = state => ({
  budgets: state.budget.budgets
});

export default connect(mapStateToProps)(BudgetsCarousel);
