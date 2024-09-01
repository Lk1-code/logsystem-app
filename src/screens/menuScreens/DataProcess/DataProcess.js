import { View, Text, Image, StyleSheet, TextInput, Pressable, Alert } from 'react-native'
import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const handleLogin = (email, Password, navigation) => {
    //Verifica caso os campos estejam vazios
    if (email === "") {
        Alert.alert("Insira seu email de Usuario!");
    } else if (Password === "") {
        Alert.alert("Insira sua Senha!");
    } else {
        auth().signInWithEmailAndPassword(email, Password)
            //Caso o Login e a senha estejam corretos
            .then(() => {
                console.log('Usuário logado com sucesso! ');
                navigation.navigate("Menu");
            })
            //Caso estejam errados ou tenha alguma falha
            .catch((error) => {
                console.log(error);
                Alert.alert('Usuario e/ou senha invalido!!')
            });
    }
}
// Função combinada para consultar o local e navegar
export async function ConsLocal(local, navigation = null) {
    try {
      const querySnapshot = await firestore()
        .collection('Estoque')
        .doc(local)
        .collection('itens')
        .get();
  
      if (!querySnapshot.empty) {
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
  
        console.log(data);
  
        // Se `navigation` estiver disponível, navega para "TelaLocal"
        if (navigation) {
          navigation.navigate("TelaLocal", { local: local, data: data });
        }
  
        return data; // Retorna os dados obtidos
      } else {
        console.log('Nenhum item encontrado na subcoleção');
        Alert.alert('Local inválido');
        return [];
      }
    } catch (error) {
      console.error('Erro ao buscar dados do Firestore: ', error);
      Alert.alert('Erro ao consultar local');
      return [];
    }
  }