import { StyleSheet, Platform } from "react-native";

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    width: "75%",
    height: 150,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  label: {
    alignSelf: "center",
    color: "#258779",
    marginTop: 15,
    width: 140
  },
  h3: {
    padding: 15,
    textAlign: "center",
    color: "#BDA747",
    fontWeight: "600",
    fontSize: 25,
    fontFamily: "pacifico-regular"
  },
  inputs: {
    borderBottomColor: "#FFFFFF",
    flex: 1
  },

  button: {
    alignSelf: "center",
    marginVertical: 5,
    backgroundColor: "#BDA747",
    paddingHorizontal: 50,
    shadowColor: "#595959",
    shadowRadius: 1,
    paddingHorizontal: 15
  }
});

export default styles;
