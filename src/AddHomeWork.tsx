import React, { useState } from "react";
import { View, Text, Modal, TextInput, TouchableOpacity, StyleSheet, Alert, Image, TouchableWithoutFeedback } from "react-native";
import { RadioButton } from 'react-native-paper';
import axios from "axios";
import { ip } from "./ip";

export default function AddHomeWork() {
  const [task, setTask] = useState("");
  const [subject, setSubject] = useState("");
  const [date, setDate] = useState("");
  const [party, setParty] = useState("AVT-414");

  const subjects = ["Математический анализ", "Физика", "Программирование", "Биология", "История"];
  const dates = ["2025-03-10", "2025-03-11", "2025-03-12", "2025-03-13", "2025-03-14", "2025-03-15"];
  const handleAddHomework = () => {
    if (!task || !subject || !date) {
      Alert.alert("Ошибка", "Заполните все поля!");
      return;
    }

    axios
      .post(`http://${ip}:5000/api/task`, { task, subject, date, party })
      .then((response) => {
        Alert.alert("Успех", "Домашнее задание добавлено!");
        setTask("");
        setSubject("");
        setDate("");
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
    <View style={styles.container}>
      <View style={styles.UserBlock}>
        <View style={styles.SurnameAvatar}>
          <Image style={styles.avatar} source={require('../src/img/Avatar.png')}/>
          <Text style={styles.surname}>Surname N. F.</Text>
        </View>
        
        <Text style={styles.date}>02.02.25</Text>                 
      </View>                                                         

      <Modal visible={modalVisible} transparent={true}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
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
                  onPress={() => 
                    {
                      setSelectedValue(subject);
                    }}
                  color="#00cc73"
                  uncheckedColor="#00cc73" 
                />
                <Text>{subject}</Text>
              </TouchableOpacity>
                  
            ))}
              
              <TouchableOpacity onPress={() => 
                {
                  if (selectedValue) {
                    setChoiseSubj(selectedValue);
                    setSubject(selectedValue);
                  }
                  setModalVisible(false);
                }}>
                <Text>Выбрать</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Modal visible={modalVisibleDate} transparent={true}>
        <TouchableWithoutFeedback onPress={() => setModalVisibleDate(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modal}>
            {dates.map((date, index) => (
              <TouchableOpacity
                key={index}
                style={styles.radioItem}
                onPress={() => setSelectedValue(date)}
              >
                <RadioButton
                  value={date}
                  status={selectedValue === date ? "checked" : "unchecked"}
                  onPress={() => 
                    {
                      setSelectedValue(date);
                    }}
                  color="#00cc73"
                  uncheckedColor="#00cc73" 
                />
                <Text>{date}</Text>
              </TouchableOpacity>
                  
            ))}
              
              <TouchableOpacity onPress={() => 
                {
                  if (selectedValue) {
                    setChoiseDate(selectedValue);
                    setDate(selectedValue);
                  }
                  setModalVisibleDate(false);
                }}>
                <Text>Выбрать</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <TextInput
        multiline={true}
        numberOfLines={4}
        style={styles.input}
        placeholder="Название задания"
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
            <Text>{choiseDate}</Text>
          </TouchableOpacity>
        </View>
      </View>
      

      <TouchableOpacity onPress={handleAddHomework} style={styles.btnAdd}>
        <Text>Добавить</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modal: {
    width: 250,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
  },
  radioItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  btnChoise: {

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
