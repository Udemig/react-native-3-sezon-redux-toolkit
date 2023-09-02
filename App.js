import {SafeAreaView, StatusBar} from 'react-native';
import React from 'react';
import {Provider as ReduxProvider} from 'react-redux';
import {store} from './src/app/store';
import UserScreen from './src/pages/UserScreen';

export default function App() {
  return (
    <>
      <SafeAreaView>
        <StatusBar />
        <ReduxProvider store={store}>
          <UserScreen />
        </ReduxProvider>
      </SafeAreaView>
    </>
  );
}
