import { NavigatorScreenParams } from '@react-navigation/native';


export interface AuthStackParamList {
  AuthStartScreen: undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;
}

export interface GlobalsStackParamList {
  UserProfileScreen: { userId: string }; // ajusta si tiene params
  CameraScreen: undefined;
  ImageFullScreen: { uri: string }; // ajusta si tiene params
  ChatScreen: { chatId: string };
  GroupScreen: { groupId: string };
  GroupProfileScreen: { groupId: string };
  AddUserGroupScreen: { groupId: string };
  ChangeNameGroupScreen: { groupId: string };
}

export interface ChatsStackParamList {
  ChatsScreen: undefined;
  CreateChatScreen: undefined;
}

export interface GroupsStackParamList {
  GroupsScreen: undefined;
  CreateGroupScreen: undefined;
}

export interface SettingsStackParamList {
  SettingScreen: undefined;
  ChangeFirstNameScreen: undefined;
  ChangeLastNameScreen: undefined;
}

export interface TabParamList {
  BottomTabRoot: undefined;
  ChatsRoot: NavigatorScreenParams<ChatsStackParamList>;
  GroupsRoot: NavigatorScreenParams<GroupsStackParamList>;
  SettingsRoot: NavigatorScreenParams<SettingsStackParamList>;
}

export interface RootStackParamList extends Record<string, object | undefined> {
  // screens.auth.*
  Auth: NavigatorScreenParams<AuthStackParamList>;

  // screens.globals.*
  UserProfileScreen: GlobalsStackParamList['UserProfileScreen'];
  CameraScreen: undefined;
  ImageFullScreen: GlobalsStackParamList['ImageFullScreen'];
  ChatScreen: GlobalsStackParamList['ChatScreen'];
  GroupScreen: GlobalsStackParamList['GroupScreen'];
  GroupProfileScreen: GlobalsStackParamList['GroupProfileScreen'];
  AddUserGroupScreen: GlobalsStackParamList['AddUserGroupScreen'];
  ChangeNameGroupScreen: GlobalsStackParamList['ChangeNameGroupScreen'];

  // Bottom tabs
  BottomTabRoot: NavigatorScreenParams<TabParamList>;
}
