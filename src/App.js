import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import codePush from 'react-native-code-push';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {Persistore, Store} from './Redux/Store';
import { HomeScreen } from './Pages';

const App = () => {
  return (
    <Provider store={Store}>
      <PersistGate loading={null} persistor={Persistore}>
        <View style={{flex: 1}}>
          <HomeScreen />
        </View>
      </PersistGate>
    </Provider>
  );
};

export default codePush(App);

const styles = StyleSheet.create({});
