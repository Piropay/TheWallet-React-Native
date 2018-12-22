import { StyleSheet, Platform } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2B2B2B"
  },
  developmentModeText: {
    marginBottom: 20,
    color: "rgba(0,0,0,0.4)",
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center"
  },
  card: {
    alignSelf: "center",
    width: "90%"
  },
  contentContainer: {
    paddingTop: 30
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50
  },
  homeScreenFilename: {
    marginVertical: 7
  },
  codeHighlightText: {
    color: "rgba(96,100,109, 0.8)"
  },
  codeHighlightContainer: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 3,
    paddingHorizontal: 4
  },
  getStartedText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center"
  },
  tabBarInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    paddingVertical: 20
  },
  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center"
  },
  navigationFilename: {
    marginTop: 5
  },
  helpContainer: {
    marginTop: 15,
    alignItems: "center"
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    fontSize: 14,
    color: "#2e78b7"
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
