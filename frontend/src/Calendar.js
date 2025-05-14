import { Calendar, LocaleConfig } from 'react-native-calendars';
import React from 'react';
import { View, StyleSheet, Platform, Text, TouchableOpacity } from 'react-native';

LocaleConfig.locales['ru'] = {
  monthNames: [
    'январь', 'февраль', 'март', 'апрель', 'май', 'июнь',
    'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'
  ],
  monthNamesShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
  dayNames: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
  dayNamesShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
  today: "Сегодня",
};
LocaleConfig.defaultLocale = 'ru';

export default function MyCalendar({ selectedDate, onDateSelect, textStyleOverride  = {} }) {
  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <View style={styles.container}>
      <Calendar
        style={styles.Calendar}
        dayComponent={({ date, state }) => {
          const isDisabled = state === 'disabled';
          const isToday = date.dateString === todayStr;
          const isSelected = date.dateString === selectedDate;
          
          return (
            <TouchableOpacity
              onPress={() => {
                if (!isDisabled && typeof onDateSelect === 'function') {
                  onDateSelect(date.dateString);
                }
              }}
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
                     fontSize: isDisabled
                      ? textStyleOverride.disabledFontSize || 10
                      : textStyleOverride.defaultFontSize || 14,
                    color: isDisabled ? '#999' : isSelected ? 'white' : '#000',
                    fontWeight: Platform.OS === 'ios' ? '600' : '700',
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
        markedDates={{
          [selectedDate]: {
            selected: true,
            selectedColor: '#00cc73'
          }
        }}
        firstDay={1}
        hideExtraDays={false}
        theme={{
          calendarBackground: '#EEEEF0',
          textSectionTitleColor: '#000',
        }}
        headerStyle={{
          backgroundColor: '#FFFFFF',
          paddingBottom: 10,
          marginBottom: 20, 
        }}
        renderArrow={(direction) => (
          <Text style={{ fontSize: Platform.OS === 'ios' ? 25 : 30, color: '#A2A2A4' }}>
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
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EEEEF0',
  },
  Calendar: {
    borderRadius: 10,
  },
  Header: {
    alignItems: 'center',
  }
});