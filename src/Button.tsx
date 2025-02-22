import React from "react";
import { Image, Text, View, StyleSheet, Platform, TouchableOpacity, ImageSourcePropType } from "react-native";

interface ButtonServiceProps {
  children: React.ReactNode;
  onPress?: () => void;
  imageSource?: ImageSourcePropType;
}

export const ButtonService: React.FC<ButtonServiceProps> = ({ children, onPress, imageSource  }) => {
  return (
    <View style={styles.button}>
      <TouchableOpacity style={styles.touchable} onPress={onPress}>
        {imageSource && <Image source={imageSource} style={styles.image} />}
        <Text>{children}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    height: Platform.OS === "ios" ? 100 : 90,
    width: Platform.OS === "ios" ? 100 : 90,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    shadowColor: "rgba(0, 0, 0, 0.7)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  touchable: {
    alignItems: "center", // Выравниваем элементы по центру
  },
  image: {
    width: 30, // Ширина изображения
    height: 30, // Высота изображения
    // marginRight: 8, // Отступ между изображением и текстом
  },
});