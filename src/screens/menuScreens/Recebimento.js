import React, { useState } from 'react';
import { View, TextInput, Alert, StyleSheet, Pressable, Image, Text, } from 'react-native';
import firestore from '@react-native-firebase/firestore';

function Recebimento({ navigation }) {
  const [placa, setPlaca] = useState('');
  const [doca, setDoca] = useState('');
  const [notaFiscal, setNotaFiscal] = useState('');
  const [localVirtual, setLocalVirtual] = useState('');

  const validarCampos = async () => {
    try {
      if (!placa || !doca || !notaFiscal || !localVirtual ) {
        throw new Error('Preencha todos os campos obrigatórios');
      }
      if (placa == '') {
        throw new Error('Placa do caminhão inválida');
      }
      if (notaFiscal == '') {
        throw new Error('Nota fiscal inválida');
      }
      if (localVirtual == '') {
        throw new Error('Local virtual inválido');
      }

      await verificarDados(placa, doca, notaFiscal, localVirtual, navigation);
    } catch (error) {
      Alert.alert('Erro', error.message);
    }
  
  
    async function verificarDados() {

      try {
        console.log('Iniciando verificação dos dados...');
        const recebimentoRef = await firestore().collection('Recebimento').doc(notaFiscal).get(); //aqui ele estará procurando na coleção Recebimento, o documento com id notaFiscal
        
        if(recebimentoRef.data() !== undefined){
          navigation.navigate('Dashboard');
        }else{
          Alert.alert('Recebimento invalido');
        }

        console.log(recebimentoRef.data());
    
      } catch (error) {
        console.error('Erro ao verificar dados:', error);
        Alert.alert('Erro', 'Erro ao acessar o banco de dados. Por favor, tente novamente mais tarde.');
      }
    }
  }
  return (
    <View style={styles.container}>
    <View style={styles.logo}>
      <Image
        source={require('../../images/rec.png')}
      />
      <Text style={styles.title}>Recebimento</Text>
    </View>  
    <View style={styles.forms}>  
  <Text style={styles.inputText}>Placa do Caminhão:</Text>
  <TextInput
    style={styles.input}
    onChangeText={(text) => setPlaca(text)}
  />
  <Text style={styles.inputText}>Doca:</Text>
  <TextInput
    style={styles.input}
    onChangeText={(text) => setDoca(text)}
  />
  <Text style={styles.inputText}>Nota-Fiscal:</Text>
  <TextInput
    style={styles.input}
    onChangeText={(text) => setNotaFiscal(text)}
  />
  <Text style={styles.inputText}>Local-Virtual:</Text>
  <TextInput
    style={styles.input}
    onChangeText={(text) => setLocalVirtual(text)}
  />
</View>
<Pressable style={styles.button} onPress={validarCampos}>
  <Text style={styles.text}>Iniciar Recebimento</Text>
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
    marginLeft:10,
    color:'black',
    fontWeight:'bold',
  },
  logo:{
    flexDirection:'row',
    padding:10,
  },
  forms:{
    padding:10,
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
export default Recebimento;