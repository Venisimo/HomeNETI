import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Footer } from "./Footer"; 
import { ip } from "./ip"; // Импорт IP-адреса
import axios from 'axios';

// Функция группировки задач по дате
const groupTasksByDate = (tasks) => {
  // console.log(tasks); // 
  
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
      setTasksByDate(groupedTasks);
    })
    .catch(error => console.error("Ошибка:", error));
  };
  const loadAddHomeWork = () => {
    navigation.navigate('AddHomeWork');
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
                    <Image source={require('../src/img/edit.png')}/>
                    <Text style={styles.text3}>Отметить выполненным</Text>
                    <Image source={require('../src/img/Galochka.png')}/>
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

  ButtonAdd: {
    backgroundColor: "#42e3a3",
    padding: 10,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    marginBottom: 20,
    marginLeft: "auto",
    marginRight: 40,
  },
  ButtonText: {
    fontSize: 24,
    color: "#fff", // Белый цвет текста
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
    marginTop: 10,
    marginLeft: 90,
  },
  SubjName: {
    marginLeft: 25,
  }
});