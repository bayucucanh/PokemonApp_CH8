import React from 'react';
import codePush from 'react-native-code-push';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {Persistore, Store} from './Redux/Store';
import Router from './Router';
import { NavigationContainer } from '@react-navigation/native';

const CodePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
  mandatoryInstallMode: codePush.InstallMode.IMMEDIATE,
  updateDialog: {
    appendReleaseDescription: true,
  },
};

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

export default codePush(CodePushOptions)(App);
