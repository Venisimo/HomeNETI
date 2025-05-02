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

const HEADER_HEIGHT = Platform.OS === "ios" ? 44 : 56;
const TEXT_HEIGHT = Platform.OS === "ios" ? 64 : 0;

// Создаем навигаторы
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

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
        options={{
          headerTitle: "Расписание",
          tabBarStyle: {
            height: 55, // сделать панель ниже и выше
            paddingBottom: 10, // добавить отступ снизу
            paddingTop: 10,
          },
          tabBarShowLabel: false, // убрать текст под иконками
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require('../src/img/footer/scheduleActive.png')
                  : require('../src/img/footer/schedule.png')
              }
              style={styles.footerIcon}
            />
          ),
          headerRight: () => (
            Platform.OS === "android" ? (
              <Image 
                source={require('../src/img/settings.png')}
                style={{ width: 30, height: 30, marginRight: 15 }}
              />
            ) : (
              <HeaderServiceIOS />
            )
          ),
          headerLeft: () => (
            Platform.OS === "android" ? (
              <Image 
                source={require('../src/img/logo.png')} 
                style={{ width: 40, height: 40, marginLeft: 10, marginRight: 10 }}
              />
            ) : null
          ),
        }}
      />
      <Tab.Screen
        name="Services"
        component={Services}
        options={{
          headerTitle: "Сервисы",
          tabBarStyle: {
            height: 55, // сделать панель ниже и выше
            paddingBottom: 10, // добавить отступ снизу
            paddingTop: 10,
          },
          tabBarShowLabel: false, // убрать текст под иконками
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require('../src/img/footer/servicesActive.png')
                  : require('../src/img/footer/services.png')
              }
              style={styles.footerIcon}
            />
          ),
          headerRight: () => (
            Platform.OS === "android" ? (
              <Image 
                source={require('../src/img/settings.png')}
                style={{ width: 30, height: 30, marginRight: 15 }}
              />
            ) : (
              <HeaderServiceIOS />
            )
          ),
          headerLeft: () => (
            Platform.OS === "android" ? (
              <Image 
                source={require('../src/img/logo.png')} 
                style={{ width: 40, height: 40, marginLeft: 10, marginRight: 10 }}
              />
            ) : null
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Главный навигатор
export default function Navigate() {
  return (
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
          options={{
            headerLeftContainerStyle: Platform.OS === "ios" ? { marginTop: -45 } : { marginTop: 0 },
            headerBackTitle: "",
            headerTintColor: "black",
            headerStyle: { height: HEADER_HEIGHT },
            headerTitleStyle: { paddingBottom: TEXT_HEIGHT, alignSelf: 'flex-start' },
            headerTitle: "Домашние задания",
          }}
        />
        <Stack.Screen 
          name="AddHomeWork" 
          component={AddHomeWork}
          options={{
            headerLeftContainerStyle: Platform.OS === "ios" ? { marginTop: -45 } : { marginTop: 0 },
            headerBackTitle: "",
            headerTintColor: "black",
            headerStyle: { height: HEADER_HEIGHT },
            headerTitleStyle: { 
              paddingBottom: TEXT_HEIGHT, 
              alignSelf: 'flex-start', 
              fontSize: Platform.OS === "ios" ? 13 : 18 
            },
            headerTitle: "Добавление домашнего задания",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
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