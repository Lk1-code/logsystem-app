import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, TextInput, Pressable, Alert } from 'react-native';
import { transferirDados } from './DataProcess/DataProcess'; // Ajuste o caminho conforme necessário

function Armazenagem({ navigation }) {
  const [localOrigem, setLocalOrigem] = useState('');
  const [localDestino, setLocalDest] = useState('');
  const [localData, setLocalData] = useState([]); // Estado local para dados, necessário na tela de transferência

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image source={require('../../images/armazenagem.png')} />
        <Text style={styles.title}>Armazenagem</Text>
      </View>
      <View style={styles.forms}>
        <Text style={styles.inputText}>Local de Origem</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setLocalOrigem(text)}
          value={localOrigem}
        />
        <Text style={styles.inputText}>Local Destino:</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setLocalDest(text)}
          value={localDestino}
        />
      </View>
      <Pressable 
        style={styles.button} 
        onPress={() => {
          // Verifica se ambos os campos estão preenchidos
          if (localOrigem && localDestino) {
            // Navega para a tela de transferência
            transferirDados(localOrigem, localDestino, null, setLocalData, navigation);
          } else {
            Alert.alert('Preencha todos os campos!');
          }
        }}
      >
        <Text style={styles.text}>Iniciar Armazenagem</Text>
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
    marginLeft: 10,
    color: 'black',
    fontWeight: 'bold',
  },
  logo: {
    flexDirection: 'row',
    padding: 10,
  },
  forms: {
    padding: 100,
  },
  inputText: {
    marginBottom: 5,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 15,
  },
  input: {
    width: 334,
    height: 35,
    padding: 5,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 1,
  },
  button: {
    justifyContent: 'center',
    backgroundColor: '#25DAF2',
    width: 334,
    height: 40,
    alignItems: 'center',
    borderRadius: 16,
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

export default Armazenagem;
