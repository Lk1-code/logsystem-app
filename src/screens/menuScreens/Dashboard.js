import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';

function Dashboard({ navigation }) {
  const [recebimentos, setRecebimentos] = useState([]);

  useEffect(() => {
    const fetchRecebimentos = async () => {
      try {
        const recebimentosRef = await firestore().collection('Recebimento').get();
        const recebimentosData = recebimentosRef.docs.map(doc => doc.data());
        setRecebimentos(recebimentosData);
      } catch (error) {
        console.error('Erro ao buscar recebimentos:', error);
      }
    };
    fetchRecebimentos();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Dashboard</Text>
      </View>
      <FlatList
  data={recebimentos}
  renderItem={({ item }) => (
    <View style={styles.recebimento} key={item.id}>
      <Text>
        Nota Fiscal: {item.notaFiscal}
        {/* Adicione mais linhas de texto aqui se necessário */}
      </Text>
    </View>
  )}
/>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Recebimento')}>
        <Text style={styles.buttonText}>Novo Recebimento</Text>
      </TouchableOpacity>
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
  header: {
    flexDirection: 'row',
    padding: 10,
  },
  title: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
  },
  recebimento: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
  },
  recebimentoText: {
    fontSize: 16,
    marginBottom: 5,
  },
  button: {
    justifyContent: 'center',
    backgroundColor: '#25DAF2',
    width: 200,
    height: 40,
    alignItems: 'center',
    borderRadius: 16,
    elevation: 10,
    shadowColor: '#000000',
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: '#000000',
  },
});

export default Dashboard;