import React from 'react';
import {Text, View} from 'react-native';
import { AuthNavigation } from './stacks/AuthNavigation';
import { AppNavigation } from './AppNavigation';
import { useAuth } from '../hooks/useAuth';



export const HandlerNavigation = () => {
  const {user} = useAuth();

  return user ? <AppNavigation /> : <AuthNavigation />;
};
