import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from "react-native";
import axios from "axios";
import { ip } from "./ip"; // Укажи правильный IP сервера

export default function AddHomeWork() {
  const [task, setTask] = useState("");
  const [subject, setSubject] = useState("");
  const [date, setDate] = useState("");
  const [party, setParty] = useState("AVT-414");

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

  return (
    <View style={styles.container}>
      <View style={styles.UserBlock}>
        <View style={styles.SurnameAvatar}>
          <Image style={styles.avatar} source={require('../src/img/Avatar.png')}/>
          <Text style={styles.surname}>Surname N. F.</Text>
        </View>
        
        <Text style={styles.date}>02.02.25</Text>                 
      </View>                                                         

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
          <TextInput
              style={styles.input2}
              placeholder="Предмет"
              value={subject}
              onChangeText={setSubject}
            />
        </View>
      
        <View style={styles.subj}>
          <Text style={styles.textLeft2}>Срок сдачи:</Text>
            <TextInput
            style={styles.input2}
            placeholder="Дата (ГГГГ-ММ-ДД)"
            value={date}
            onChangeText={setDate}
            />
        </View>
        
      </View>
      

      <TouchableOpacity onPress={handleAddHomework} style={styles.btnAdd}>
        <Text>Добавить</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
    marginTop: 10,
    marginLeft: 10,
    marginRight: 37,
  },
  textLeft2: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 20,
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
  },
});
