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
  popup: {
    backgroundColor: "#2B2B2B",
    marginTop: 40,
    marginHorizontal: 40,
    borderRadius: 10
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
    paddingHorizontal: 10,
    marginVertical: 5,
    backgroundColor: "#BA2D17",
    shadowColor: "#595959",
    shadowRadius: 1,
    shadowOpacity: 0.7,
    borderRadius: 5,
    shadowOffset: { width: 5, height: 5 }
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
    color: "#278979",
    fontWeight: "bold",
    paddingVertical: 10
  },
  position: {
    fontFamily: "quicksand-regular",
    fontSize: 14,
    flex: 1,
    alignSelf: "center",
    color: "#BEA647"
  },
  about: {
    fontFamily: "quicksand-regular",
    fontSize: 14,
    flex: 1,
    alignSelf: "center",
    color: "#BEA647",
    marginHorizontal: 10
  }
});

export default styles;
