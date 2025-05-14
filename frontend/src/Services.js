import React from "react";
import { ScrollView, Text, View, StyleSheet, Image } from "react-native";
import { Header } from "./TitleServices";
import { ButtonService } from "./Button";
import { Footer } from "./Footer"; 
import { useNavigation } from '@react-navigation/native';

export default function Services() {
  const navigation = useNavigation();

  const loadHomeWork = () => {
    navigation.getParent()?.navigate('HomeWork');
  };
  const loadGroup = () => {
    navigation.getParent()?.navigate('Group');
  };
  const loadCalendar = () => {
    navigation.getParent()?.navigate('Calendar');
  };
   
  const loadHWcomments = () => {
    navigation.getParent()?.navigate('HWcomments');
  };
   

  return (
    <>
    <ScrollView contentContainerStyle={styles.scrollView}>
      <Header />
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <ButtonService onPress={loadCalendar} imageSource={require("../src/img/calanderIcon.png")}>Календарь</ButtonService>
          <ButtonService onPress={loadGroup} imageSource={require("../src/img/groupIcon.png")}>Моя группа</ButtonService>
          <ButtonService imageSource={require("../src/img/servicesIcon.png")}>Услуги</ButtonService>
        </View>
        <View style={styles.buttonContainer}>
          <ButtonService imageSource={require("../src/img/events.png")}>События</ButtonService>
          <ButtonService imageSource={require("../src/img/polls.png")}>Опросы</ButtonService>
          <ButtonService imageSource={require("../src/img/notes.png")}>Заметки</ButtonService>
        </View>
        <View style={styles.buttonContainer}>
          <ButtonService imageSource={require("../src/img/shop.png")}>Магазин</ButtonService>
          <ButtonService imageSource={require("../src/img/navigation.png")}>Навигация</ButtonService>
          <ButtonService imageSource={require("../src/img/library.png")}>Библиотека</ButtonService>
        </View>
        <View style={styles.buttonContainer}>
          <ButtonService imageSource={require("../src/img/problems.png")}>Проблемы</ButtonService>
          <ButtonService imageSource={require("../src/img/pass.png")}>Пропуск</ButtonService>
          <ButtonService imageSource={require("../src/img/bugs.png")}>Отчеты об ошибках</ButtonService>
        </View>
        <View style={styles.buttonContainer}>
          <ButtonService imageSource={require("../src/img/reviews.png")}>Отзывы и предложения</ButtonService>
          <ButtonService onPress={loadHWcomments} imageSource={require("../src/img/wifi.png")}>КОММЕНТЫ</ButtonService>
          <ButtonService onPress={loadHomeWork} imageSource={require("../src/img/HomeWork.png")}>Домашка</ButtonService>
        </View>
      </View>
    </ScrollView>
  </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: "red",
    fontWeight: "bold",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    gap: 25,
    marginBottom: 20,
  },
  scrollView: {
    padding: 20,
  },
  box: {
    backgroundColor: "#f0f0f0",
    padding: 20,
    marginBottom: 10,
    borderRadius: 5,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderBottomColor: '#ccc',
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  title: {
    fontSize: 24,
  },
});