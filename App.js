import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import  Main  from './components/MainComponent';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import { PersistGate } from 'redux-persist/es/integration/react';
import { Loading } from './components/LoadingComponent'

const {persistor ,store} = ConfigureStore();

export default function App() {
  return (
    <Provider store={store}>
        <PersistGate 
          loading={<Loading />}
          persistor={persistor}>
            <SafeAreaProvider style={styles.container} > 
              <Main />
            </SafeAreaProvider>
        </PersistGate>
      </Provider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    color:'#512DA8',
    marginTop:0,
    backgroundColor:'#512DA8'
  },
});
