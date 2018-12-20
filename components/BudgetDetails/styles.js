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
    color: "#BDA747",
    fontWeight: "600",
    fontFamily: "pacifico-regular",
    textShadowColor: "#7f7f7f",
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 1
  },
  eventMonth: {
    fontSize: 16,
    color: "#BDA747",
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
  }
});

export default styles;
