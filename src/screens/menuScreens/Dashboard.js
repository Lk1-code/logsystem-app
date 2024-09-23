import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';

function Dashboard({ navigation, route }) {
  const [localData, setLocalData] = useState([]);
  const [destinoEstoque, setDestinoEstoque] = useState('');
  const [destinos, setDestinos] = useState([]);
  const { local, notaFiscal } = route.params;

  useEffect(() => {
    const getData = async () => {
      try {
        const querySnapshot = await firestore()
          .collection('Recebimento')
          .doc(local)
          .collection('Produtos')
          .where('ean', '==', notaFiscal)
          .get();

        if (!querySnapshot.empty) {
          const data = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setLocalData(data);
        } else {
          Alert.alert('Nenhum item encontrado', 'Nenhum item encontrado para essa nota fiscal.');
        }
      } catch (error) {
        console.error('Erro ao buscar dados do Firestore: ', error);
        Alert.alert('Erro', 'Não foi possível carregar os dados.');
      }
    };

    getData();
  }, [local, notaFiscal]);

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleAddDestino = () => {
    if (!destinoEstoque) {
      Alert.alert('Atenção', 'Por favor, insira um local de destino.');
      return;
    }
    if (destinos.includes(destinoEstoque)) {
      Alert.alert('Atenção', 'Este local já foi adicionado.');
      return;
    }
    setDestinos([...destinos, destinoEstoque]);
    setDestinoEstoque('');
  };

  const handleFinalize = async () => {
    if (destinos.length === 0) {
      Alert.alert('Atenção', 'Por favor, adicione pelo menos um local de destino.');
      return;
    }

    try {
      const batch = firestore().batch();

      localData.forEach(item => {
        destinos.forEach(destino => {
          const estoqueRef = firestore().doc(`Estoque/${destino}/Produtos/${item.id}`);
          batch.set(estoqueRef, item);
        });
      });

      await batch.commit();
      console.log('Dados transferidos para Estoque com sucesso!');

      const querySnapshot = await firestore()
        .collection('Recebimento')
        .doc(local)
        .collection('Produtos')
        .get();

      const deleteBatch = firestore().batch();
      querySnapshot.forEach(doc => {
        deleteBatch.delete(doc.ref);
      });
      await deleteBatch.commit();

      Alert.alert('Sucesso', 'Recebimento finalizado com sucesso!');
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao finalizar recebimento: ', error);
      Alert.alert('Erro', 'Erro ao finalizar recebimento. Tente novamente.');
    }
  };

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
          <Text style={styles.subtitle}>Nota Fiscal: {notaFiscal}</Text>
        </View>
        <View>
          <View style={styles.linha}>
            <Text style={styles.coluna_id}>ID</Text>
            <Text style={styles.coluna_produto}>Produto</Text>
            <Text style={styles.coluna_quantidade}>Qtd</Text>
            <Text style={styles.coluna_ean}>Ean</Text>
          </View>
          {localData.map(item => (
            <View style={styles.linha} key={item.id}>
              <Text style={styles.coluna_id}>{item.id}</Text>
              <Text style={styles.coluna_produto}>{item.descricao}</Text>
              <Text style={styles.coluna_quantidade}>{item.volume}</Text>
              <Text style={styles.coluna_ean}>{item.ean}</Text>
            </View>
          ))}
        </View>

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

        <View style={styles.destinosContainer}>
          {destinos.map((destino, index) => (
            <Text key={index} style={styles.destinoText}>{destino}</Text>
          ))}
        </View>

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
  subtitle: {
    fontSize: 18,
    color: 'black',
    marginTop: 5,
  },
  linha: {
    fontSize: 10,
    width: '100%',
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
