import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2B2B2B",
    height: "100%"
  },
  eventList: {
    marginTop: 20
  },
  eventBox: {
    padding: 10,
    marginTop: 5,
    marginBottom: 5,
    flexDirection: "row"
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "white"
  },
  eventDate: {
    flexDirection: "column"
  },
  eventDay: {
    fontSize: 50,
    color: "#E8D300",
    fontWeight: "600",
    fontFamily: "pacifico-regular",
    textShadowColor: "#7f7f7f",
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 1
  },
  eventMonth: {
    fontSize: 16,
    color: "#E8D300",
    fontWeight: "600",
    fontFamily: "pacifico-regular",
    textShadowColor: "#7f7f7f",
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 1
  },
  eventContent: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    marginLeft: 10,
    backgroundColor: "#FFFFFF",
    paddingLeft: 20,
    borderRadius: 10,
    shadowColor: "#a0a0a0",
    shadowRadius: 1,
    shadowOpacity: 0.5,
    shadowOffset: { width: 5, height: 7 }
  },
  description: {
    fontSize: 15,
    color: "#646464"
  },
  eventTime: {
    fontSize: 20,
    color: "#151515",
    fontFamily: "quicksand-regular"
  },
  userName: {
    fontSize: 16,
    color: "#151515",
    fontFamily: "quicksand-regular"
  },
  popup: {
    backgroundColor: "#fff",
    marginHorizontal: 40,
    borderRadius: 10
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
    fontFamily: "pacifico-regular",
    textShadowColor: "#7f7f7f",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1
  },
  popupOverlay: {
    backgroundColor: "#00000057",
    flex: 1
  },
  popupContent: {
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
