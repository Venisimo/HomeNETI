import React from "react";
import { ScrollView, Text, View, StyleSheet, Image } from "react-native";


export const HeaderServiceAndroid = () => {
    return (
      <View style={styles.headerContainer}>
        <Image
          source={require('../src/img/logo.png')}
          style={styles.logo}
        />
        <Image
          source={require('../src/img/settings.png')}
          style={styles.settings}
        />
      </View>
    );
  }

  const styles = StyleSheet.create({
    headerContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    logo: {
      width: 50,
      height: 50,
      marginRight: 10,
    },
    settings: {
      width: 30,
      height: 30,
      marginRight: 10,
    }
  });