import { Text, View, StyleSheet, Image, TextInput, Pressable, Alert} from 'react-native'
import firestore from '@react-native-firebase/firestore';
import { useEffect, useState} from 'react';


function ConsultarLocal({navigation}){
  const [LocalCons,setLocal] = useState('');
  //faz a verificação se o local existe
  async function ConsLocal(){  
    const localData = await firestore().collection('Estoque').doc(LocalCons).get();
    //se o local existir então navega para tela do Local e salva a informação do local para
    if(localData.data() !== undefined){
      navigation.navigate("Tela Local",{local: LocalCons});
    //caso o contrario exibe essa mensagem de erro
    }else{
      Alert.alert('Local invalido');
    }
    
  }
  return (
    <View style={styles.container}>
    <View style={styles.logo}>
      <Image
        source={require('../../images/Consulta.png')}
      />
      <Text style={styles.title}>Consultar Local</Text>
    </View>  
    <View style = {styles.forms}>  
      <Text style={styles.inputText}>Local de Origem</Text>
      <TextInput
        value={LocalCons}
        style={styles.input}
        onChangeText={(text) => setLocal(text)}
      />
    </View>
    <Pressable style={styles.button} onPress={ConsLocal}>
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
