import React from 'react';
import {Text, SafeAreaView, StyleSheet} from 'react-native';
import Login from './screens/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Menu from './screens/Menu';
import Recebimento from './screens/menuScreens/Recebimento';
import Armazenagem from './screens/menuScreens/Armazenagem';
import Expedicao from './screens/menuScreens/Expedicao';
import Separacao from './screens/menuScreens/Separacao';
import ConsultarLocal from './screens/menuScreens/ConsultarLocal';
import TelaLocal from './screens/menuScreens/TelaLocal';
import TransferenciaLocal from './screens/menuScreens/TransferenciaLocal';
import Dashboard from './screens/menuScreens/Dashboard';


const Stack = createNativeStackNavigator();


const App = () => {
  return (
  <SafeAreaView style={styles.root}>
   <NavigationContainer>{
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
        name="Login"
        component={Login}
        options={{
          title: 'LogSystem',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Menu"
        component={Menu}
        options={{
          title: 'Menu',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Recebimento"
        component={Recebimento}
        options={{
          title: 'Recebimento',
        }}
      />
      <Stack.Screen
        name="Armazenagem"
        component={Armazenagem}
        options={{
          title: 'Armazenagem',
        }}
      />
        <Stack.Screen
        name="Consultar Local"
        component={ConsultarLocal}
        options={{
          title: 'Consultar Local',
        }}
      />
      <Stack.Screen
        name="Tela Local"
        component={TelaLocal}
        options={{
          title: 'Local',
        }}
      />
      <Stack.Screen
        name="Expedição"
        component={Expedicao}
        options={{
          title: 'Expedição',
        }}
      />
      <Stack.Screen
        name="Separação"
        component={Separacao}
        options={{
          title: 'Separação',
        }}
      />
      <Stack.Screen
        name="Transferencia"
        component={TransferenciaLocal}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          title: 'Dashboard',
        }}
      />
      </Stack.Navigator>
  }</NavigationContainer>
  </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    root:{
        flex:1,
    }

});

export default App;