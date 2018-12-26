import { StyleSheet, Platform } from "react-native";
export const colors = {
  black: "#1a1917",
  gray: "#888888",
  background1: "#2B2B2B",
  background2: "#BEA647"
};

const styles = StyleSheet.create({
  gradient: {
    ...StyleSheet.absoluteFillObject
  },
  container: {
    flex: 1
  },
  card: {
    alignSelf: "center",
    width: "90%"
  },
  buttontext: {
    paddingTop: 10,
    paddingHorizontal: 5,
    color: "#fff",
    fontWeight: "bold",
    fontFamily: "pacifico-regular",
    fontSize: 20,
    paddingBottom: 40
  },
  greenbutton: {
    marginVertical: 5,
    marginHorizontal: 5,
    backgroundColor: "#258779",
    paddingHorizontal: 50,
    shadowColor: "#2b2b2b",
    shadowRadius: 1,
    shadowOpacity: 0.7,
    borderRadius: 5,
    shadowOffset: { width: 5, height: 5 },
    paddingBottom: 13
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
