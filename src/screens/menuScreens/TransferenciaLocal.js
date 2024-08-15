import { Text, View, StyleSheet, Image, TextInput, Pressable, Alert} from 'react-native'
import firestore from '@react-native-firebase/firestore';
import { useEffect, useState} from 'react';

function TransferenciaLocal({navigation}){
  const [LocalOrg,setLocalOrigem] = useState('');
  const [Localdes,setLocalDest] = useState('');
  async function armaLocal(){  
    const localDataOrg = await firestore().collection('Estoque').doc(LocalOrg).get();
    const localDataDes = await firestore().collection('Estoque').doc(Localdes).get();
    //se o local existir então navega para tela do Local e salva a informação do local para
    if(localDataDes.data() !== undefined || localDataOrg.data() !==undefined){
        Alert.alert('armazenagem iniciada');
        navigation.navigate('')
    }else{
      Alert.alert('Local invalido');
    }
  }

  return (
    <View style={styles.container}>
    <View style={styles.logo}>
      <Image
        source={require('../../images/armazenagem.png')}
      />
      <Text style={styles.title}>Armazenagem</Text>
    </View>  
    <View style = {styles.forms}>  
      <Text style={styles.inputText}>Local de Origem</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setLocalOrigem(text)}
      />
      <Text style={styles.inputText}>Local Destino:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setLocalDest(text)}
      />

    </View>
    <Pressable style={styles.button} onPress={(armaLocal)}>
      <Text style={styles.text}>Iniciar Armazenagem</Text>
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
    padding:100,
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
export default TransferenciaLocal;