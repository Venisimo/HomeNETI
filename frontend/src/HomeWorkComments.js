import React from "react";
import { ScrollView, Text, View, StyleSheet, TouchableOpacity } from "react-native";

const HomeworkScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Домашнее задание</Text>
        <Text style={styles.author}>ФИО</Text>
      </View>

      <View style={styles.taskContainer}>
        <Text style={styles.taskText}></Text>
        <TouchableOpacity style={styles.completeButton}>
          <Text style={styles.completeButtonText}>Отметить выполненным ✓</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Предмет:</Text>
        <Text style={styles.infoText}>Основы российской государственности</Text>
        
        <Text style={styles.infoTitle}>Срок сдачи:</Text>
        <Text style={styles.infoText}>Вторник 19.11</Text>
      </View>

      <View style={styles.commentsContainer}>
        <Text style={styles.sectionTitle}>Комментарии</Text>
        
        <View style={styles.comment}>
          <Text style={styles.commentAuthor}>ФИО</Text>
        </View>

        <View style={styles.comment}>
          <Text style={styles.commentAuthor}>ФИО</Text>
        </View>

        <View style={styles.comment}>
          <Text style={styles.commentAuthor}>ФИО</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  author: {
    fontSize: 16,
    color: '#666',
  },
  taskContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  taskText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 15,
  },
  completeButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  completeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  infoContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  infoTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  infoText: {
    marginBottom: 15,
  },
  commentsContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  comment: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 15,
    marginBottom: 15,
  },
  commentAuthor: {
    fontWeight: 'bold',
  },
});

export default HomeworkScreen;