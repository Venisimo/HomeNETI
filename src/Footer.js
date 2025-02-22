import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export const Footer = ({ navigation }) => {
  const loadSchedule = () => {
    navigation.navigate('Schedule');
  }
  const loadServices = () => {
    navigation.navigate('Services');
  }
  
  return (
    <View style={styles.footer}>
      <Image source={require('../src/img/footer/news.png')} style={styles.footerIcon} />
      <TouchableOpacity onPress={loadSchedule}>
        <Image source={require('../src/img/footer/schedule.png')} style={styles.footerIcon} />
      </TouchableOpacity>
      <Image source={require('../src/img/footer/messages.png')} style={styles.footerIcon} />
      <Image source={require('../src/img/footer/profile.png')} style={styles.footerIcon} />
      <TouchableOpacity onPress={loadServices}>
        <Image source={require('../src/img/footer/services.png')} style={styles.footerIcon} />
      </TouchableOpacity>
    </View>
  );
};

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