import { Platform, Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
const edit = () => {
    return (
      <TouchableOpacity style={styles.editBlock}>
        <Text style={[styles.text3, styles.downText]}>Изменить</Text>
        <Image style={styles.IconEdit} source={require('../src/img/edit.png')}/>
      </TouchableOpacity>
    );
  }


const addHWbtn = () =>
{
  const navigation = useNavigation();
  const loadAddHomeWork = () => {
    navigation.navigate('AddHomeWork');
  };
  return (
    <TouchableOpacity style={styles.ButtonAdd} onPress={loadAddHomeWork}>
      <Text style={styles.ButtonText}>+</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  downText: {
    marginLeft: Platform.OS === "ios" ? 5 : 5,
    fontWeight: Platform.OS === "ios" ? 600 : 700,
  },
  text3: {
    fontSize: 12, 
    fontFamily: 'Stem',
    fontWeight: Platform.OS === "ios" ? 600 : 700,
    fontStyle: 'normal',
  },
  IconEdit: {
    width: Platform.OS === "ios" ? 18 : 15,
    height: Platform.OS === "ios" ? 18 : 15,
    paddingBottom: 5,
  },
  editBlock: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  ButtonAdd: {
    backgroundColor: "#00cc73",
    borderRadius: 50,
    paddingBottom: 5,
    alignItems: "center",
    justifyContent: "center",
    position: 'absolute',
    width: 40,
    height: 40,
    bottom: 70,
    right: 20, 

    elevation: 5, 
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  ButtonText: {
    fontSize: 30,
    color: "#fff", 
  },

  IconNote: {
    width: Platform.OS === "ios" ? 15 : 12,
    height: Platform.OS === "ios" ? 15 : 12,
    paddingBottom: Platform.OS === "ios" ? 4 : 0,
    marginLeft: Platform.OS === "ios" ? 4 : 4,
  },
});

const RedactorComponents = [edit, addHWbtn];
export default RedactorComponents;
  