import React, { useState } from "react";
import { View, Text, Modal, TextInput, TouchableOpacity, StyleSheet, Alert, Image, TouchableWithoutFeedback, Keyboard, Platform, ScrollView } from "react-native";
import { Footer } from "./Footer"; 

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


const Schedule = ({ navigation }) => {

  const [modalVisible, setModalVisible] = useState(false);
  const [ModalSubj, setModalSubj] = useState('');
  const [ModalType, setModalType] = useState('');
  const [ModalTextHW, setModalTextHW] = useState('');

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
    <Footer navigation={navigation} />
    </>
  );
};

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

export default Schedule;