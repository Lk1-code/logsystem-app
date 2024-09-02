import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import firestore from '@react-native-firebase/firestore';

function Dashboard({ navigation, route }) {
  const [recebimentos, setRecebimentos] = useState([]);
  const [localData, setLocalData] = useState([]);
  const [destinoEstoque, setDestinoEstoque] = useState(''); // Estado para o local atual a ser adicionado
  const [destinos, setDestinos] = useState([]); // Estado para armazenar múltiplos destinos
  const { local } = route.params; // Obtem a variável do local armazenada na tela anterior

  useEffect(() => {
    async function getData() {
      try {
        const querySnapshot = await firestore()
          .collection('Recebimento')
          .doc(local)
          .collection('Itens')
          .get();

        if (!querySnapshot.empty) {
          const data = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setLocalData(data); // Armazena os dados do Local na variável
        } else {
          console.log('Nenhum item encontrado na subcoleção');
        }
      } catch (error) {
        console.error('Erro ao buscar dados do Firestore: ', error);
      }
    }

    getData();
  }, [local]);

  // Função para cancelar e voltar para a tela anterior
  const handleCancel = () => {
    navigation.goBack();
  };

  // Função para adicionar o destino à lista de destinos
  const handleAddDestino = () => {
    if (!destinoEstoque) {
      alert('Por favor, insira um local de destino.');
      return;
    }
    setDestinos([...destinos, destinoEstoque]); // Adiciona o destino à lista
    setDestinoEstoque(''); // Limpa o campo de entrada após adicionar
  };

  // Função para finalizar e mover os dados para os locais especificados na coleção 'Estoque'
  const handleFinalize = async () => {
    if (destinos.length === 0) {
      alert('Por favor, adicione pelo menos um local de destino para armazenar os dados.');
      return;
    }

    try {
      const batch = firestore().batch();

      // Percorre cada item do localData e adiciona a cada destino especificado
      localData.forEach(item => {
        destinos.forEach(destino => {
          const estoqueRef = firestore().doc(`Estoque/${destino}/Produtos/${item.id}`);
          batch.set(estoqueRef, item); // Adiciona cada item em cada destino especificado na coleção 'Estoque'
        });
      });

      // Executa a operação em lote
      await batch.commit();
      console.log('Dados transferidos para Estoque com sucesso!');

      // Apagar os dados da coleção 'Recebimento' após transferir
      await firestore()
        .collection('Recebimento')
        .doc(local)
        .collection('Itens')
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref.delete();
          });
        });

      alert('Recebimento finalizado com sucesso!');
      navigation.goBack(); // Volta para a tela anterior após finalizar
    } catch (error) {
      console.error('Erro ao finalizar recebimento: ', error);
      alert('Erro ao finalizar recebimento. Tente novamente.');
    }
  };

  // Verifica se há dados na coleção
  if (localData.length === 0) {
    return (
      <View>
        <Text>Carregando dados...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View>
        <View style={styles.container}>
          <Text style={styles.title}>Recebimento: {local}</Text>
        </View>
        <View>
          <View style={styles.linha}>
            <Text style={styles.coluna_produto}>Produto</Text>
            <Text style={styles.coluna_quantidade}>Qtd</Text>
            <Text style={styles.coluna_ean}>Ean</Text>
          </View>
          {localData.map(item => (
            <View style={styles.linha} key={item.id}>
              <Text style={styles.coluna_produto}>{item.descricao}</Text>
              <Text style={styles.coluna_quantidade}>{item.volume}</Text>
              <Text style={styles.coluna_ean}>{item.ean}</Text>
            </View>
          ))}
        </View>

        {/* Campo de entrada e botão para adicionar destino */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Digite o local de destino"
            value={destinoEstoque}
            onChangeText={setDestinoEstoque}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddDestino}>
            <Text style={styles.addButtonText}>Adicionar Local</Text>
          </TouchableOpacity>
        </View>

        {/* Exibição dos destinos adicionados */}
        <View style={styles.destinosContainer}>
          {destinos.map((destino, index) => (
            <Text key={index} style={styles.destinoText}>{destino}</Text>
          ))}
        </View>

        {/* Botões Cancelar e Finalizar */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.finalizeButton]} onPress={handleFinalize}>
            <Text style={styles.buttonText}>Finalizar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
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
  },
  inputContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  destinosContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  destinoText: {
    fontSize: 16,
    color: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  button: {
    padding: 10,
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: 'red',
  },
  finalizeButton: {
    backgroundColor: 'green',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Dashboard;
