import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
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
      <Text style={styles.title}>Добавить домашнее задание</Text>

      <TextInput
        style={styles.input}
        placeholder="Название задания"
        value={task}
        onChangeText={setTask}
      />

      <TextInput
        style={styles.input}
        placeholder="Предмет"
        value={subject}
        onChangeText={setSubject}
      />

      <TextInput
        style={styles.input}
        placeholder="Дата (ГГГГ-ММ-ДД)"
        value={date}
        onChangeText={setDate}
      />

      <Button title="Добавить" onPress={handleAddHomework} color="#42e3a3" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
});
