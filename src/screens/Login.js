import { View, Text, Image, StyleSheet, TextInput, Pressable, Alert} from 'react-native'
import React, { useState } from 'react'
import auth from '@react-native-firebase/auth';


function Login({navigation}){

  const [email,setEmail] = useState('');
  const [Password, setPassword] = useState('');
   
  // Variavel responsalvel por esconder a senha do usuario
  const [showPassword, setShowPassword] = useState(false); 
  

  const handleLogin = () => {
    //Verifica caso os campos estejam vazios
    if (email === ""){
      Alert.alert("Insira seu email de Usuario!");
    }else if(Password === ""){
      Alert.alert("Insira sua Senha!");
    }else{  
      auth().signInWithEmailAndPassword(email, Password)
      //Caso o Login e a senha estejam corretos
      .then(() => {
        console.log('Usuário logado com sucesso! ');
        navigation.navigate("Menu");
      })
      //Caso estejam errados ou tenha alguma falha
      .catch((error) => {
        console.log(error);
        Alert.alert('Usuario e/ou senha invalido!!')
      });
        }        
    }
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
      <Pressable style={styles.button} onPress={handleLogin}>
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
  logo:{
    marginBottom:31,
  },
  inputText: {
    fontFamily:'Poppins',
    fontWeight:'bold',
    fontSize:15,
    paddingRight: 300,
    marginBottom: 10,
  },
  input: {
    width: 334,
    height:35,
    padding: 10,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 1,
  },
  button:{
    justifyContent:'center',
    backgroundColor:'#25DAF2',
    width:234,
    height:40,
    alignItems:'center',
    borderRadius:16,
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