import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Alert,
  Image,
  ListView,
  TouchableOpacity
} from "react-native";
import { H1, Button, List, Card, CardItem, Body } from "native-base";

import styles from "./styles";

export default class BudgetDetails extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    let budget = this.props.navigation.getParam("budget", {});
    this.state = {
      dataSource: ds.cloneWithRows(budget.transactions)
    };
  }

  render() {
    let budget = this.props.navigation.getParam("budget", {});

    return (
      <View style={styles.container}>
        <Button
          onPress={() =>
            this.props.navigation.navigate("UpdateBudget", { budget: budget })
          }
        >
          <Text>Update Budget</Text>
        </Button>
        {budget.transactions.length > 0 ? (
          <ListView
            enableEmptySections={true}
            style={styles.eventList}
            dataSource={this.state.dataSource}
            renderRow={transaction => {
              return (
                <TouchableOpacity>
                  <View style={styles.eventBox}>
                    <View style={styles.eventDate}>
                      <Text style={styles.eventDay}>
                        {new Date(transaction.date).getDate()}
                      </Text>
                      <Text style={styles.eventMonth}>
                        {new Date(transaction.date).toLocaleString("en-us", {
                          month: "short"
                        })}
                      </Text>
                    </View>
                    <View style={styles.eventContent}>
                      <Text style={styles.eventTime}>
                        Label: {transaction.label}
                      </Text>
                      <Text style={styles.eventTime}>
                        Amount: {transaction.amount} KD
                      </Text>
                      <Text style={styles.userName}>
                        Category: {budget.category}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        ) : (
          <Card style={styles.container}>
            <H1>No transactions made for this budget </H1>
          </Card>
        )}
      </View>
    );
  }
}
