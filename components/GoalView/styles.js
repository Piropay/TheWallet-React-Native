import { StyleSheet, Platform } from "react-native";

export const colors = {
  black: "#1a1917",
  gray: "#888888",
  background1: "#2B2B2B",
  background2: "#258779"
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  gradient: {
    ...StyleSheet.absoluteFillObject
  },
  card: {
    alignSelf: "center",
    width: "90%"
  },
  contentContainer: {
    paddingTop: 30
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
  button: {
    marginHorizontal: 5,
    marginVertical: 5,
    backgroundColor: "#BDA747",
    paddingHorizontal: 50,
    shadowColor: "#2b2b2b",
    shadowRadius: 1,
    shadowOpacity: 0.7,
    borderRadius: 5,
    shadowOffset: { width: 3, height: 5 },
    paddingBottom: 13
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
  popup: {
    alignSelf: "center",
    backgroundColor: "#fff",
    marginTop: 80,
    marginHorizontal: 40,
    borderRadius: 10,
    width: "95%"
  },
  shadow: {
    shadowColor: "#595959",
    shadowRadius: 1,
    shadowOpacity: 0.7,
    shadowOffset: { width: 8, height: 8 }
  },
  h3: {
    padding: 10,
    textAlign: "center",
    color: "#BDA747",
    fontWeight: "600",
    fontFamily: "pacifico-regular"
  },
  popupOverlay: {
    backgroundColor: "#00000057",
    flex: 1
  },
  popupContent: {
    //alignItems: 'center',

    margin: 5,
    height: 350
  },
  popupHeader: {
    marginBottom: 45
  },
  popupButtons: {
    marginTop: 15,
    flexDirection: "row",
    borderTopWidth: 1,
    borderColor: "#eee",
    justifyContent: "center"
  },
  popupButton: {
    flex: 1,
    marginVertical: 16
  },
  btnClose: {
    alignSelf: "center",

    paddingHorizontal: 15,

    borderRadius: 20
  },
  Header: {
    marginRight: 10,
    marginVertical: 10,
    backgroundColor: "#278979",
    paddingHorizontal: 15,
    shadowColor: "#595959",
    shadowRadius: 1,
    shadowOpacity: 0.7,
    borderRadius: 20,
    shadowOffset: { width: 3, height: 3 }
  },
  modalInfo: {
    alignItems: "center",
    justifyContent: "center"
  },
  name: {
    fontFamily: "quicksand-bold",
    fontSize: 30,
    flex: 1,
    alignSelf: "center",
    color: "#fff",
    fontWeight: "bold",
    paddingVertical: 10
  },
  position: {
    fontSize: 17,
    flex: 1,
    alignSelf: "flex-start",
    color: "#2b2b2b",
    marginHorizontal: 50
  },
  about: {
    fontSize: 17,
    flex: 1,
    alignSelf: "flex-start",
    color: "#2b2b2b",
    marginHorizontal: 50
  }
});
export default styles;
