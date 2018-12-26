import { StyleSheet } from "react-native";
export const colors = {
  black: "#1a1917",
  gray: "#888888",
  background1: "#2B2B2B",
  background2: "#258779"
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,

    marginTop: 30
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
  gradient: {
    ...StyleSheet.absoluteFillObject
  },
  cardTittle: {
    color: "#808080",
    fontSize: 22,
    marginBottom: 5
  },
  avatar: {
    width: 150,
    height: 150
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 10,

    marginTop: 10
  },
  profileCard: {
    height: 250,
    alignItems: "center",
    marginTop: 20
  },
  name: {
    marginTop: 10,
    fontSize: 22,
    color: "#808080"
  },
  photosContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    height: "auto"
  },
  photosCard: {
    marginTop: 10
  },
  photo: {
    width: 113,
    height: 113,
    marginTop: 5,
    marginRight: 5
  },
  h3: {
    textAlign: "left",
    color: "#BDA747",
    fontWeight: "600",
    fontSize: 22,
    fontFamily: "pacifico-regular"
  },
  details: {
    textAlign: "left",
    color: "#fff",
    fontWeight: "600",
    fontSize: 22,
    fontFamily: "pacifico-regular",
    fontFamily: "quicksand-bold",
    textShadowOffset: { width: 0, height: 0 }
  },
  title: {
    fontSize: 20,
    color: "#151515",
    fontFamily: "quicksand-regular",
    marginBottom: 5
  },
  info: {
    fontSize: 16,
    color: "#151515",
    fontFamily: "quicksand-regular",
    marginBottom: 5
  },
  number: {
    color: "#F1C04F",
    alignSelf: "flex-end",
    fontWeight: "bold",
    fontFamily: "pacifico-regular",
    fontSize: 20
  },
  shadow: {
    shadowColor: "#595959",
    shadowRadius: 1,
    shadowOpacity: 0.7,
    shadowOffset: { width: 8, height: 8 }
  }
});

export default styles;
