import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#2B2B2B"
  },
  shadow: {
    shadowColor: "#595959",
    shadowRadius: 1,
    shadowOpacity: 0.7,
    shadowOffset: { width: 8, height: 8 },
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
    flex: 1,
    marginVertical: 5
  },
  label: {
    textAlign: "center"
  },
  h3: {
    textAlign: "center",
    color: "#BDA747",
    fontWeight: "bold",
    fontFamily: "pacifico-regular",
    textShadowColor: "#7f7f7f",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
    paddingTop: 10
  },
  text: {
    textAlign: "center",
    color: "#BDA747",
    fontFamily: "quicksand-regular"
  },
  contentContainer: {
    paddingTop: 30
  },
  row: {
    flex: 1,
    flexDirection: "row",
    marginVertical: 40,
    shadowColor: "#a0a0a0",
    shadowRadius: 1,
    shadowOpacity: 0.5,
    shadowOffset: { width: 5, height: 7 }
  },
  inputWrap: {
    flex: 1,
    borderColor: "#cccccc",
    borderBottomWidth: 1,
    marginBottom: 10
  },
  inputdate: {
    fontSize: 14,
    marginBottom: -12,
    color: "#6a4595"
  },
  inputcvv: {
    fontSize: 14,
    marginBottom: -12,
    color: "#6a4595"
  },
  inputs: {
    marginLeft: 16,
    borderBottomColor: "#FFFFFF",
    flex: 1
  },
  inputContainer: {
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    height: 40,
    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginLeft: 10,
    marginRight: 10,
    elevation: 5
  },
  button: {
    marginVertical: 5,
    backgroundColor: "#BDA747",
    paddingHorizontal: 50,
    shadowColor: "#595959",
    shadowRadius: 1,
    shadowOpacity: 0.7,
    borderRadius: 5,
    shadowOffset: { width: 5, height: 5 },
    paddingBottom: 13
  },
  closeButton: {
    alignSelf: "flex-end",
    marginRight: 10,
    marginVertical: 10,
    backgroundColor: "#BA2D17",
    paddingHorizontal: 15,
    shadowColor: "#595959",
    shadowRadius: 1,
    shadowOpacity: 0.7,
    borderRadius: 20,
    shadowOffset: { width: 3, height: 3 }
  }
});

export default styles;
