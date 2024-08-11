import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import firestore from '@react-native-firebase/firestore';

function TelaLocal({ route }) {
  const [localData, setLocalData] = useState([]);
  const { local } = route.params; //obtem a variavel do local armazenada na tela anterior

  useEffect(() => {
    async function getData() {
      try {
        const querySnapshot = await firestore()
          .collection('Estoque')  // Acessa a coleção principal "Estoque"
          .doc(local)             // Acessa o documento específico (passado via parâmetro)
          .collection('Itens')    // Acessa a subcoleção "Itens" dentro do documento "local"
          .get();

        if (!querySnapshot.empty) {
          const data = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setLocalData(data); // Armazena os dados do Local na Variavel
        } else {
          console.log('Nenhum item encontrado na subcoleção');
        }
      } catch (error) {
        console.error('Erro ao buscar dados do Firestore: ', error);
      }
    }

    getData();
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
      {localData.map(item => (
        <View key={item.id}>
          <Text>ID do item: {item.id}</Text>
          <Text>Descrição: {item.Produto}</Text>
          <Text>Quantidade: {item.quantidade}</Text>
        </View>
      ))}
    </View>
  );
}

export default TelaLocal;