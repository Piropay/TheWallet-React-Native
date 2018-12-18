import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  shadow: {
    alignSelf: "center",
    shadowColor: "#a0a0a0",
    shadowRadius: 7,
    shadowOpacity: 0.5,
    shadowOffset: { width: 5, height: 7 },
    width: 200,
    height: 200,
    borderRadius: 200 / 2,
    backgroundColor: "#fff",
    padding: 5
  },
  text: {
    fontWeight: "bold",
    fontFamily: "pacifico-regular",
    fontSize: 22,
    paddingBottom: 40
  },
  signup: {
    marginLeft: 35,
    marginRight: 35,
    paddingBottom: 13,
    marginTop: 20,
    backgroundColor: "#D5C157",
    shadowColor: "#595959",
    shadowRadius: 1,
    shadowOpacity: 0.7,
    borderRadius: 5,
    shadowOffset: { width: 5, height: 5 }
  },
  login: {
    marginLeft: 35,
    marginRight: 35,
    backgroundColor: "#258779",
    paddingBottom: 13,
    shadowColor: "#595959",
    shadowRadius: 1,
    shadowOpacity: 0.7,
    borderRadius: 5,
    shadowOffset: { width: 5, height: 5 }
  }
});
export default styles;
