import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, NavigationIndependentTree } from "@react-navigation/native";
import HomeWork from "./HomeWork";
import Services from "./Services";
import Schedule from "./Schedule";
import check from "./check";
import AddHomeWork from "./AddHomeWork";
import { ScrollView, Text, View, StyleSheet, Image, Platform } from "react-native";
import { HeaderServiceAndroid } from "../src/HeaderServiceAndroid";
import { HeaderServiceIOS } from "../src/HeaderServiceIOS";

const HEADER_HEIGHT = Platform.OS === "ios" ? 44 : 56;
const TEXT_HEIGHT = Platform.OS === "ios" ? 64 : 0;
const Stack = createStackNavigator();

export default function Navigate() {
  return (
    <NavigationIndependentTree>
      <Stack.Navigator>
        <Stack.Screen
          name="Services"
          component={Services}
          options={{
            headerStyle: { height: HEADER_HEIGHT },
            headerTitleStyle: { paddingBottom: TEXT_HEIGHT, alignSelf: 'flex-start' },
            headerTitle: "Сервисы",
            headerRight: () => {
              return Platform.OS === "android" ? (
                <Image source={require('../src/img/settings.png')}
                style={{ width: 30, height: 30, marginRight: 15 }}
              />
              ) : (
                <HeaderServiceIOS />
              );
            },
            headerLeft: () => {
              return Platform.OS === "android" ? (
                <Image source={require('../src/img/logo.png')} style={{ width: 40, height: 40, marginLeft: 10, marginRight: 10 }}/>
              ) : (
                <></>
              );
            },
          }}
        />
        <Stack.Screen name="HomeWork" component={HomeWork} />
        <Stack.Screen name="Schedule" component={Schedule} 
        options={{
          headerLeft: null,
          headerStyle: { height: HEADER_HEIGHT },
          headerTitleStyle: { paddingBottom: TEXT_HEIGHT, alignSelf: 'flex-start' },
          headerTitle: "Расписание",
          headerRight: () => {
            return Platform.OS === "android" ? (
              <Image source={require('../src/img/settings.png')}
              style={{ width: 30, height: 30, marginRight: 15 }}
            />
            ) : (
              <HeaderServiceIOS />
            );
          },
          headerLeft: () => {
            return Platform.OS === "android" ? (
              <Image source={require('../src/img/logo.png')} style={{ width: 40, height: 40, marginLeft: 10, marginRight: 10 }}/>
            ) : (
              <></>
            );
          },
        }}
        
        />
        <Stack.Screen name="check" component={check}></Stack.Screen>
        <Stack.Screen name="AddHomeWork" component={AddHomeWork}></Stack.Screen>
      </Stack.Navigator>
    </NavigationIndependentTree>
  );
}