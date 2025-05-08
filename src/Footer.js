import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export const Footer = ({ navigation }) => {

  const [activeIcon, setActiveIcon] = useState(null);

  const loadSchedule = () => {
    navigation.navigate('Schedule');
    setActiveIcon('schedule');
  }
  const loadServices = () => {
    navigation.navigate('Services');
    setActiveIcon('services');
  }
  
  const getIconSource = (iconName) => {
    switch(iconName)
    {
      case 'schedule':
        return activeIcon === 'schedule' 
          ? require('../src/img/footer/scheduleActive.png') 
          : require('../src/img/footer/schedule.png');
      case 'services':
        return activeIcon === 'services' 
          ? require('../src/img/footer/servicesActive.png') 
          : require('../src/img/footer/services.png');
      default:
        return require('../src/img/footer/services.png');
    }
  
  }

  return (
    <View style={styles.footer}>
      <Image source={require('../src/img/footer/news.png')} style={styles.footerIcon} />
      <TouchableOpacity onPress={loadSchedule}>
        <Image source={getIconSource('schedule')} style={styles.footerIcon} />
      </TouchableOpacity>
      <Image source={require('../src/img/footer/messages.png')} style={styles.footerIcon} />
      <Image source={require('../src/img/footer/profile.png')} style={styles.footerIcon} />
      <TouchableOpacity onPress={loadServices}>
        <Image source={getIconSource('services')} style={styles.footerIcon} />
      </TouchableOpacity>
    </View>
  );
};
function func()
{
  //логика для изменения картинки
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