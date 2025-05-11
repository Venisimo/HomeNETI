import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import axios from 'axios';

const ip = "192.168.0.137";

const App = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get(`http://${ip}:5000/api/hello`)
      .then(response => setMessage(response.data.message))
      .catch(error => console.error("Ошибка:", error));
  }, []);

  const sendData = () => {
    axios.post(`http://${ip}:5000/api/data`, { name: 'Че-то сделать' })
      .then(response => console.log("Ответ:", response.data))
      .catch(error => console.error("Ошибка:", error));
  };

  return (
    <View>
      <Text>{message}</Text>
      <Button title="Отправить данные" onPress={sendData} />
    </View>
  );
};

export default App;