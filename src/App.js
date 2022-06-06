import React from 'react';
import codePush from 'react-native-code-push';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {Persistore, Store} from './Redux/Store';
import Router from './Router';
import { NavigationContainer } from '@react-navigation/native';

const App = () => {
  return (
    <Provider store={Store}>
      <PersistGate loading={null} persistor={Persistore}>
        <NavigationContainer style={{flex: 1}}>
          <Router />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default codePush(App);
