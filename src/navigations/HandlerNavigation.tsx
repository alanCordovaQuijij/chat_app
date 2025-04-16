import React from 'react';
import {Text, View} from 'react-native';
import { AuthNavigation } from './stacks/AuthNavigation';
import { AppNavigation } from './AppNavigation';



export const HandlerNavigation = () => {
  const user = "null";

  return user ? <AppNavigation /> : <AuthNavigation />;
};
