import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';

export default function MyCalendar() {
    let date = new Date();
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());

    let today = date.toISOString().split('T')[0];

    return (
      <View style={styles.container}>
        <Calendar style={styles.Calendar}
          onDayPress={day => {
            console.log('Выбранная дата', day.dateString);
          }}
          markingType={'custom'}
          markedDates={{
            [today]: {
                customStyles: {
                    container: {
                    backgroundColor: '#ffffff',
                    boxShadow: '0px 0px 0px 12px rgba(255, 255, 255, 255)',
                    borderRadius: 6,
                },
                    text: {
                    color: 'black',
                    fontWeight: 'bold',
                }
            }
            }
          }}
          theme={{
            selectedDayBackgroundColor: '#9B9B9D',
            todayTextColor: '#9B9B9D',
            arrowColor: '#9B9B9D',
            textDayFontFamily: 'Stem',
            textMonthFontFamily: 'Stem',
            textDayHeaderFontFamily: 'Stem',
            textDayFontWeight: Platform.OS == 'ios' ? '600' : '700',
            textMonthFontWeight: '700',
            textDayHeaderFontWeight: '500',
            textDayFontSize: 14,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 12,
            calendarBackground: '#EEEEF0',
          }}
          headerStyle={{
            backgroundColor: '#FFFFFF',
            paddingBottom: 10, 
          }}
        />
      </View>
    );
  }
  
const styles = StyleSheet.create({
 });