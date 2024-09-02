import React, { useState } from 'react';
import { View, TextInput, Alert, StyleSheet, Pressable, Image, Text, } from 'react-native';
import firestore from '@react-native-firebase/firestore';

function Expedicao({ navigation }) {
  const [LocalCons,setLocal] = useState('');
  const [placa, setPlaca] = useState('');
  const [doca, setDoca] = useState('');
  const [notaFiscal, setNotaFiscal] = useState('');
  const [localVirtual, setLocalVirtual] = useState('');

  const ConsLocal = async () => {
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

      await ConsLocal(placa, doca, notaFiscal, localVirtual, navigation);
    } catch (error) {
      Alert.alert('Erro', error.message);
    }
      //faz a verificação se o local existe
      async function ConsLocal() {  
        try {
          // Fetch the collection from Firestore using the provided path
          const localData = await firestore()
          .collection('Estoque')
          .doc(LocalCons)
          .collection('Produtos')
          .get();
      
          // Map the documents to an array of items
          const itemList = localData.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
      
          console.log(itemList);
      
          // Check if the localData contains any documents
          if (localData.empty) {
            Alert.alert('Produto inválido');
          } else {
            // If the local exists, navigate to the Tela Local screen
            navigation.navigate("ExpedicaoDetails", { local: LocalCons });
          }
        } catch (error) {
          // Handle any errors
          console.error("Error fetching local data: ", error);
          Alert.alert('Erro ao consultar Produto');
        }
      }
  }
  return (
    <View style={styles.container}>
    <View style={styles.logo}>
      <Image
        source={require('../../images/rec.png')}
      />
      <Text style={styles.title}>Expedição</Text>
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
        value={LocalCons}
        style={styles.input}
        onChangeText={(text) => {
          setNotaFiscal(text);
          setLocal(text);
        }}
      />
  <Text style={styles.inputText}>Local-Virtual:</Text>
  <TextInput
    style={styles.input}
    onChangeText={(text) => setLocalVirtual(text)}
  />
</View>
<Pressable style={styles.button} onPress={ConsLocal}>
  <Text style={styles.text}>Iniciar Caregamento</Text>
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
export default Expedicao;