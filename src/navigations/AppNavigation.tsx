import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Text } from 'react-native';
import { screens } from '../utils/screens';
import { BottomTabNavigation } from './BottomTabNavigation/BottomTabNavigation';
import { ChatScreen } from '../screens/Chats/ChatScreen';
import { modalStyles, stackNavigationStyles } from './Styles.styles';
import { GroupScreen } from '../screens/Groups/GroupScreen';
import { UserProfileScreen } from '../screens/Global/UserProfileScreen';
import { GroupProfileScreen } from '../screens/Groups/GroupProfileScreen';
import { AddUserGroupScreen } from '../screens/Groups/AddUserGroupScreen';
import { ChangeNameGroupScreen } from '../screens/Groups/ChangeNameGroupScreen';
import { CameraScreen } from '../screens/Global/CameraScreen';
import { ImageFullScreen } from '../screens/Global/ImageFullScreen';
import { initSockets } from '../utils/sockets';
import { RootStackParamList } from './interfaces/interfacesScreen';

initSockets();
const Stack = createStackNavigator<RootStackParamList>();

// export type AuthGlobalParamList = {
//   UserProfileScreen: undefined,
//   CameraScreen: undefined,
//   ImageFullScreen: undefined,
//   ChatScreen: undefined,
//   GroupScreen: undefined,
//   GroupProfileScreen: undefined,
//   AddUserGroupScreen: undefined,
//   ChangeNameGroupScreen: undefined,
// };


export const AppNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screens.tab.root}
        component={BottomTabNavigation}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={screens.globals.chatScreen}
        component={ChatScreen}
        options={{ headerShown: false, ...stackNavigationStyles }}
      />
      <Stack.Screen
        name={screens.globals.groupScreen}
        component={GroupScreen}
        options={{ headerShown: false, ...stackNavigationStyles }}
      />

      <Stack.Group
        screenOptions={{ presentation: "modal", ...modalStyles }}
      >

        <Stack.Screen
          name={screens.globals.userProfileScreen}
          component={UserProfileScreen}
          options={{ title: "Info. del usuario" }}
        />

        <Stack.Screen
          name={screens.globals.groupProfileScreen}
          component={GroupProfileScreen}
          options={{ title: "Info. del grupo" }}
        />

        <Stack.Screen
          name={screens.globals.addUserGroupScreen}
          component={AddUserGroupScreen}
          options={{ title: "Añadir Participante" }}
        />

        <Stack.Screen
          name={screens.globals.changeNameGroupScreen}
          component={ChangeNameGroupScreen}
          options={{ title: "Cambiar nombre del grupo" }}
        />

        <Stack.Screen
          name={screens.globals.cameraScreen}
          component={CameraScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={screens.globals.imageFullScreen}
          component={ImageFullScreen}
          options={{ headerShown: false }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};
