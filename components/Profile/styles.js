import { StyleSheet } from "react-native";
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
  header: { color: "#fff" },
  mainCard: {
    top: 15,
    shadowColor: "#2b2b2b",
    shadowRadius: 1,
    shadowOpacity: 0.7,
    shadowOffset: { width: 8, height: 8 },
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    flex: 1
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
  headerContent: {
    padding: 10,
    alignItems: "center"
  },
  name: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "600"
  },
  profileDetail: {
    alignSelf: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#ffffff"
  },
  detailContent: {
    margin: 10,
    alignItems: "center"
  },
  title: {
    fontSize: 20,
    color: "#BEA647"
  },
  count: {
    fontSize: 18
  },
  bodyContent: {
    flex: 1,
    alignItems: "center",
    padding: 30,
    marginTop: 40
  },
  textInfo: {
    fontSize: 18,
    marginTop: 20,
    color: "#696969"
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: "#278979"
  },
  description: {
    fontSize: 20,
    color: "#BEA647",
    marginTop: 10,
    textAlign: "center"
  },
  popup: {
    backgroundColor: "#2B2B2B",
    marginTop: 80,
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
    flex: 1,
    marginTop: 30
  },
  popupContent: {
    //alignItems: 'center',
    margin: 5,
    height: 300
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
    fontFamily: "pacifico-regular",
    fontSize: 30,
    flex: 1,
    alignSelf: "center",
    color: "#fff",
    fontWeight: "bold",
    paddingVertical: 10,
    shadowColor: "#2b2b2b",
    shadowRadius: 1,
    shadowOpacity: 0.7,
    borderRadius: 5,
    shadowOffset: { width: 3, height: 3 },
    paddingBottom: 13
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
  }
});
export default styles;
