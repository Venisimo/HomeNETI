import React, { useEffect, useState } from 'react';
import { Platform, Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { ip } from "./ip";
import axios from 'axios';

const useTasks = () => {
  const completeTask = async ({ user_id, task_id }) => {
    try {
      const response = await axios.post(
        `http://${ip}:5000/api/task/complete`,
        { task_id },                   // тело запроса
        { params: { user_id } }        // query string: ?user_id=...
      );

      // console.log("Успешно:", response.data);
      return response.data;
    } catch (error) {
      console.error("Ошибка:", error.response?.data || error.message);
      throw error;
    }
  };

  return { completeTask };
};

const useTaskStatus = (user_id, task_id, refreshFlag) => {
  const [isCompleted, setIsCompleted] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      // console.log("Fetching status for", { user_id, task_id }); // DEBUG
      try {
        const response = await axios.get(`http://${ip}:5000/api/user/task/status`, {
          params: { user_id, task_id }
        });
        const status = response.data?.status;
        setIsCompleted(status === "Completed");
      } catch (error) {
        console.error("Ошибка запроса статуса:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStatus();
  }, [user_id, task_id, refreshFlag]);

  return { isCompleted, isLoading };
};

const MarkDone = ({ role, task_id, user_id }) => {
  const { completeTask } = useTasks();
  const [refreshFlag, setRefreshFlag] = useState(false);
  const { isCompleted, isLoading } = useTaskStatus(user_id, task_id, refreshFlag);
  // console.log(isCompleted);

  // console.log("MarkDone", { task_id, typeofTaskId: typeof task_id });

  const handleMarkDone = async () => {
    try {
      await completeTask({ user_id, task_id });
      setRefreshFlag(prev => !prev); // триггер повторного useEffect
    } catch (error) {
      console.error("Ошибка при отметке задачи:", error);
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleMarkDone} disabled={isLoading}>
      <Text style={[styles.text3, role === 0 ? styles.downTextAdmin : styles.downTextUser]}>
        {isCompleted === undefined
          ? "Загрузка..."
          : isCompleted
          ? "Отметить невыполненным"
          : "Отметить выполненным"}
      </Text>
      <Image
        style={styles.IconNote}
        resizeMode="contain"
        source={
          isCompleted
            ? require('../src/img/krestik.png')
            : require('../src/img/Galochka.png')
        }
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  text3: {
    fontSize: 12,
    fontFamily: 'Stem',
    fontWeight: Platform.OS === "ios" ? "600" : "700",
    fontStyle: 'normal',
  },
  downTextAdmin: {
    marginLeft: 16,
  },
  downTextUser: {
    marginLeft: 5,
  },
 IconNote: {
  width: Platform.OS === "ios" ? 15 : 13,
  height: Platform.OS === "ios" ? 15 : 13,
  marginTop: Platform.OS === 'ios' ? 0 : 4,
  marginLeft: 4,
  position: 'relative',
},

});

export default MarkDone;
