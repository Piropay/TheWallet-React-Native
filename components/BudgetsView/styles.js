import { StyleSheet, Platform } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2B2B2B"
  },
  card: {
    alignSelf: "center",
    width: "90%"
  },
  shadow: {
    shadowColor: "#595959",
    shadowRadius: 1,
    shadowOpacity: 0.7,
    shadowOffset: { width: 8, height: 8 }
  },
  contentContainer: {
    paddingTop: 30
  }
});

export default styles;
