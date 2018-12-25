import { StyleSheet } from "react-native";
export const colors = {
  black: "#1a1917",
  gray: "#888888",
  background1: "#2B2B2B",
  background2: "#258779"
};
const styles = StyleSheet.create({
  gradient: {
    ...StyleSheet.absoluteFillObject
  },
  container: {
    paddingVertical: 40
  },
  contentContainer: {
    paddingVertical: 20
  },
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
  header: {
    paddingTop: 40,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 10,
    alignSelf: "center",
    color: "#D5C157",
    fontFamily: "pacifico-regular",
    textShadowColor: "#2b2b2b",
    textShadowOffset: { width: 1, height: 3 },
    textShadowRadius: 1,
    fontWeight: "bold",
    color: "#fff",
    fontSize: 30,
    paddingBottom: 40,
    textAlign: "center"
  },
  signup: {
    marginLeft: 35,
    marginRight: 35,
    paddingBottom: 13,
    marginTop: 20,
    backgroundColor: "#D5C157",
    shadowColor: "#2b2b2b",
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
    shadowColor: "#2b2b2b",
    shadowRadius: 1,
    shadowOpacity: 0.7,
    borderRadius: 5,
    shadowOffset: { width: 5, height: 5 }
  }
});
export default styles;
