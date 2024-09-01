import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Image, Pressable, StyleSheet,Keyboard  } from 'react-native';
import { transferirDados } from './DataProcess/DataProcess'; // Ajuste o caminho conforme necessário

function TransferenciaLocal({ route, navigation }) {
  const [localData, setLocalData] = useState([]);
  const { local1, local2 } = route.params;
  const [ean, setEan] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image source={require('../../images/armazenagem.png')} />
        <Text style={styles.title}>Transferência de Itens</Text>
      </View>
      <Text style={styles.Local}>Local Origem: {local1}</Text>
      <Text style={styles.Local}>Local Destino: {local2}</Text>
      <View style={styles.forms}>
        <TextInput
          value={ean}
          placeholder='Insira o EAN do produto'
          style={styles.input}
          onChangeText={text => setEan(text)}
          onSubmitEditing={() => transferirDados(local1, local2, ean, setLocalData)}
        />
      </View>
      <Pressable style={styles.button} onPress={() => navigation.navigate('Armazenagem')}>
        <Text style={styles.text}>Voltar</Text>
      </Pressable>
      {/* Exibir dados locais */}
      {localData.map(item => (
        <View style={styles.linha} key={item.id}>
          <Text style={styles.coluna_produto}>{item.descricao}</Text>
          <Text style={styles.coluna_quantidade}>{item.volume}</Text>
          <Text style={styles.coluna_ean}>{item.ean}</Text>
        </View>
      ))}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  title: {
    margin:40,
    fontSize: 24,
    marginLeft:10,
    color:'black',
    fontWeight:'bold',
  },
  Local:{
    fontSize: 20,
    color:'black',
    fontWeight:'bold',
    marginBottom: 5,
  },
  logo:{
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection:'row',
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
    width: 400,
    height:40,
    padding: 5,
    marginTop:5,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius:5,
    elevation: 1,
    shadowColor: '#000000',
  },
  button:{
    justifyContent:'center',
    backgroundColor:'#25DAF2',
    width:130,
    height:30,
    alignItems:'center',
    borderRadius:5,
    elevation: 10,
    shadowColor: '#000000',
    marginBottom:20,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: '#000000',
  },linha:{
    fontSize:10,
    width:400,
    flexDirection:'row',
    paddingLeft:5,
  },
  coluna_produto:{
    paddingTop:10,
    height:30,
    width:250,
    justifyContent: 'center',
    textAlign:'center',
    fontWeight:'bold',
    color:'black',

  },
  coluna_quantidade:{
    paddingTop:10,
    height:30,
    width:40,
    justifyContent: 'center',
    textAlign:'center',
    fontWeight:'bold',
    color:'black',
  },
  coluna_ean:{
    paddingTop:10,
    height:30,
    width:110,
    justifyContent: 'center',
    textAlign:'center',
    fontWeight:'bold',
    color:'black',

  }

});
export default TransferenciaLocal;