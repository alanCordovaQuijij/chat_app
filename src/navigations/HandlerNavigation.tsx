import React from 'react';
import {Text, View} from 'react-native';
import { AuthNavigation } from './stacks/AuthNavigation';

const AppNavigation = () => {
  return (
    <View>
      <Text>AppNavigation</Text>
    </View>
  );
};


export const HandlerNavigation = () => {
  const user = null;

  return user ? <AppNavigation /> : <AuthNavigation />;
};
