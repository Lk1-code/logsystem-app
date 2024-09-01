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
    flexDirection: 'row',
    paddingLeft: 5,
    borderBottomWidth: 1, // Adiciona uma linha abaixo
    borderBottomColor: '#cccccc', // Cor da linha
    paddingVertical: 10, // Espaço acima e abaixo do conteúdo
    marginBottom: 5, // Espaço entre as linhas
  },
  coluna_produto: {
    height: 50,
    width: 220,
    fontWeight: 'bold',
    color: 'black',
  },
  coluna_quantidade: {
    width: 30,
    justifyContent: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
  },
  coluna_ean: {
    height: 30,
    width: 120,
    justifyContent: 'center',
    textAlign: 'right',
    fontWeight: 'bold',
    color: 'black',
  }
});


export default TelaLocal;