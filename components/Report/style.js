import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#DCDCDC"
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
    height: 130,
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
  }
});

export default styles;
