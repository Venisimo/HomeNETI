import React from "react";
import { ScrollView, Text, View, StyleSheet, Image } from "react-native";
import { Footer } from "./Footer"; 

const Schedule = ({ navigation }) => {
  return (
    <View>
      <View style={styles.DaysContainer}>
        <Text style={styles.text}>Понедельник</Text>
        <Text style={[styles.DayMonth, styles.text]}>10.02</Text>
      </View>
      <View style={styles.HomeWorkBlock}>
        <View style={styles.HomeWorkBlockChild1}>
          <View style={styles.SurnameHWtext}>
            <Text style={[styles.text2]}>12:00-13:30</Text>
            <Text style={styles.text4}>Иванов И. И.</Text>
          </View>
        </View> 
        <Text style={[styles.text2, styles.date]}>Предмет</Text>
        <Text style={[styles.text2, styles.text3]}>Есть домашка!</Text>
        <View style={styles.HomeWorkBlockChild3}> 
          <Image style={[styles.img]} source={require('../src/img/auditoria.png')}/>
          <Text style={[styles.text4]}>2-2</Text>
          <Text style={[styles.text5]}>Лекция</Text>
        </View> 
      </View>
      <Footer navigation={navigation} /> 
    </View>
  );
};

const styles = StyleSheet.create({
  DaysContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: 20,
    marginLeft: 40,
  },
  img: {
    width: 10,
    height: 15,
    marginLeft: 15,
    marginRight: 10,
  },
  text: {
    fontSize: 32, 
  },
  text2: {
    fontSize: 15,
    color: "#FEAD06",
  },
  text3: {
    marginLeft: 15,
    marginTop: 20,
    color: "red",
  },
  text4: {
    fontSize: 15, 
    marginRight: 25,
    color: "#ccc",
  },
  text5: {
    color: "#FEAD06",
    marginLeft: 'auto',
    marginRight: 20, 
  },
  
  DayMonth: {
    marginLeft: 'auto',
    marginRight: 30,
  },
  HomeWorkBlock: {
    marginLeft: 20,
    marginTop: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
    marginRight: 20,
    height: 140,
    borderLeftWidth: 10,
    borderLeftColor: '#FEAD06', 
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
    display: "flex",
    flexDirection: "row",
    marginLeft: 20,
    width: '100%', 
    justifyContent: 'space-between',
  },
  HWtext: {
    marginTop: 10,
  },
  date: {
    marginTop: 5,
    marginLeft: 15,
  },
  HomeWorkBlockChild2: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
    marginLeft: 100,
  },
  HomeWorkBlockChild3: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
    width: '100%', 
  },
  SubjName: {
    marginLeft: 25,
  }
});

export default Schedule;