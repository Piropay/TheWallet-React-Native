import { StyleSheet } from "react-native";
export const colors = {
  black: "#1a1917",
  gray: "#888888",
  background1: "#2B2B2B",
  background2: "#258779"
};
const styles = StyleSheet.create({
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
  circle: {
    marginTop: 20,
    marginRight: 10,
    width: 35,
    height: 35,
    borderRadius: 35 / 2,
    backgroundColor: "#258779",
    borderColor: "#fff",
    justifyContent: "center"
  },
  number: {
    color: "#fff",
    alignSelf: "center",
    fontWeight: "bold",
    fontFamily: "pacifico-regular",
    fontSize: 30,
    paddingBottom: 60
  },
  text: {
    fontWeight: "bold",
    fontFamily: "pacifico-regular",
    fontSize: 22,
    paddingBottom: 40
  },
  container: {
    backgroundColor: "#2B2B2B",
    paddingVertical: 20
  },
  contentContainer: {
    paddingVertical: 20
  },
  label: {
    color: "#258779",
    marginTop: 15,
    marginLeft: 40,
    marginRight: 40
  },
  button: {
    top: 50,
    marginBottom: 10,
    backgroundColor: "#BDA747",
    paddingHorizontal: 50,
    shadowColor: "#2b2b2b",
    shadowRadius: 1,
    shadowOpacity: 0.7,
    borderRadius: 5,
    shadowOffset: { width: 5, height: 5 },
    paddingBottom: 13
  },
  header: {
    paddingTop: 10,
    paddingBottom: 10,
    alignSelf: "center",
    color: "#258779",
    fontFamily: "pacifico-regular",
    fontSize: 30
  },
  h3: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    fontFamily: "pacifico-regular",
    textShadowColor: "#2b2b2b",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
    paddingTop: 10
  },
  gradient: {
    ...StyleSheet.absoluteFillObject
  }
});
export default styles;
