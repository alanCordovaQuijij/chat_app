import React from 'react';
import {SafeAreaView} from 'react-native';
import {Button, PaperProvider, Text} from 'react-native-paper';

export const App = () => {
  return (
    <PaperProvider>
      <SafeAreaView>
        <Text>AppCHATs</Text>
        <Button>Click Me</Button>
      </SafeAreaView>
    </PaperProvider>
  );
};
