import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, Pressable, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';

function Recebimento({ navigation }) {
  const [placa, setPlaca] = useState('');
  const [doca, setDoca] = useState('');
  const [notaFiscal, setNotaFiscal] = useState(''); // Nota fiscal digitada pelo usuário

  // Função para iniciar o processo de recebimento
  const iniciarRecebimento = async () => {
    try {
      if (!placa || !doca || !notaFiscal) {
        throw new Error('Preencha todos os campos obrigatórios.');
      }

      // Verifica se a nota fiscal existe no banco de dados
      const notaSnapshot = await firestore()
        .collection('Recebimento')
        .doc(notaFiscal) // Busca pela nota fiscal digitada
        .get();

      if (!notaSnapshot.exists) {
        Alert.alert('Erro', 'Nota Fiscal não encontrada.');
        return;
      }

      // Navega para a tela de conferência passando os parâmetros selecionados
      navigation.navigate('Conferencia', {
        placa,
        doca,
        notaFiscal: notaFiscal, // Passa o número da nota fiscal digitada
      });
    } catch (error) {
      Alert.alert('Erro', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image source={require('../../images/rec.png')} />
        <Text style={styles.title}>Recebimento</Text>
      </View>
      <View style={styles.forms}>
        <Text style={styles.inputText}>Placa do Caminhão:</Text>
        <TextInput
          style={styles.input}
          value={placa}
          onChangeText={(text) => setPlaca(text)}
        />

        <Text style={styles.inputText}>Doca:</Text>
        <TextInput
          style={styles.input}
          value={doca}
          onChangeText={(text) => setDoca(text)}
        />

        <Text style={styles.inputText}>Nota Fiscal:</Text>
        <TextInput
          style={styles.input}
          value={notaFiscal}
          onChangeText={(text) => setNotaFiscal(text)}
        />
      </View>
      <Pressable style={styles.button} onPress={iniciarRecebimento}>
        <Text style={styles.text}>Iniciar Recebimento</Text>
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
    padding: 10,
  },
  inputText: {
    marginBottom: 5,
    fontFamily: 'Poppins',
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

export default Recebimento;
