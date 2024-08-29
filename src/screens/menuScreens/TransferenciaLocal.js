import { Text, View, StyleSheet, Image, TextInput, Pressable, Alert} from 'react-native'
import firestore from '@react-native-firebase/firestore';
import { useEffect, useState} from 'react';

function TransferenciaLocal({route},{navigation}){
  const { local1 } = route.params;
  const { local2 } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image
          source={require('../../images/armazenagem.png')}
        />
        <Text style={styles.title}>Armazenagem</Text>   
      </View>  
      <Text style={styles.Local}>Local Origem: {local1}</Text>
      <Text style={styles.Local}>Local Destino: {local2}</Text>
      <View style = {styles.forms}>  
        <TextInput
          placeholder='Insira o EAN do produto'
          style={styles.input}
          onChangeText={(text) => setLocalOrigem(text)}
        ></TextInput>
      </View>
      <Pressable style={styles.button} >
        <Text style={styles.text}  onPress={() => navigation.navigate('Armazenagem')}>Voltar</Text>
      </Pressable>
    </View>
    )
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
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: '#000000',
  },

});
export default TransferenciaLocal;