import React from "react";
import { ScrollView, Text, View, StyleSheet, Image, Platform, TouchableOpacity } from "react-native";
import { Footer } from "./Footer"; 

const Group = () => {
  return (
    <>
      <ScrollView>
        <View style={styles.HomeWorkBlock}>
          <View style={styles.HomeWorkBlockChild1}>
            <Image style={styles.avatar} source={require('../src/img/Avatar.png')}/>
            <View style={styles.SurnameHWtext}>
              <Text style={styles.text2}>ФИО</Text>
              <Text style={[styles.text3, styles.HWtext]}>Сделать редактором</Text>
              <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>+</Text>
             </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({ 
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
  },
  HWtext: {
    marginTop: 10,
    color: 'red',
    fontWeight: 500,
  },
});

export default Group;