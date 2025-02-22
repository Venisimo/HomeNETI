import React from "react";
import { Text, View, StyleSheet } from "react-native";

export const Header = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Здесь собарано всё, что вам нужно!</Text>
      </View>
    );
  }
  
const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "row",
      marginTop: 10,
      marginLeft: 10,
      height: 100,
      width: 250,
    },
    text: {
      fontSize: 25,
      fontWeight: "bold",
    }
});
  