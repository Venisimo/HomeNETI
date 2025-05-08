import React from "react";
import { ScrollView, Text, View, StyleSheet, Image, Platform, TouchableOpacity } from "react-native";
import { Footer } from "./Footer"; 

const Group = () => {
  return (
    <>
      <ScrollView>
        <Text style={styles.GroupName}>АВТ-414</Text>
        <Text style={styles.Direction}>Направление</Text>
        <Text style={styles.Faculty}>Факультет</Text>
        <View style={styles.HomeWorkBlock}>
          <View style={styles.HomeWorkBlockChild1}>
            <Text style={styles.number}>1</Text>
            <Image style={styles.avatar} source={require('../src/img/Avatar.png')}/>
            <View style={styles.SurnameHWtext}>
              <Text style={styles.text2}>ФИО</Text>
              <View style={styles.redactor}>
                <Text style={styles.text3}>Сделать редактором</Text>
                <TouchableOpacity style={styles.button}>
                      <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
             </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({ 
  redactor: {
    display: "flex",
    flexDirection: "row",
  },
  number: {
    marginTop: 20,
    marginLeft: 20,
    fontSize: 15,
    color: '#ccc'
  },
  Faculty: {
    marginTop: 10,
    marginLeft: 20,
    fontSize: 12,
    color: '#ccc'
  },
  Direction: {
    marginTop: 10,
    marginLeft: 20,
    fontSize: 12,
  },
  GroupName: {
    marginTop: 10,
    marginLeft: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    height: 50,
    borderRadius: 5,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  text2: {
    fontSize: Platform.OS === "ios" ? 24 : 20, 
  },
  text3: {
    fontSize: 12, 
    fontFamily: 'Stem',
    fontWeight: Platform.OS === "ios" ? 600 : 700,
    fontStyle: 'normal',
    marginLeft: 'auto',
  },
  HomeWorkBlock: {
    marginLeft: 20,
    marginTop: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
    marginRight: 20,
    height: 80,
  },
  HomeWorkBlockChild1: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
  },
  avatar: {
    marginLeft: 20,
    width: 60,
    height: 60,
  },
  SurnameHWtext: {
    marginLeft: 20,
    flex: 1,
  },
});

export default Group;
