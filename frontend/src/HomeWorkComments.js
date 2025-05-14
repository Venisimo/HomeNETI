import React, { useState, useEffect } from "react";
import { View, Text, Modal, TextInput, TouchableOpacity, StyleSheet, Platform, Image, ScrollView, Keyboard } from "react-native";
import { RadioButton } from 'react-native-paper';
import axios from "axios";
import { ip } from "./ip";


export default function HWcomments() {
  return (
    <>
        <ScrollView>
            <View style={styles.HomeWorkBlock}>
                <View style={styles.HomeWorkBlockChild1}>
                    <Image style={styles.avatar} source={require('../src/img/Avatar.png')}/>
                    <View style={styles.SurnameHWtext}>
                        <Text style={styles.text2}>dsads</Text>
                        <Text style={[styles.text3, styles.HWtext]}>dsad</Text>
                    </View>
                </View>
                <Text style={[styles.text3, styles.date]}></Text> 
                <View style={styles.HomeWorkBlockChild2}>
                    <Text style={styles.text3}>Предмет: </Text>
                    <Text style={[styles.text3, styles.SubjName]}>asd</Text>
                </View> 
                <View style={styles.HomeWorkBlockChild3}>
                    <Text style={[styles.text3, styles.downText]}>Изменить</Text>
                    <Image style={styles.IconEdit} source={require('../src/img/edit.png')}/>
                    <Text style={[styles.text3, styles.downText]}>Отметить выполненным</Text>
                    <Image style={styles.IconNote} resizeMode="contain" source={require('../src/img/Galochka.png')}/>
                </View> 
            </View>
             <View style={styles.SubjDateBlock}>
                <View style={styles.subj}>
                    <Text style={styles.textLeft1}>Предмет:</Text>
                    <Text>dasda</Text>
                </View>
                
                <View style={styles.subj}>
                    <Text style={styles.textLeft2}>Срок сдачи:</Text>
                    <Text>dsad</Text>
                </View>
            </View>
        </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  SubjDateBlock: {
    marginTop: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
  },
  textLeft1: {
    marginLeft: 10,
    marginRight: 37,
    fontWeight: 600,
  },
  textLeft2: {
    marginLeft: 10,
    marginRight: 20,
    fontWeight: 600,
  },
  subj: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 20,
  },
  IconEdit: {
    width: Platform.OS === "ios" ? 18 : 15,
    height: Platform.OS === "ios" ? 18 : 15,
    paddingBottom: 5,
  },
  IconNote: {
    width: Platform.OS === "ios" ? 15 : 12,
    height: Platform.OS === "ios" ? 15 : 12,
    paddingBottom: Platform.OS === "ios" ? 4 : 0,
    marginLeft: Platform.OS === "ios" ? 4 : 4,
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
  DaysContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: 20,
    marginLeft: 40,
  },
  text: {
    fontSize: Platform.OS === "ios" ? 26 : 22, 
    fontWeight: 600,
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
  date: {
    marginTop: 5,
    marginLeft: 25,
    color: "#ccc",
    fontWeight: 500,
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
    marginTop: 25,
    marginBottom: 10,
    marginLeft: Platform.OS === "ios" ? 82 : 72,
  },
  SubjName: {
    marginLeft: 10,
    fontWeight: 500,
  },
  downText: {
    marginLeft: Platform.OS === "ios" ? 5 : 5,
    fontWeight: Platform.OS === "ios" ? 600 : 700,
  }
});
