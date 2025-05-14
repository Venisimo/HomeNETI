import React, { useState, useEffect } from "react";
import { View, Text, Modal, TextInput, TouchableOpacity, StyleSheet, Alert, Image, TouchableWithoutFeedback, Keyboard } from "react-native";
import { RadioButton } from 'react-native-paper';
import axios from "axios";
import { ip } from "./ip";
import MyCalendar from "../src/Calendar";


export default function AddHomeWork({ navigation }) {
  const [task, setTask] = useState("");
  const [subject, setSubject] = useState("");
  const [date, setDate] = useState("");
  const [party, setParty] = useState("");
  const [deadline, setDeadline] = useState("");

  const formatDate = (dateString) => {
    if (!dateString) return "Выбрать";
    const [year, month, day] = dateString.split('-');
    return `${day}.${month}.${year}`;
  };

  const [id, setId] = useState(1);
  const [creator, setCreator] = useState("Юзеров Ю. Ю.");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [patronymic, setPatronymic] = useState("");

  const subjects = ["Математический анализ", "Физика", "Программирование", "Биология", "История"];

  useEffect(() => {
    // const getId = () => {
    //   setId(1);
    // }
    // getId();
     console.log('Текущая выбранная дата:', choiseDate);
      console.log('Deadline:', deadline);

    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://${ip}:5000/api/user/${id}`);
        console.log("Ответ:", response.data);

        if (response.data.length > 0) {
          setName(response.data[0].name);
          setSurname(response.data[0].surname);
          setPatronymic(response.data[0].patronymic);
          setParty(response.data[0].party);
        }
      } catch (error) {
        console.error("Ошибка:", error);
      }
    };

    fetchUser(); // Вызываем асинхронную функцию

    const today = new Date();
    const dateSrc = today.toLocaleString('ru-RU', { year: 'numeric', month: 'numeric', day: 'numeric' });
    
    let dateDst = dateSrc.split(".").reverse().join("-");
    setDate(dateDst);
    // console.log(dateDst);

  }, [id]); 

  const handleAddHomework = () => {
    if (!task || !subject) {
      Alert.alert("Ошибка", "Заполните все поля!");
      return;
    }

      const homeworkData = {
        task,
        subject,
        date: new Date().toISOString().split('T')[0], // Текущая дата
        party,
        deadline: choiseDate, // Используем choiseDate
        creator
      };

    axios
      .post(`http://${ip}:5000/api/task`, { task, subject, date, party, deadline, creator })
      .then((response) => {
        Alert.alert("Успех", "Домашнее задание добавлено!", [
          { text: "OK", onPress: () => navigation.navigate('HomeWork') }
      ]);
        setTask("");
        setSubject("");
        setDate("");
        setDeadline("");
        setCreator("");
      })
      .catch((error) => {
        console.error("Ошибка при добавлении:", error);
        Alert.alert("Ошибка", "Не удалось добавить задание.");
      });
  };

  const [selectedValue, setSelectedValue] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleDate, setModalVisibleDate] = useState(false);
  const [choiseSubj, setChoiseSubj] = useState("Выбрать");
  const [choiseDate, setChoiseDate] = useState("Выбрать");




  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
      <View style={styles.UserBlock}>
        <View style={styles.SurnameAvatar}>
          <Image style={styles.avatar} source={require('../src/img/Avatar.png')}/>
          <Text style={styles.surname}>{surname} {name[0]}. {patronymic[0]}.</Text>
        </View>
        
        <Text style={styles.date}>{date[8]}{date[9]}.{date[5]}{date[6]}.{date[2]}{date[3]}</Text>                 
      </View>                                                         

      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={StyleSheet.absoluteFill} />
          </TouchableWithoutFeedback>
          
          <View style={styles.modal}>
            {subjects.map((subject, index) => (
              <TouchableOpacity
                key={index}
                style={styles.radioItem}
                onPress={() => setSelectedValue(subject)}
              >
                <RadioButton
                  value={subject}
                  status={selectedValue === subject ? "checked" : "unchecked"}
                  onPress={() => setSelectedValue(subject)}
                  color="#00cc73"
                  uncheckedColor="#00cc73" 
                />
                <Text>{subject}</Text>
              </TouchableOpacity>
            ))}
            
            <TouchableOpacity 
              style={styles.btnChoise} 
              onPress={() => {
                if (selectedValue) {
                  setChoiseSubj(selectedValue);
                  setSubject(selectedValue);
                }
                setModalVisible(false);
              }}
            >
              <Text>Выбрать</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

     <Modal visible={modalVisibleDate} transparent={true} animationType="fade">
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback onPress={() => setModalVisibleDate(false)}>
              <View style={StyleSheet.absoluteFill} />
            </TouchableWithoutFeedback>
            
           <View style={[styles.modal, styles.modalCalendar]}>
              <View style={{ width: '100%' }}>
                <MyCalendar
                  selectedDate={deadline}
                  onDateSelect={(selectedDate) => {
                    if (selectedDate < new Date().toISOString().split('T')[0]) {
                      Alert.alert("Ошибка", "Нельзя выбрать прошедшую дату");
                      return;
                    }
                    setDeadline(selectedDate);
                    setChoiseDate(selectedDate);
                    setModalVisibleDate(false);
                  }}
                  textStyleOverride={{
                    defaultFontSize: 12,
                    disabledFontSize: 8,
                    defaultColor: '#222',
                    disabledColor: '#ccc'
                  }}
                />
              </View>
            </View> 
          </View>
        </Modal>

      <TextInput
          multiline={true}
          numberOfLines={4}
          style={styles.input}
          placeholder="Введите задание"
          value={task}
          onChangeText={setTask}
        />
      <View style={styles.SubjDateBlock}>
        <View style={styles.subj}>
          <Text style={styles.textLeft1}>Предмет:</Text>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text>{choiseSubj}</Text>
          </TouchableOpacity>
        </View>
      
        <View style={styles.subj}>
          <Text style={styles.textLeft2}>Срок сдачи:</Text>
          <TouchableOpacity onPress={() => setModalVisibleDate(true)}>
            <Text>{deadline ? formatDate(deadline) : "Выбрать"}</Text>
          </TouchableOpacity>
        </View>
      </View>
      

      <TouchableOpacity onPress={handleAddHomework} style={styles.btnAdd}>
        <Text>Добавить</Text>
      </TouchableOpacity>
    </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 12,
  },
   modal: {
    width: 250,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
  },
  modalCalendar: {
  backgroundColor: 'rgb(204, 207, 209)',
  borderRadius: 20,
  padding: 10,
  width: '90%',
  maxWidth: 800,
},
  radioItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  btnChoise: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    height: 70,
  },

  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 10,
    borderRadius: 12,
    textAlignVertical: 'top',
    height: 100,
  },

  textLeft1: {
    marginLeft: 10,
    marginRight: 37,
    fontWeight: 600,
  },
  textLeft2: {
    marginLeft: 10,
    marginRight: 20,
    fontWeight: 600,
  },

  SubjDateBlock: {
    marginTop: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
  },
  input2: {
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor: "#fff",
    padding: 8,
    marginBottom: 5,
    borderRadius: 12,
    textAlignVertical: 'top',
    width: 220,
  },

  UserBlock: {
    display: "flex",
    backgroundColor: "#fff",
    marginTop: 10,
    height: 120,
    borderRadius: 20
  },
  SurnameAvatar: {
    marginTop: 15,
    flexDirection: "row",
  },
  avatar: {
    marginLeft: 20,
    width: 60,
    height: 60,
  },
  surname: {
    fontSize: 22,
    marginLeft: 15,
    fontWeight: 600,
  },
  date: {
    marginTop: 5,
    marginLeft: 20,
    color: "#ccc",
    fontWeight: 500,
  },
  btnAdd: {
    borderColor: "#000",
    borderWidth: 2, 
    backgroundColor: "transparent",
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    marginTop: 20,
  },
  subj: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 20,
  },
});
