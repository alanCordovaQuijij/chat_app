import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {modalStyles, stackNavigationStyles} from '../Styles.styles';
import {screens} from '../../utils/screens';
import {ChatsScreen} from '../../screens/Chats/ChatsScreen';
import {CreateChatScreen} from '../../screens/Chats/CreateChatScreen';

const Stack = createStackNavigator();

export const ChatsNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{...stackNavigationStyles}}>
      <Stack.Screen
        name={screens.tab.chats.chatsScreen}
        component={ChatsScreen}
        options={{title: 'Chats'}}
      />

      <Stack.Screen
        name={screens.tab.chats.createChatScreen}
        component={CreateChatScreen}
        options={{title: 'Nuevo chat', presentation: 'modal', ...modalStyles}}
      />
    </Stack.Navigator>
  );
};
