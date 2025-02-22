import React from "react";
import { ScrollView, Text, View, StyleSheet, Image } from "react-native";


export const HeaderServiceIOS = () => {
    return (
      <View style={styles.headerContainer}>
        <Image source={require('../src/img/settings.png')} style={styles.settings}/>
      </View>
    );
  }

  const styles = StyleSheet.create({
    headerContainer: {
      flexDirection: "row",
      alignItems: "center",
      paddingBottom: 50,
    },
    settings: {
      width: 30,
      height: 30,
      marginRight: 15,
      marginLeft: 'auto'
    }
  });