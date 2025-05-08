import { Calendar, CalendarList, Agenda, LocaleConfig } from 'react-native-calendars';
import React from 'react';
import { View, StyleSheet, Platform, Text } from 'react-native';

LocaleConfig.locales['ru'] = {
  monthNames: [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь'
  ],
  monthNamesShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
  dayNames: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
  dayNamesShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
  today: "Сегодня",
};

LocaleConfig.defaultLocale = 'ru';

export default function MyCalendar() {

    return (
      <View style={styles.container}>
        <Calendar style={styles.Calendar}
            dayComponent={({ date, state }) => {

              const isDisabled = state === 'disabled';
              const now = new Date();
              now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
              const todayStr = now.toISOString().split('T')[0];
            
              const isToday = date.dateString === todayStr;
          
              return (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <View style={{
                   alignItems: 'center', 
                   justifyContent: 'center',
                   backgroundColor: isToday ? 'white' : 'transparent',
                   fontFamily: 'Stem',
                   paddingVertical: 5,
                   borderRadius: 12,
                   boxShadow: isToday ? '0px 4px 8px 0px rgb(123, 126, 128)' : 'transparent',
                   paddingHorizontal: 8,
                   paddingVertical: 10,
                   overflow: 'hidden',
                }}>
                  <Text style={{
                    fontSize: isDisabled ? 10 : 14,
                    color: isDisabled ? '#999' : '#000',
                    fontWeight: Platform.OS === 'ios' ? '600' : '700', 
                    textDisabledColor: '#fff',
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    }}>
                    {date.day}
                  </Text>
                </View>
              </View>
            );
          }}
          firstDay={1}
          showSixWeeks={true}  
          hideExtraDays={false}
          onDayPress={day => {
            console.log('Выбранная дата', day.dateString);
          }}
          markingType={'custom'}
          theme={{    
            textDisabledColor: '#999', 

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
            marginBottom: 20, 
          }}
        />
      </View>
    );
  }
  
const styles = StyleSheet.create({
 });