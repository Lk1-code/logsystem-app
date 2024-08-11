import { Text, View, StyleSheet, Image, TextInput, Pressable} from 'react-native'

function Recebimento({navigation}){
    return (
      <View style={styles.container}>
      <View style={styles.logo}>
        <Image
          source={require('../../images/rec.png')}
        />
        <Text style={styles.title}>Recebimento</Text>
      </View>  
      <View style = {styles.forms}>  
        <Text style={styles.inputText}>Placa do Caminhão:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setUser(text)}
        />
        <Text style={styles.inputText}>Doca:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setUser(text)}
        />
        <Text style={styles.inputText}>Nota-Fiscal:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setUser(text)}
        />
        <Text style={styles.inputText}>Local-Virtual:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <Pressable style={styles.button} onPress={() => navigation.navigate('')}>
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