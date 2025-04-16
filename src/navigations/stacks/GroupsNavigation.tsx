import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {modalStyles, stackNavigationStyles} from '../Styles.styles';
import {screens} from '../../utils/screens';
import {ChatsScreen} from '../../screens/Chats/ChatsScreen';
import {CreateChatScreen} from '../../screens/Chats/CreateChatScreen';
import {GroupsScreen} from '../../screens/Groups/GroupsScreen';
import {CreateGroupScreen} from '../../screens/Groups/CreateGroupScreen';

const Stack = createStackNavigator();

export const GroupsNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{...stackNavigationStyles}}>
      <Stack.Screen
        name={screens.tab.groups.groupsScreen}
        component={GroupsScreen}
        options={{title: 'Grupos'}}
      />

      <Stack.Screen
        name={screens.tab.groups.createGroupScreen}
        component={CreateGroupScreen}
        options={{title: 'Nuevo grupo', presentation: 'modal', ...modalStyles}}
      />
    </Stack.Navigator>
  );
};
