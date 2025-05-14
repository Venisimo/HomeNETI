// AuthScreen.js
import React, { useState } from "react";
import { ScrollView, Text, View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { useUser } from './UserContext';  // Импортируем хук

const AuthScreen = () => {
  const [login, setLogin] = useState("");  // Состояние для логина
  const [password, setPassword] = useState("");  // Состояние для пароля
  const [rememberMe, setRememberMe] = useState(false);  // Состояние для флага "запомнить меня"
  const { setUserId } = useUser();  // Получаем setUserId из контекста

  const handleSignIn = () => {
    console.log("Login:", login, "Password:", password, "Remember me:", rememberMe);
    setUserId(login);  // Устанавливаем login как userId в контексте
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.university}>Novosibirsk State</Text>
        <Text style={styles.university}>Technical University</Text>
        <Text style={styles.neti}>NETI</Text>
      </View>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Login"
          value={login}
          onChangeText={setLogin}
          autoCapitalize="none"
        />
        
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <View style={styles.optionsContainer}>
          <TouchableOpacity 
            style={styles.rememberMe} 
            onPress={() => setRememberMe(!rememberMe)}
          >
            <View style={[styles.checkbox, rememberMe && styles.checked]}>
              {rememberMe && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.optionText}>Remember me</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.forgotPassword}>Forgot your password?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
          <Text style={styles.signInText}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 30,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  university: {
    fontSize: 18,
    color: '#333',
  },
  neti: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 5,
    color: '#333',
  },
  formContainer: {
    width: '100%',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  rememberMe: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 3,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  checkmark: {
    color: '#fff',
    fontSize: 12,
  },
  optionText: {
    fontSize: 14,
    color: '#333',
  },
  forgotPassword: {
    fontSize: 14,
    color: '#29BE87',
  },
  signInButton: {
    height: 50,
    backgroundColor: 'transparent', 
    borderWidth: 1, 
    borderColor: 'black', 
    borderRadius: 30, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AuthScreen;
