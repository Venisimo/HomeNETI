import React from "react";
import { ScrollView, Text, View, StyleSheet, Image, Platform, TouchableOpacity } from "react-native";
import { Footer } from "./Footer"; 
import { ip } from "./ip";
import axios from 'axios';

const Group = () => {

  return (
    <>
      <ScrollView>
        <View style={styles.headerContainer}>
          <Text style={styles.GroupName}>АВТ-414</Text>
          <TouchableOpacity style={styles.menuButton}>
            <Text style={styles.menuIcon}>⋮</Text>
          </TouchableOpacity>
        </View>
        
        <Text style={styles.Direction}>Направление</Text>
        <Text style={styles.Faculty}>Факультет</Text>
        
        {/* <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Редакторы</Text>
          <TouchableOpacity style={styles.menuButton}>
            <Text style={styles.menuIcon}>⋮</Text>
          </TouchableOpacity>
        </View> */}
        
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
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  menuButton: {
    padding: 10,
  },
  menuIcon: {
    fontSize: 24,
    color: '#000',
  },
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
    width: 30,
    height: 30,
    borderRadius: 15,
    // backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  buttonText: {
    color: '#29BE87',
    fontSize: 18,
    fontWeight: 'bold',
  },
  text2: {
    fontSize: Platform.OS === "ios" ? 18 : 16, 
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