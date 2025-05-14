import { Calendar, CalendarList, Agenda, LocaleConfig } from 'react-native-calendars';
import React from 'react';
import { View, StyleSheet, Platform, Text, TouchableOpacity } from 'react-native';
import { Header } from '@react-navigation/stack';

LocaleConfig.locales['ru'] = {
  monthNames: [
    'январь',
    'февраль',
    'март',
    'апрель',
    'май',
    'июнь',
    'июль',
    'август',
    'сентябрь',
    'октябрь',
    'ноябрь',
    'декабрь'
  ],
  monthNamesShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
  dayNames: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
  dayNamesShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
  today: "Сегодня",
};

LocaleConfig.defaultLocale = 'ru';

export default function MyCalendar({ selectedDate, onDateSelect }) {
  const todayStr = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
    .toISOString()
    .split('T')[0];

    return (
      <View style={styles.container}>
        <Calendar style={styles.Calendar}
            dayComponent={({ date, state }) => {

              const isDisabled = state === 'disabled';
              const isToday = date.dateString === todayStr;
              const isSelected = date.dateString === selectedDate;
              
              return (
             <TouchableOpacity
                  onPress={() => !isDisabled && onDateSelect(date.dateString)}
              >
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <View style={{
                    backgroundColor: isSelected ? '#00cc73' : isToday ? 'white' : 'transparent',
                    borderRadius: 12,
                    boxShadow: isToday ? '0px 1px 2px 0px rgb(123, 126, 128)' : 'transparent',
                    paddingHorizontal: 8,
                    paddingVertical: 10,
                  }}>
                    <Text style={{
                      fontSize: isDisabled ? 10 : 14,
                      color: isDisabled ? '#999' : '#000',
                      fontWeight: Platform.OS === 'ios' ? '600' : '700', 
                      textDisabledColor: '#fff',
                      paddingHorizontal: 8,
                      paddingVertical: Platform.OS === 'ios' ? 4 : 0,
                      }}>
                      {date.day}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
          onDayPress={(day) => {
            if (typeof onDateSelect === 'function') {
              onDateSelect(day.dateString);
            }
          }}
          markedDates={{
            ...(selectedDate ? {
              [selectedDate]: {
                customStyles: {
                  container: {
                    backgroundColor: '#00cc73',
                    borderRadius: 10,
                  },
                  text: {
                    color: 'white',
                  }
                }
              }
            } : {})
          }}
          firstDay={1}
          showSixWeeks={true}  
          hideExtraDays={false}
          markingType={'custom'}
          onDateSelect={(selectedDate) => {
                if (selectedDate < new Date().toISOString().split('T')[0]) {
                  Alert.alert("Ошибка", "Нельзя выбрать прошедшую дату");
                  return;
                }
                setDeadline(selectedDate);
                setChoiseDate(selectedDate);
                setModalVisibleDate(false); // Закрываем модалку
              }}

          headerStyle={{
            backgroundColor: '#FFFFFF',
            paddingBottom: 10,
            marginBottom: 20, 
          }}

          renderArrow={(direction) => (
            <Text style={{ fontSize: "ios" ? 25 : 30, color: '#A2A2A4' }}>
              {direction === 'left' ? '‹' : '›'}
            </Text>
          )}
          renderHeader={(date) => {
          const month = date.toString('MMMM', 'ru');
          const year = date.toString('yyyy');

          return (
            <View style={styles.Header}>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{month}</Text>
              <Text style={{ fontSize: 14, color: '#999' }}>{year}</Text>
            </View>
          );
          }}
          theme={{
            calendarBackground: '#EEEEF0',
            textSectionTitleColor: '#000',
          }}
        />
      </View>
    );
  }
  
const styles = StyleSheet.create({
  Header: {
    alignItems: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  }
 });