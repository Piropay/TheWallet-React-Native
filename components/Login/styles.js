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
  shadow: {
    shadowColor: "#2b2b2b",
    shadowRadius: 1,
    shadowOpacity: 0.7,
    shadowOffset: { width: 8, height: 8 },
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
    flex: 1
  },
  text: {
    fontWeight: "bold",
    fontFamily: "pacifico-regular",
    fontSize: 22,
    paddingBottom: 40
  },
  container: {
    marginVertical: 30
  },
  contentContainer: {
    paddingVertical: 20
  },
  label: {
    color: "#258779",
    marginTop: 15
  },
  button: {
    top: 50,
    marginBottom: 10,
    backgroundColor: "#258779",
    paddingHorizontal: 50,
    shadowColor: "#2b2b2b",
    shadowRadius: 1,
    shadowOpacity: 0.7,
    borderRadius: 5,
    shadowOffset: { width: 5, height: 5 },
    paddingBottom: 13
  },
  header: {
    paddingTop: 40,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 10,
    alignSelf: "center",
    color: "#D5C157",
    fontFamily: "pacifico-regular",
    fontSize: 50,
    textShadowColor: "#7f7f7f",
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 1
  }
});

export default styles;
