import { View, Text, Image, StyleSheet, TextInput, Pressable, Alert } from 'react-native'
import React, { useState } from 'react'
import { handleLogin } from './menuScreens/DataProcess/DataProcess';

function Login({ navigation }) {

  const [email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  // Variavel responsalvel por esconder a senha do usuario
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../images/login.png')}
      />
      <Text style={styles.inputText}>Login:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu Email:"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <Text style={styles.inputText}>Senha:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite sua Senha:"
        secureTextEntry={!showPassword}
        value={Password}
        onChangeText={(text) => setPassword(text)}
      />
      {/*Quando o usuario preciona o Login ele manda os Dados para a tela DataProcess.js*/}
      <Pressable style={styles.button} onPress={() => handleLogin(email, Password, navigation)}>
        <Text style={styles.text}>Login</Text>
      </Pressable>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  logo: {
    marginBottom: 31,
  },
  inputText: {
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    fontSize: 15,
    paddingRight: 300,
    marginBottom: 10,
  },
  input: {
    width: 334,
    height: 35,
    padding: 10,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 1,
  },
  button: {
    justifyContent: 'center',
    backgroundColor: '#25DAF2',
    width: 234,
    height: 40,
    alignItems: 'center',
    borderRadius: 16,
    elevation: 10,
    shadowColor: '#000000',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: '#000000',
  },

});
export default Login