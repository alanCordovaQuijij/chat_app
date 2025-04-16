import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {modalStyles, stackNavigationStyles} from '../Styles.styles';
import {screens} from '../../utils/screens';
import {ChatsScreen} from '../../screens/Chats/ChatsScreen';
import {CreateChatScreen} from '../../screens/Chats/CreateChatScreen';
import {GroupsScreen} from '../../screens/Groups/GroupsScreen';
import {CreateGroupScreen} from '../../screens/Groups/CreateGroupScreen';
import {ChangeFirstNameScreen, SettingsScreen} from '../../screens/Settings';

const Stack = createStackNavigator();

export const SettingsNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{...stackNavigationStyles}}>
      <Stack.Screen
        name={screens.tab.settings.settingScreen}
        component={SettingsScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name={screens.tab.settings.changeFirstNameScreen}
        component={ChangeFirstNameScreen}
        options={{
          title: 'Cambiar nombre',
          presentation: 'modal',
          ...modalStyles,
        }}
      />

      <Stack.Screen
        name={screens.tab.settings.changeLastNameScreen}
        component={ChangeFirstNameScreen}
        options={{
          title: 'Cambiar apellido',
          presentation: 'modal',
          ...modalStyles,
        }}
      />
    </Stack.Navigator>
  );
};
