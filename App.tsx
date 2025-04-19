import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaView } from 'react-native';
import { Button, PaperProvider, Text } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { HandlerNavigation } from './src/navigations/HandlerNavigation';
import { AuthProvider } from './src/context/AuthContext';

export const App = () => {
  return (
    <NavigationContainer>
      <PaperProvider>
        <AuthProvider>
          <HandlerNavigation />
        </AuthProvider>
      </PaperProvider>
    </NavigationContainer>
  );
};
