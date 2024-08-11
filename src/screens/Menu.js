import { Text, View, StyleSheet, Pressable,Image } from 'react-native'

function Menu ({navigation}){
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Menu</Text>
        <Pressable style={styles.button} onPress={() => navigation.navigate('Recebimento')}>
        <Image style={styles.logo} source={require('../images/rec.png')}/>
        <Text style={styles.text}>
          RECEBIMENTO
          </Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => navigation.navigate('Armazenagem')}>
      <Image style={styles.logo} source={require('../images/armazenagem.png')}/>
        <Text style={styles.text}>
          ARMAZENAGEM
          </Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => navigation.navigate('Consultar Local')}>
      <Image style={styles.logo} source={require('../images/Consulta.png')}/>
        <Text style={styles.text}>
          CONSULTAR LOCAL
          </Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => navigation.navigate('Expedição')}>
      <Image style={styles.logo} source={require('../images/expedicao.png')}/>
        <Text style={styles.text}>
          EXPEDIÇÃO
          </Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => navigation.navigate('Separação')}>
        <Image style={styles.logo} source={require('../images/Separacao.png')}/>
        <Text style={styles.text}>
          SEPARAÇÂO
        </Text>
      </Pressable>
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    margin: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    color:'black',
    fontSize:32,
    fontWeight:'bold',
  },
  logo:{
    marginLeft:10,
    margin:5,
    width: 40,
    height: 40,
    resizeMode: 'contain'
  },
  text:{
    textAlign:'center',
    marginLeft:25,
    margin:10,
    color:'black',
    fontSize:24,
    fontWeight:'bold',
  },
  button:{
    flexDirection:'row',
    margin:15,
    backgroundColor:'#25DAF2',
    width:339,
    height:50,
    elevation: 10,
    shadowColor: '#000000',
  },
});
export default Menu