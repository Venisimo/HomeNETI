import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, StyleSheet, Image, TouchableOpacity, Platform } from "react-native";
import { Footer } from "./Footer"; 
import { ip } from "./ip";
import axios from 'axios';

// Функция группировки задач по дате
const groupTasksByDate = (tasks) => {
  return tasks.reduce((deadline, task) => {
    if (!deadline[task.deadline]) {
      deadline[task.deadline] = [];
    }
    deadline[task.deadline].push(task);
    return deadline;
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

  function getWeekDay(dateString) {
    let days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

    let [day, month] = dateString.split('.').map(Number);

    let currentYear = new Date().getFullYear();

    let date = new Date(currentYear, month - 1, day);
    
    return days[date.getDay()];
}

  
  return (
    <>
      <ScrollView>
        {Object.keys(tasksByDate).length > 0 ? (
          Object.entries(tasksByDate).map(([deadline, tasks]) => (
            <View key={deadline}>
              <View style={styles.DaysContainer}>
                <Text style={styles.text}>{getWeekDay(deadline)}</Text>  
                <Text style={[styles.DayMonth, styles.text]}>{deadline}</Text>
              </View>

              {tasks.map((task, index) => (
                <View key={index} style={styles.HomeWorkBlock}>
                  <View style={styles.HomeWorkBlockChild1}>
                    <Image style={styles.avatar} source={require('../src/img/Avatar.png')}/>
                    <View style={styles.SurnameHWtext}>
                      <Text style={styles.text2}>{task.creator}</Text>
                      <Text style={[styles.text3, styles.HWtext]}>{task.task}</Text>
                    </View>
                  </View>
                  <Text style={[styles.text3, styles.date]}>{task.date}</Text> 
                  <View style={styles.HomeWorkBlockChild2}>
                    <Text style={styles.text3}>Предмет: </Text>
                    <Text style={[styles.text3, styles.SubjName]}>{task.subject}</Text>
                  </View> 
                  <View style={styles.HomeWorkBlockChild3}>
                    <Text style={[styles.text3, styles.downText]}>Изменить</Text>
                    <Image style={styles.IconEdit} source={require('../src/img/edit.png')}/>
                    <Text style={[styles.text3, styles.downText]}>Отметить выполненным</Text>
                    <Image style={styles.IconNote} resizeMode="contain" source={require('../src/img/Galochka.png')}/>
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
    width: Platform.OS === "ios" ? 18 : 15,
    height: Platform.OS === "ios" ? 18 : 15,
    paddingBottom: 5,
  },
  IconNote: {
    width: Platform.OS === "ios" ? 15 : 12,
    height: Platform.OS === "ios" ? 15 : 12,
    paddingBottom: Platform.OS === "ios" ? 4 : 0,
    marginLeft: Platform.OS === "ios" ? 4 : 4,
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
    fontSize: Platform.OS === "ios" ? 26 : 22, 
    fontWeight: 600,
  },
  text2: {
    fontSize: Platform.OS === "ios" ? 24 : 20, 
  },
  text3: {
    fontSize: 12, 
    fontFamily: 'Stem',
    fontWeight: Platform.OS === "ios" ? 600 : 700,
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
    color: 'red',
    fontWeight: 500,
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
    marginLeft: Platform.OS === "ios" ? 82 : 72,
  },
  SubjName: {
    marginLeft: 10,
    fontWeight: 500,
  },
  downText: {
    marginLeft: Platform.OS === "ios" ? 5 : 5,
    fontWeight: Platform.OS === "ios" ? 600 : 700,
  }
});