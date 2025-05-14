import React, { useState } from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import HomeWork from "./HomeWork";
import Services from "./Services";
import Schedule from "./Schedule";
import AddHomeWork from "./AddHomeWork";
import { Text, View, StyleSheet, Image, Platform } from "react-native";
import { HeaderServiceAndroid } from "../src/HeaderServiceAndroid";
import { HeaderServiceIOS } from "../src/HeaderServiceIOS";
import AuthScreen from "../src/Auth";
import Group from "../src/Group";
import HWcomments from "../src/HomeWorkComments";
import Calendar from "../src/Calendar";
import { UserProvider } from './UserContext'; // путь зависит от местоположения файла

const HEADER_HEIGHT = Platform.OS === "ios" ? 44 : 56;
const TEXT_HEIGHT = Platform.OS === "ios" ? 64 : 0;

// Создаем навигаторы
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const getDefaultHeaderOptions = (title, overrides = {}) => ({
  headerTitle: title,
  headerLeftContainerStyle: Platform.OS === "ios" ? { marginTop: -45 } : { marginTop: 0 },
  headerBackTitle: "",
  headerTintColor: "black",
  headerStyle: { height: HEADER_HEIGHT },
  headerTitleStyle: { 
    paddingBottom: TEXT_HEIGHT, 
    alignSelf: 'flex-start', 
    fontSize: Platform.OS === "ios" ? 18 : 20,
    ...(overrides.headerTitleStyle || {})
  },
  headerTitleContainerStyle: {
    marginTop: Platform.OS === 'ios' ? 0 : -25, 
  },
  headerLeftContainerStyle: {
    marginTop: Platform.OS === 'ios' ? -45 : -25,   
    marginLeft: Platform.OS === 'ios' ? 0 : 10,
  },
});

const tabIcons = {
  profile: {
    active: require('../src/img/footer/profileActive.png'),
    default: require('../src/img/footer/profile.png'),
  },
  schedule: {
    active: require('../src/img/footer/scheduleActive.png'),
    default: require('../src/img/footer/schedule.png'),
  },
  services: {
    active: require('../src/img/footer/servicesActive.png'),
    default: require('../src/img/footer/services.png'),
  },
  // добавь другие по аналогии
};
const getDefaultTabOptions = (title, imageKey) => ({
  headerTitle: title,
  tabBarStyle: {
    height: 55,
    paddingBottom: 10,
    paddingTop: 10,
  },
  headerTitleContainerStyle: {
    marginTop: Platform.OS === 'ios' ? -10 : -25, 
  },
  tabBarShowLabel: false, 
  tabBarIcon: ({ focused }) => (
      <Image
        source={focused ? tabIcons[imageKey].active : tabIcons[imageKey].default}
        style={styles.footerIcon}
      />
    ),
    headerRight: () => (
      Platform.OS === "android" ? (
        <Image 
          source={require('../src/img/settings.png')}
          style={{ width: 30, height: 30, marginRight: 15, marginLeft: 10, marginRight: 10, marginBottom: 25 }}
        />
      ) : (
        <HeaderServiceIOS />
      )
    ),
    headerLeft: () => (
      Platform.OS === "android" ? (
        <Image 
          source={require('../src/img/logo.png')} 
          style={{ width: 40, height: 30, marginLeft: 10, marginRight: 10, marginBottom: 25 }}
        />
      ) : null
    ),
});

// Таб-навигатор с сервисами и расписанием
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { height: HEADER_HEIGHT },
        headerTitleStyle: { paddingBottom: TEXT_HEIGHT, alignSelf: 'flex-start' },
      }}
    >
      <Tab.Screen
        name="Schedule"
        component={Schedule}
        options={getDefaultTabOptions("Расписание", 'schedule')}
      />
      <Tab.Screen
        name="Auth"
        component={AuthScreen}
        options={getDefaultTabOptions("Авторизация", 'profile')}
      />
      <Tab.Screen
        name="Services"
        component={Services}
        options={getDefaultTabOptions("Сервисы", 'services')}
      />
    </Tab.Navigator>
  );
}

// Главный навигатор
export default function Navigate() {
  return (
    <UserProvider>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="MainTabs" 
          component={MainTabs} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="HomeWork" 
          component={HomeWork} 
          options={
            getDefaultHeaderOptions("Домашние задания")
          }
        />
        <Stack.Screen 
          name="AddHomeWork" 
          component={AddHomeWork}
          options={getDefaultHeaderOptions("Добавление домашнего задания", {
            headerTitleStyle: {
              fontSize: Platform.OS === "ios" ? 13 : 18,
            },
          })}
        />
        <Stack.Screen 
          name="Group" 
          component={Group}
          options={getDefaultHeaderOptions("Моя группа")}
        />
        <Stack.Screen 
          name="HWcomments" 
          component={HWcomments}
          options={getDefaultHeaderOptions("Домашнее задание")}
        />
        <Stack.Screen 
          name="Calendar" 
          component={Calendar}
          options={getDefaultHeaderOptions("Календарь")}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  footerText: {
    fontSize: 14,
    color: '#333',
  },
  footerIcon: {
    width: 30,
    height: 30,
  },
});