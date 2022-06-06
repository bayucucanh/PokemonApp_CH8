import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  HomeScreen,
  DetailScreen,
  Login,
  Register,
  CatchPokemon,
  PokeBag
} from '../Pages';

const Stack = createNativeStackNavigator();

const Router = () => {
  return (
    <Stack.Navigator initialRouteName="AuthStack">
      <Stack.Screen name="LoginScreen" component={Login} options={{headerShown: false}}/>
      <Stack.Screen name="RegisterScreen" component={Register} options={{headerShown: false}}/>
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false}}/>
      <Stack.Screen name="DetailScreen" component={DetailScreen} options={{headerShown: false}}/>
      <Stack.Screen name="CatchPokemon" component={CatchPokemon} options={{headerShown: false}}/>
      <Stack.Screen name="PokeBag" component={PokeBag} options={{headerShown: false}}/>
    </Stack.Navigator>
  );
};

export default Router;
