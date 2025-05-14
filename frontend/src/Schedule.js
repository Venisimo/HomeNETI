import React, { useEffect, useState } from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity, StyleSheet, Alert, Image, 
  TouchableWithoutFeedback, Keyboard, Platform, ScrollView, Dimensions  } from "react-native";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { ip } from "./ip";
import axios from 'axios';

let data = {
  typeLesson: ["Лекция", "Практика"],
  Subj: ["Программирование", "Матан"],
  textHW: ["Номер 100, 200", "Рассказать че-то"],
}

const lessons = data.Subj.map((subj, index) => ({
  subj,
  typeLesson: data.typeLesson[index],
  textHW: data.textHW[index],
}));

const useScedule = (user_id) => {
  const [tasksByDate, setTasksByDate] = useState({});
  const [IsLoading, setIsLoading] = useState({});

  useEffect(() => {
    axios.get(`http://${ip}:5000/api/user/schedule/all_weeks`, {
      params: { user_id }
    })
      .then(response => {
        setTasksByDate(response.data.schedule); // сохраняем данные в состояние
      })
      .catch(error => {
        console.error("Ошибка:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [user_id]);

  return { tasksByDate, IsLoading }; // возвращаем данные
};

const FirstRoute = () => {

  const [modalVisible, setModalVisible] = useState(false);
  const [ModalSubj, setModalSubj] = useState('');
  const [ModalType, setModalType] = useState('');
  const [ModalTextHW, setModalTextHW] = useState('');
  const user_id = 1;
  const { tasksByDate } = useScedule(user_id);

// console.log(tasksByDate);

  return (
    <>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <ScrollView contentContainerStyle={styles.scrollView}>
       <View>
        <View style={styles.DaysContainer}>
          <Text style={styles.textWeekDay}>Понедельник</Text>
          <Text style={[styles.DayMonth, styles.textWeekDay]}>10.02</Text>
        </View>
        {lessons.map((lesson, index) => (
        <TouchableOpacity 
        style={[styles.HomeWorkBlock, {borderLeftColor: (lesson.typeLesson == "Лекция") ? "#FEAD06" : "#29BE87"}]} 
        key={index}
        onPress={() => {
          setModalVisible(true);
          setModalSubj(lesson.subj); 
          setModalType(lesson.typeLesson);
          setModalTextHW(lesson.textHW);
        }}>
          <View style={styles.HomeWorkBlockChild1}>
            <View style={styles.SurnameHWtext}>
              <Text style={[styles.square]}>3</Text>
              <Text style={[styles.textTime, , {color: (lesson.typeLesson == "Лекция") ? "#FEAD06" : "#29BE87"}]}>12:00—13:30</Text>
              <Text style={styles.textTeacher}>Иванов И. И.</Text>
            </View>
          </View> 
          <Text style={[styles.text6, styles.date]}>{lesson.subj}</Text>
          <Text style={[styles.textHasHW]}>Есть домашка!</Text>
          <View style={styles.HomeWorkBlockChild3}> 
            <Image style={[styles.img]} source={require('../src/img/auditoria.png')}/>
            <Text style={[styles.textAud]}>2-2</Text>
            <Text style={[styles.textTypeLesson, {color: (lesson.typeLesson == "Лекция") ? "#FEAD06" : "#29BE87"}]}>{lesson.typeLesson}</Text>
          </View> 
        </TouchableOpacity>
        ))}

      </View>
    </ScrollView>
    </TouchableWithoutFeedback>
      <Modal visible={modalVisible} transparent={true}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modal}>
              <Text style={styles.textSubjModal}>{ModalSubj}</Text>
              <View style={styles.textModalRow}>
                <Text style={styles.textModalLeft}>Время занятия</Text>
                <Text style={styles.textModalRight}>12:00-13:30</Text>
              </View>  
              <View style={styles.textModalRow}>
                <Text style={styles.textModalLeft}>Тип занятия</Text>
                <Text style={styles.textModalRight}>{ModalType}</Text>
              </View>  
              <View style={styles.textModalRow}>
                <Text style={styles.textModalLeft}>Группы</Text>
                <Text style={styles.textModalRight}>АВТ-414</Text>
              </View>  
              <View style={styles.textModalRow}>
                <Text style={styles.textModalLeft}>Аудитория</Text>
                <Text style={[styles.textModalRight, styles.textGreen]}>7-708</Text>
              </View>  
              <View style={styles.textModalRow}>
                <Text style={styles.textModalLeft}>Преподаватели</Text>
                <Text style={[styles.textModalRight, styles.textGreen]}>Иванов И. И.</Text>
              </View>  
              <View style={styles.textModalRow}>
                <Text style={styles.textModalLeft}>Домашнее задание</Text>
                <Text style={[styles.textModalRight, styles.textRed]}>{ModalTextHW}</Text>
              </View>  
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

const SecondRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
);

const ThirdRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#4caf50' }]} />
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute,
});


export default function Schedule() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Неделя 1' },
    { key: 'second', title: 'Неделя 2' },
    { key: 'third', title: 'Неделя 3' },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: Dimensions.get('window').width }}
      renderTabBar={props => (
        <TabBar
          {...props}
          indicatorStyle={{ 
            backgroundColor: '#29BE87', // Цвет индикатора (подчеркивания)
            height: 3 // Высота индикатора
          }}
          style={{ 
            backgroundColor: '#f2f2f2', // Фон TabBar
          }}
          labelStyle={{
            color: '#000000', // Цвет текста
            fontSize: 14, // Размер шрифта
            fontWeight: 'bold', // Жирность
            textTransform: 'none' // Регистр текста (none - как есть, uppercase - заглавные)
          }}
          activeColor="#29BE87" // Цвет активной вкладки
          inactiveColor="#000000" // Цвет неактивной вкладки
        />
      )}
      swipeEnabled={true}
  />
  );
}

const styles = StyleSheet.create({
  textSubjModal: {
    fontSize: 20,
    fontWeight: Platform.OS === "ios" ? 600 : 700,
    color: "#000000",
    marginBottom: 15,
  },
  textModalLeft: {
    fontSize: 14,
    fontWeight: Platform.OS === "ios" ? 600 : 700,
    color: "#000000",
  },
  textModalRight: {
    fontSize: 14,
    fontWeight: Platform.OS === "ios" ? 400 : 500,
    color: "#000000",
  },
  textGreen: {
    fontWeight: Platform.OS === "ios" ? 600 : 700,
    color: "#29BE87",
    textDecorationLine: "underline"
  },
  textRed: {
    fontWeight: Platform.OS === "ios" ? 600 : 700,
    color: "red",
    textDecorationLine: "underline"
  },
  textModalRow: {
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: 'space-between',
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modal: {
    width: 350,
    height: "auto",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
  },

  square: {
    width: 12,
	  height: 12,
    fontSize: 10,
    textAlign: "center",
    borderColor: "#B2B2B2",
    color: "#B2B2B2",
    borderWidth: 1,
    backgroundColor: "#FFFFFF", 
    top: 2, 
    marginLeft: -5,
    marginRight: 5,
  },
  DaysContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: 20,
    marginLeft: 20,
  },
  img: {
    width: 10,
    height: 15,
    marginLeft: 15,
    marginRight: 5,
    marginTop: 2,
  },
  textWeekDay: {
    fontSize: Platform.OS === "ios" ? 26 : 22, 
    fontWeight: Platform.OS === "ios" ? 600 : 700,
    fontWeight: 600, 
  },
  textTime: {
    fontSize: Platform.OS === "ios" ? 14 : 14, 
    fontWeight: 800,
    color: "#FEAD06",
  },
  text6: {
    fontSize: 15,
    fontWeight: Platform.OS === "ios" ? 600 : 700,
    color: "#000000",
  },
  textAud: {
    fontSize: Platform.OS === "ios" ? 15 : 14, 
    fontWeight: Platform.OS === "ios" ? 600 : 700,
    // marginBottom: 2,
    color: "#B2B2B2",
  },
  textHasHW: {
    marginLeft: 15,
    marginTop: 10,
    fontSize: Platform.OS === "ios" ? 12 : 10, 
    fontWeight: Platform.OS === "ios" ? 600 : 700,
    color: "red",
  },
  textTeacher: {
    fontSize: 15, 
    marginRight: 25,
    marginLeft: 'auto',
    fontSize: Platform.OS === "ios" ? 15 : 14, 
    fontWeight: Platform.OS === "ios" ? 600 : 700,
    color: "#B2B2B2",
  },
  textTypeLesson: {
    color: "#FEAD06",
    marginLeft: 'auto',
    fontSize: Platform.OS === "ios" ? 14 : 12, 
    fontWeight: Platform.OS === "ios" ? 600 : 700,
    marginRight: 10, 
  },
  
  DayMonth: {
    marginLeft: 'auto',
    marginRight: 30,
  },
  HomeWorkBlock: {
    marginLeft: 20,
    marginTop: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginRight: 20,
    height: 110,
    borderLeftWidth: 7,
    borderLeftColor: '#FEAD06',
    boxShadow: "1px 1px 1px 2px rgba(0, 0, 0, 0.1)",
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
    display: "flex",
    flexDirection: "row",
    marginLeft: 20,
    width: '100%', 
  },
  HWtext: {
    marginTop: 10,
  },
  date: {
    marginTop: 5,
    marginLeft: 15,
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
    width: '100%', 
  },
  SubjName: {
    marginLeft: 25,
  }
});