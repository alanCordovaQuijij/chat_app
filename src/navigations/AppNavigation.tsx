import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Text} from 'react-native';
import {screens} from '../utils/screens';
import {BottomTabNavigation} from './BottomTabNavigation/BottomTabNavigation';

const Stack = createStackNavigator();

export const AppNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screens.tab.root}
        component={BottomTabNavigation}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
