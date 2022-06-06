import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  HomeScreen,
  DetailScreen,
  Login,
  Register,
  CatchPokemon,
} from '../Pages';

const Stack = createNativeStackNavigator();

function AppStack() {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="DetailScreen" component={DetailScreen} />
      <Stack.Screen name="CatchPokemon" component={CatchPokemon} />
    </Stack.Navigator>
  );
}

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen
        name="LoginScreen"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={Register}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const Router = () => {
  return (
    <Stack.Navigator initialRouteName="AppStack">
      <Stack.Screen
        name="AuthStack"
        component={AuthStack}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="AppStack"
        component={AppStack}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Router;
