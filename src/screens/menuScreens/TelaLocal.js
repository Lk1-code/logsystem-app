import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, TextInput, Pressable, Alert} from 'react-native'
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
      <View style={styles.container}>
          <Text style={styles.title}>Local: {local}</Text>     
      </View>
      {localData.map(item => (
        <View>
          <Text style={styles.product}>Item:</Text>
          <View style={styles.items} key={item.id} >
            <Text style={styles.Textitem}>Id_Produto: {item.id}</Text>
            <Text style={styles.Textitem}>Produto:{item.Produto}</Text>
            <Text style={styles.Textitem}>Quantidade: {item.quantidade}</Text>
            <Text style={styles.Textitem}>EAN: {item.ean}</Text>
          </View>
        </View>
      ))}
    </View>
    
  );
}
  const styles = StyleSheet.create({
    container: {
      margin:30,
      backgroundColor: '#f0f0f0',
      justifyContent: 'center',
      alignItems: 'center',
      
    },
    title: {
      fontSize: 24,
      color:'black',
      fontWeight:'bold',
    },
    product:{
      margin:10,
      fontSize:17,
      color:'black',
      fontWeight:'bold',
    },
    Textitem: {
      margin:5,
      fontSize: 16,
      lineHeight: 21,
      letterSpacing: 0.25,
      color: '#000000',
    },
    items:{
      margin:20,
      borderRadius:10,
      backgroundColor:'#b2eff7',
      borderWidth: 1,
      fontSize: 20,
      marginBottom: 10,
    }
  
  });

export default TelaLocal;