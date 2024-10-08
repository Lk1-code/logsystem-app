import { Text, View, StyleSheet, Image, TextInput, Pressable, Alert } from 'react-native';
import { useState } from 'react';
import { ConsLocal } from './DataProcess/DataProcess'; // Certifique-se de que o caminho está correto

function ConsultarLocal({ navigation }) { // Recebe o navigation como prop
  const [LocalCons, setLocal] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image source={require('../../images/Consulta.png')} />
        <Text style={styles.title}>Consultar Local</Text>
      </View>
      <View style={styles.forms}>
        <Text style={styles.inputText}>Local de Origem</Text>
        <TextInput
          value={LocalCons}
          style={styles.input}
          onChangeText={(text) => setLocal(text)}
        />
      </View>
      <Pressable style={styles.button} onPress={() => ConsLocal(LocalCons, navigation)}>
        <Text style={styles.text}>Consultar Local</Text>
      </Pressable>
    </View>
  );
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
    marginLeft:10,
    color:'black',
    fontWeight:'bold',
  },
  logo:{
    flexDirection:'row',
    padding:10,
  },
  forms:{
    marginTop:100,
    marginBottom:150,
  },
  inputText: {
    marginBottom: 5,
    fontFamily:'Poppins',
    color:'black',
    fontWeight:'bold',
    fontSize:15,
  },
  input: {
    width: 334,
    height:35,
    padding: 5,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 1,
  },
  button:{
    justifyContent:'center',
    backgroundColor:'#25DAF2',
    width:334,
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
export default ConsultarLocal;
