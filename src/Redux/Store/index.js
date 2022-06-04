import { applyMiddleware, combineReducers, createStore } from 'redux';
import reduxLogger from 'redux-logger';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from "@react-native-async-storage/async-storage";
import ReduxThunk from 'redux-thunk';
import { GlobalReducer } from '../Reducers';

const rootReducer = {
  appData: GlobalReducer
}

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // blacklist: ['dataBooks'],
};

const configPersist = persistReducer(persistConfig, combineReducers(rootReducer))
export const Store = createStore(
  configPersist,
  applyMiddleware(ReduxThunk, reduxLogger),
);
export const Persistore = persistStore(Store);




