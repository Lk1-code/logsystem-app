import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, TextInput, Pressable, Alert } from 'react-native'
import { ConsLocal } from './DataProcess/DataProcess';

function TelaLocal({ route }) {
  const [localData, setLocalData] = useState([]);
  const { local } = route.params;

  useEffect(() => {
    // Função para buscar dados do Firestore
    const fetchData = async () => {
      try {
        const data = await ConsLocal(local); // Chama a função para buscar dados
        setLocalData(data); // Armazena os dados obtidos no estado
      } catch (error) {
        console.error('Erro ao buscar dados: ', error);
        Alert.alert('Erro', 'Não foi possível buscar os dados.');
      }
    };

    fetchData(); // Chama a função de busca de dados
  }, [local]);

  //verifica se ha dados na coleção
  if (localData.length === 0) {
    return (
      <View>
        <Text>Carregando dados...</Text>
      </View>
    );
  }

  return (

    <View>
      <View style={styles.container}>
        <Text style={styles.title}>Local: {local}</Text>
      </View>
      <View>
        <View style={styles.linha}>
          <Text style={styles.coluna_produto}>Produto</Text>
          <Text style={styles.coluna_quantidade}>Qtd</Text>
          <Text style={styles.coluna_ean}>Ean</Text>
        </View>
        {localData.map(item => (
          <View style={styles.linha}>
            <Text style={styles.coluna_produto}>{item.descricao}</Text>
            <Text style={styles.coluna_quantidade}>{item.volume}</Text>
            <Text style={styles.coluna_ean}>{item.ean}</Text>
          </View>
        ))}
      </View>
    </View>

  );
}
const styles = StyleSheet.create({
  container: {
    margin: 30,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',

  },
  title: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
  },
  linha: {
    fontSize: 10,
    width: 400,
    flexDirection: 'row',
    paddingLeft: 5,
  },
  coluna_id: {
    paddingTop: 10,
    height: 50,
    width: 40,
    justifyContent: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
    borderWidth: 1,
    borderColor: 'black',

  },
  coluna_produto: {
    paddingTop: 10,
    height: 50,
    width: 220,
    justifyContent: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
    borderWidth: 1,
    borderColor: 'black',

  },
  coluna_quantidade: {
    paddingTop: 10,
    height: 50,
    width: 30,
    justifyContent: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
    borderWidth: 1,
    borderColor: 'black',
  },
  coluna_ean: {
    paddingTop: 10,
    height: 50,
    width: 90,
    justifyContent: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
    borderWidth: 1,
    borderColor: 'black',
  }

});

export default TelaLocal;