import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Footer } from "./Footer"; 
import { ip } from "./ip";
import axios from 'axios';

// Функция группировки задач по дате
const groupTasksByDate = (tasks) => {
  return tasks.reduce((date, task) => {
    if (!date[task.date]) {
      date[task.date] = [];
    }
    date[task.date].push(task);
    return date;
  }, {});
};

export default function HomeWork({ navigation }) {
  const [tasksByDate, setTasksByDate] = useState({}); // Состояние для хранения группированных задач

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    axios.get(`http://${ip}:5000/api/homeWorkGet`, {
      params: { party: 'AVT-414' }
    })
    .then(response => {
      console.log("Ответ:", response.data);
      const groupedTasks = groupTasksByDate(response.data); // Группируем задачи по дате
      console.log(response.data);
      setTasksByDate(groupedTasks);
    })
    .catch(error => console.error("Ошибка:", error));
  };
  const loadAddHomeWork = () => {
    navigation.navigate('AddHomeWork');
  }

  function getWeekDay(date) {
    let days = ['Воскресенье', 'Понедельник', 
      'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
  
    return days[date.getDay()];
  }
  
  return (
    <>
      <ScrollView>
        {Object.keys(tasksByDate).length > 0 ? (
          Object.entries(tasksByDate).map(([date, tasks]) => (
            <View key={date}>
              <View style={styles.DaysContainer}>
                <Text style={styles.text}>День недели</Text>  
                <Text style={[styles.DayMonth, styles.text]}>{date}</Text>
              </View>

              {tasks.map((task, index) => (
                <View key={index} style={styles.HomeWorkBlock}>
                  <View style={styles.HomeWorkBlockChild1}>
                    <Image style={styles.avatar} source={require('../src/img/Avatar.png')}/>
                    <View style={styles.SurnameHWtext}>
                      <Text style={styles.text2}>Surname N. F.</Text>
                      <Text style={[styles.text3, styles.HWtext]}>{task.task}</Text>
                    </View>
                  </View>
                  <Text style={[styles.text3, styles.date]}>02.02.25</Text> 
                  <View style={styles.HomeWorkBlockChild2}>
                    <Text style={styles.text3}>Предмет: </Text>
                    <Text style={[styles.text3, styles.SubjName]}>{task.subject}</Text>
                  </View> 
                  <View style={styles.HomeWorkBlockChild3}>
                    <Text style={styles.text3}>Изменить</Text>
                    <Image style={styles.IconEdit} source={require('../src/img/edit.png')}/>
                    <Text style={[styles.text3, styles.SubjName]}>Отметить выполненным</Text>
                    <Image style={styles.IconNote} source={require('../src/img/Galochka.png')}/>
                  </View> 
                </View>
              ))}
            </View>
          )
        )
        ) : (
          <Text style={{ textAlign: "center", marginTop: 20 }}>Нет задач</Text>
        )}
      </ScrollView>
      <TouchableOpacity style={styles.ButtonAdd} onPress={loadAddHomeWork}>
        <Text style={styles.ButtonText}>+</Text>
      </TouchableOpacity>
      <Footer navigation={navigation} /> 
    </>
  );
}


const styles = StyleSheet.create({

  IconEdit: {
    width: 18,
    height: 18,
    paddingBottom: 5,
  },
  IconNote: {
    width: 15,
    height: 15,
    paddingBottom: 4,
    marginLeft: 5,
  },
  ButtonAdd: {
    backgroundColor: "#00cc73",
    borderRadius: 50,
    paddingBottom: 5,
    alignItems: "center",
    justifyContent: "center",
    position: 'absolute',
    width: 40,
    height: 40,
    bottom: 70,
    right: 20, 

    elevation: 5, 
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  ButtonText: {
    fontSize: 30,
    color: "#fff", 
  },
  DaysContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: 20,
    marginLeft: 40,
  },
  text: {
    fontSize: 26, 
  },
  text2: {
    fontSize: 24, 
  },
  text3: {
    fontSize: 12, 
    fontFamily: 'Stem',
    fontWeight: 600,
    fontStyle: 'normal',
  },
  DayMonth: {
    marginLeft: 'auto',
    marginRight: 30,
  },
  HomeWorkBlock: {
    marginLeft: 20,
    marginTop: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
    marginRight: 20,
  },
  HomeWorkBlockChild1: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
  },
  avatar: {
    marginLeft: 20,
    width: 60,
    height: 60,
  },
  SurnameHWtext: {
    marginLeft: 20,
  },
  HWtext: {
    marginTop: 10,
  },
  date: {
    marginTop: 5,
    marginLeft: 25,
    color: "#ccc",
    fontWeight: 500,
  },
  HomeWorkBlockChild2: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
    marginLeft: 100,
  },
  HomeWorkBlockChild3: {
    display: "flex",
    flexDirection: "row",
    marginTop: 25,
    marginBottom: 10,
    marginLeft: 82,
  },
  SubjName: {
    marginLeft: 10,
  }
});