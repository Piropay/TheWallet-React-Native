import { ActionSheetIOS } from "react-native";
import React, { Component } from "react";

export class OpenContextMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      update: false
    };

    console.log("initial state", this.state);
  }
  openContextMenu = type => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["Cancel", "Remove", "Update"],
        destructiveButtonIndex: 1,
        cancelButtonIndex: 0
      },
      buttonIndex => {
        if (buttonIndex === 1) {
          alert("canceled");
        } else if (buttonIndex === 2) {
          if (type === "transaction") {
            console.log("true");
            this.setState(
              {
                update: true
              },
              () => {
                console.log("new state", this.state);
              }
            );
          }
          console.log("huih;iu");
        }
      }
    );
    return this.state.update;
  };
  render() {
    return this.openContextMenu(this.props.tpye);
  }
}
export const update = openContextMenu();
export default OpenContextMenu;
