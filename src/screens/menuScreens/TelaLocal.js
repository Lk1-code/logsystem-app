import { Text, View } from 'react-native'
import React, { StyleSheet,Component, useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';

function TelaLocal({navigation}){
  const [local,setLocal] = useState([]);
  useEffect(async ()=>{
    const localData = await firestore().collection('Estoque').doc(localOrigem).get();
  })
  return (
    <View style={styles.container}>
        <Text style={styles.title}>Lista de Vacinas</Text>
        <FlatList
            data={vacinas}
            renderItem={({ item }) => 
            <Text style={styles.item}>
            Nome do Pet: {item.nomePet}{'\n'}
            Data de Nascimento: {item.DataNasc}{'\n'}
            Vacina:{item.nomeVacina}{'\n'}
            Data da vacina: {item.DataVac}</Text>}
            keyExtractor={(item) => item.id.toString()}
        />
    </View>
  );
};
export default TelaLocal;